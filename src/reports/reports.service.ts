import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { QuantitiesService } from 'src/quantities/quantities.service';
import { ShellItem } from 'src/shellshedule/entities/shellitems.entity';
import { ShellsheduleService } from 'src/shellshedule/shellshedule.service';
import { TasksService } from 'src/tasks/tasks.service';
import { In } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class ReportsService {
  constructor(
    private taskService: TasksService,
    private projetService: ProjectsService,
    private shellService: ShellsheduleService,
    private quantitiesService: QuantitiesService,
  ) {}

  // Total Item Usage Report
  // How can I see the total quantity of "Steel Beams" [specific item]
  // used across all tasks?

  async getTotalItemUsageAcrossTasks(itemId: string, projectId: string) {
    const item = await this.shellService.findOneItem(itemId);
    if (!item) throw new BadRequestException('Item Not Found');

    const project = await this.projetService.getOne(projectId);
    if (!project) throw new BadRequestException('Project Not Found');

    // Get all tasks for the project
    const tasks = await this.taskService.findWhere({
      project: { id: projectId },
    });
    const taskIds = tasks.map((task) => task.id);

    // Now find all quantities linked to this item and any of those tasks
    const quantitiesForThisItem =
      await this.quantitiesService.findWhereItemTaskToQuantity({
        item: { id: item.id },
        task: { id: In(taskIds) },
      });

    return {
      item: item.description,
      unit: item.unit,
      total: quantitiesForThisItem.reduce((sum, q) => sum + q.amount, 0),
    };
  }

  async itemAndQuantityBreakdownByTask(itemId: string, projectId: string) {
    const item = await this.shellService.findOneItem(itemId);
    if (!item) throw new BadRequestException('Item Not Found');

    const project = await this.projetService.getOne(projectId);
    if (!project) throw new BadRequestException('Project Not Found');

    // Get all tasks for the project
    const tasks = await this.taskService.findWhere({
      project: { id: projectId },
    });
    const taskIds = tasks.map((task) => task.id);

    // 1. Get all task-quantity records for this item within the project
    const quantities = await this.quantitiesService.findWhereItemTaskToQuantity(
      {
        item: { id: item.id },
        task: { id: In(taskIds) },
      },
    );

    // 2. Group quantities by task
    const taskBreakdown = await Promise.all(
      quantities.map(async (qty) => {
        const task = await this.taskService.findOne(qty.task.id);
        return {
          taskId: task.id,
          taskName: task.name,
          amount: qty.amount,
          unit: qty.unit || item.unit, // Fallback to item's unit if not specified
        };
      }),
    );

    // 3. Sum amounts per task (in case same item appears multiple times in a task)
    const groupedByTask = taskBreakdown.reduce(
      (
        acc: {
          taskId: string;
          taskName: string;
          amount: number;
          unit: string;
        }[],
        curr,
      ) => {
        const existing = acc.find((t) => t.taskId === curr.taskId);
        if (existing) {
          existing.amount += curr.amount;
        } else {
          acc.push({ ...curr });
        }
        return acc;
      },
      [],
    );

    return {
      project: project.name,
      item: item.description,
      unit: item.unit,
      breakdown: groupedByTask,
    };
  }

  async getUserItemUsageInProject(
    userId: string,
    itemId: string,
    projectId: string,
  ) {
    // 1. Validate inputs
    const item = await this.shellService.findOneItem(itemId);
    if (!item) throw new BadRequestException('Item Not Found');

    const project = await this.projetService.getOne(projectId);
    if (!project) throw new BadRequestException('Project Not Found');
    // Get all tasks for the project
    const tasks = await this.taskService.findWhere({
      project: { id: projectId },
    });
    const taskIds = tasks.map((task) => task.id);

    // 2. Get all quantities where:
    //    - Item matches
    //    - Belongs to project tasks
    //    - Was created by the specified user
    const quantities = await this.quantitiesService.findWhereItemTaskToQuantity(
      {
        item: { id: item.id },
        task: { id: In(taskIds) },
        quantity: { createdBy: { id: userId } },
      }, // Include relationships to avoid N+1 queries
    );

    // 3. Group by task and sum amounts
    const userAssignments = quantities.reduce(
      (
        acc: {
          taskId: string;
          taskName: string;
          amount: number;
          unit: string;
        }[],
        qty,
      ) => {
        const taskName = qty.task.name;
        const existingTask = acc.find((t) => t.taskName === taskName);

        if (existingTask) {
          existingTask.amount += qty.amount;
        } else {
          acc.push({
            taskId: qty.task.id,
            taskName,
            amount: qty.amount,
            unit: qty.unit || item.unit,
          });
        }
        return acc;
      },
      [],
    );

    return {
      project: project.name,
      user: quantities[0]?.quantity?.createdBy?.userName || 'Unknown User',
      item: item.description,
      unit: item.unit,
      assignments: userAssignments,
    };
  }

  async getItemUsageWithUserContributions(itemId: string, projectId: string) {
    // 1. Validate inputs
    const item = await this.shellService.findOneItem(itemId);
    if (!item) throw new BadRequestException('Item Not Found');

    const project = await this.projetService.getOne(projectId);
    if (!project) throw new BadRequestException('Project Not Found');
    // Get all tasks for the project
    const tasks = await this.taskService.findWhere({
      project: { id: projectId },
    });
    const taskIds = tasks.map((task) => task.id);
    // 2. Get all quantities for this item in the project
    const quantities = await this.quantitiesService.findWhereItemTaskToQuantity(
      {
        item: { id: item.id },
        task: { id: In(taskIds) },
      },
    );

    // 3. Calculate total usage
    const totalUsage = quantities.reduce((sum, qty) => sum + qty.amount, 0);

    // 4. Group by user and task
    const userContributions = quantities.reduce(
      (
        acc: {
          userId: string;
          userName: string;
          contributions: {
            taskId: string;
            taskName: string;
            amount: number;
            unit: string;
          }[];
        }[],
        qty,
      ) => {
        const user = qty.quantity.createdBy;
        const existingUser = acc.find((u) => u.userId === user.id);

        const contribution = {
          taskId: qty.task.id,
          taskName: qty.task.name,
          amount: qty.amount,
          unit: qty.unit || item.unit,
        };

        if (existingUser) {
          existingUser.contributions.push(contribution);
        } else {
          acc.push({
            userId: user.id,
            userName: user.userName,
            contributions: [contribution],
          });
        }
        return acc;
      },
      [],
    );

    return {
      project: project.name,
      item: item.description,
      unit: item.unit,
      totalUsage,
      userContributions,
    };
  }

  // async generateShellScheduleForASpecificProject(
  //   projectId: string,
  // ): Promise<Buffer> {
  //   // 1. Get all tasks for this project
  //   const tasks = await this.taskService.findWhere({
  //     project: { id: projectId },
  //   });
  //   console.log('tasks: ', tasks);
  //   if (!tasks.length)
  //     throw new BadRequestException('No tasks found for this project');

  //   // 2. Collect all ItemTaskToQuantity
  //   const allItemQuantities = tasks.flatMap((task) =>
  //     task.itemTaskQuantity.map((q) => ({
  //       taskName: task.name,
  //       item: q.item,
  //       quantity: q.amount,
  //       unit: q.unit,
  //       subCategory: q.item.shellSubCategory,
  //       category: q.item.shellSubCategory.shellCategory,
  //       phase: q.item.shellSubCategory.shellCategory.shellPhase,
  //     })),
  //   );

  //   // 3. Format the rows for Excel
  //   const data = allItemQuantities.map((entry) => ({
  //     Phase: entry.phase?.name || '',
  //     Category: entry.category?.name || '',
  //     Subcategory: entry.subCategory?.name || '',
  //     'Item Description': entry.item.description,
  //     References: (entry.item.references || []).join(', '),
  //     ID: entry.item.identifierId,
  //     Unit: entry.unit || entry.item.unit,
  //     Quantity: entry.quantity,
  //     Task: entry.taskName,
  //   }));

  //   // 4. Insert headers and avoid NaNs (empty values will remain blank)
  //   const worksheet = XLSX.utils.json_to_sheet(data);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Shell Schedule');

  //   // 5. Generate buffer to be returned or downloaded
  //   const buffer = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'buffer',
  //   }) as Buffer;
  //   return buffer;
  // }
  // async generateShellScheduleForASpecificProject(
  //   projectId: string,
  // ): Promise<Buffer> {
  //   const project = await this.projetService.getOne(projectId);
  //   if (!project) throw new BadRequestException('Project not found');

  //   const tasks = await this.taskService.findWhere({
  //     project: { id: projectId },
  //   });
  //   const taskIds = tasks.map((task) => task.id);
  //   if (!taskIds.length)
  //     throw new BadRequestException('No tasks found for this project');

  //   const allQuantities =
  //     await this.quantitiesService.findWhereItemTaskToQuantity({
  //       task: { id: In(taskIds) },
  //     });

  //   interface ItemUsageEntry {
  //     Phase: string;
  //     Category: string;
  //     Subcategory: string;
  //     Description: string;
  //     References: string;
  //     ID: string;
  //     Unit: string;
  //     TotalQuantity: number;
  //     Tasks: { Task: string; User: string; Quantity: number }[];
  //   }

  //   const detailedData = allQuantities.map((qty) => ({
  //     itemId: qty.item.id,
  //     itemDescription: qty.item.description,
  //     itemUnit: qty.unit || qty.item.unit,
  //     itemIdentifierId: qty.item.identifierId,
  //     taskName: qty.task.name,
  //     taskId: qty.task.id,
  //     quantity: qty.amount,
  //     userName: qty.quantity.createdBy?.userName || 'Unknown',
  //     subCategory: qty.item.shellSubCategory?.name || '',
  //     category: qty.item.shellSubCategory?.shellCategory?.name || '',
  //     phase: qty.item.shellSubCategory?.shellCategory?.shellPhase?.name || '',
  //     references: qty.item.references?.join(', ') || '',
  //   }));

  //   const itemMap = new Map<string, ItemUsageEntry>();

  //   for (const row of detailedData) {
  //     if (!itemMap.has(row.itemId)) {
  //       itemMap.set(row.itemId, {
  //         Phase: row.phase,
  //         Category: row.category,
  //         Subcategory: row.subCategory,
  //         Description: row.itemDescription,
  //         References: row.references,
  //         ID: `${row.itemIdentifierId}`,
  //         Unit: row.itemUnit,
  //         TotalQuantity: 0,
  //         Tasks: [],
  //       });
  //     }

  //     const item = itemMap.get(row.itemId)!;
  //     item.TotalQuantity += row.quantity;
  //     item.Tasks.push({
  //       Task: row.taskName,
  //       User: row.userName,
  //       Quantity: row.quantity,
  //     });
  //   }

  //   const excelRows: Record<string, any>[] = [];

  //   for (const [, item] of itemMap.entries()) {
  //     // Item summary row
  //     excelRows.push({
  //       Phase: item.Phase,
  //       Category: item.Category,
  //       Subcategory: item.Subcategory,
  //       'Item Description': item.Description,
  //       References: item.References,
  //       ID: item.ID,
  //       Unit: item.Unit,
  //       'Total Quantity': item.TotalQuantity,
  //       Task: '',
  //       User: '',
  //       Quantity: '',
  //     });

  //     // Breakdown rows
  //     for (const task of item.Tasks) {
  //       excelRows.push({
  //         Phase: '',
  //         Category: '',
  //         Subcategory: '',
  //         'Item Description': '',
  //         References: '',
  //         ID: '',
  //         Unit: '',
  //         'Total Quantity': '',
  //         Task: task.Task,
  //         User: task.User,
  //         Quantity: task.Quantity,
  //       });
  //     }

  //     excelRows.push({}); // empty spacer row
  //   }

  //   const worksheet = XLSX.utils.json_to_sheet(excelRows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Detailed Usage');

  //   const buffer = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'buffer',
  //   }) as Buffer;

  //   return buffer;
  // }

  // async generateShellScheduleForASpecificProject(
  //   projectId: string,
  // ): Promise<Buffer> {
  //   const project = await this.projetService.getOne(projectId);
  //   if (!project) throw new BadRequestException('Project not found');

  //   const tasks = await this.taskService.findWhere({
  //     project: { id: projectId },
  //   });
  //   const taskIds = tasks.map((task) => task.id);
  //   if (!taskIds.length) {
  //     throw new BadRequestException('No tasks found for this project');
  //   }

  //   // Get all item-task-quantity records where the task belongs to this project
  //   const allQuantities =
  //     await this.quantitiesService.findWhereItemTaskToQuantity({
  //       task: { id: In(taskIds) },
  //     });

  //   // Get all ShellItems (not filtered by usage)
  //   const allItems = await this.shellService.findAllItems();

  //   // Prepare a lookup of usage per item
  //   const usageMap = new Map<
  //     string,
  //     {
  //       total: number;
  //       tasks: { Task: string; User: string; Quantity: number }[];
  //     }
  //   >();

  //   for (const qty of allQuantities) {
  //     const itemId = qty.item.id;
  //     if (!usageMap.has(itemId)) {
  //       usageMap.set(itemId, { total: 0, tasks: [] });
  //     }
  //     const entry = usageMap.get(itemId)!;
  //     entry.total += qty.amount;
  //     entry.tasks.push({
  //       Task: qty.task.name,
  //       User: qty.quantity.createdBy?.userName || 'Unknown',
  //       Quantity: qty.amount,
  //     });
  //   }

  //   // Build Excel rows
  //   const excelRows: Record<string, any>[] = [];

  //   for (const item of allItems) {
  //     const usage = usageMap.get(item.id);

  //     const phase =
  //       item.shellSubCategory?.shellCategory?.shellPhase?.name || '';
  //     const category = item.shellSubCategory?.shellCategory?.name || '';
  //     const subCategory = item.shellSubCategory?.name || '';
  //     const references = item.references?.join(', ') || '';
  //     const totalQuantity = usage?.total || 0;
  //     const unit = item.unit || '';

  //     // Summary row
  //     excelRows.push({
  //       Phase: phase,
  //       Category: category,
  //       Subcategory: subCategory,
  //       'Item Description': item.description,
  //       References: references,
  //       ID: item.identifierId,
  //       Unit: unit,
  //       'Total Quantity': totalQuantity,
  //       Task: '',
  //       User: '',
  //       Quantity: '',
  //     });

  //     // Breakdown rows
  //     if (usage?.tasks?.length) {
  //       for (const task of usage.tasks) {
  //         excelRows.push({
  //           Phase: '',
  //           Category: '',
  //           Subcategory: '',
  //           'Item Description': '',
  //           References: '',
  //           ID: '',
  //           Unit: '',
  //           'Total Quantity': '',
  //           Task: task.Task,
  //           User: task.User,
  //           Quantity: task.Quantity,
  //         });
  //       }
  //     }

  //     // Spacer row
  //     excelRows.push({});
  //   }

  //   const worksheet = XLSX.utils.json_to_sheet(excelRows);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Shell Schedule');

  //   const buffer = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'buffer',
  //   }) as Buffer;

  //   return buffer;
  // }

  async generateShellScheduleForASpecificProject(
    projectId: string,
  ): Promise<Buffer> {
    const project = await this.projetService.getOne(projectId);
    if (!project) throw new BadRequestException('Project not found');

    const tasks = await this.taskService.findWhere({
      project: { id: projectId },
    });
    const taskIds = tasks.map((task) => task.id);
    if (!taskIds.length) {
      throw new BadRequestException('No tasks found for this project');
    }

    // Get all item-task-quantity records where the task belongs to this project
    const allQuantities =
      await this.quantitiesService.findWhereItemTaskToQuantity({
        task: { id: In(taskIds) },
      });

    // Get all ShellItems (not filtered by usage)
    const allItems = await this.shellService.findAllItems();

    // Prepare a lookup of usage per item
    const usageMap = new Map<
      string,
      {
        total: number;
        tasks: { Task: string; User: string; Quantity: number }[];
      }
    >();

    for (const qty of allQuantities) {
      const itemId = qty.item.id;
      if (!usageMap.has(itemId)) {
        usageMap.set(itemId, { total: 0, tasks: [] });
      }
      const entry = usageMap.get(itemId)!;
      entry.total += qty.amount;
      entry.tasks.push({
        Task: qty.task.name,
        User: qty.quantity.createdBy?.userName || 'Unknown',
        Quantity: qty.amount,
      });
    }

    // Sort items to ensure grouping by phase > category > subcategory
    // const sortedItems = [...allItems].sort((a, b) => {
    //   const getKey = (item: ShellItem) =>
    //     `${item.shellSubCategory?.shellCategory?.shellPhase?.name || ''}__${item.shellSubCategory?.shellCategory?.name || ''}__${item.shellSubCategory?.name || ''}`;
    //   return getKey(a).localeCompare(getKey(b));
    // });

    const excelRows: Record<string, any>[] = [];

    let lastPhase = '';
    let lastCategory = '';
    let lastSubCategory = '';

    for (const item of allItems) {
      const usage = usageMap.get(item.id);

      const phase =
        item.shellSubCategory?.shellCategory?.shellPhase?.name || '';
      const category = item.shellSubCategory?.shellCategory?.name || '';
      const subCategory = item.shellSubCategory?.name || '';
      const references = item.references?.join(', ') || '';
      const totalQuantity = usage?.total || 0;
      const unit = item.unit || '';

      // Only show phase/category/subcategory if they changed from the last row
      const displayPhase = phase !== lastPhase ? phase : '';
      const displayCategory = category !== lastCategory ? category : '';
      const displaySubCategory =
        subCategory !== lastSubCategory ? subCategory : '';

      lastPhase = phase;
      lastCategory = category;
      lastSubCategory = subCategory;

      // Summary row
      excelRows.push({
        Phase: displayPhase,
        Category: displayCategory,
        Subcategory: displaySubCategory,
        'Item Description': item.description,
        References: references,
        ID: item.identifierId,
        Unit: unit,
        'Total Quantity': totalQuantity,
        Task: '',
        User: '',
        Quantity: '',
      });

      // Breakdown rows
      if (usage?.tasks?.length) {
        for (const task of usage.tasks) {
          excelRows.push({
            Phase: '',
            Category: '',
            Subcategory: '',
            'Item Description': '',
            References: '',
            ID: '',
            Unit: '',
            'Total Quantity': '',
            Task: task.Task,
            User: task.User,
            Quantity: task.Quantity,
          });
        }
      }

      // Spacer row
      excelRows.push({});
    }

    const worksheet = XLSX.utils.json_to_sheet(excelRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Shell Schedule');

    const buffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    }) as Buffer;

    return buffer;
  }
}
