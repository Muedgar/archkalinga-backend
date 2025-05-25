import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
  Header,
  Param,
  Res,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { Response } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('total-item-usage')
  async getTotalItemUsage(
    @Query('itemId') itemId: string,
    @Query('projectId') projectId: string,
  ) {
    if (!itemId || !projectId) {
      throw new BadRequestException('Both itemId and projectId are required');
    }
    return this.reportsService.getTotalItemUsageAcrossTasks(itemId, projectId);
  }

  @Get('item-task-breakdown')
  async getItemTaskBreakdown(
    @Query('itemId') itemId: string,
    @Query('projectId') projectId: string,
  ) {
    if (!itemId || !projectId) {
      throw new BadRequestException('Both itemId and projectId are required');
    }
    return this.reportsService.itemAndQuantityBreakdownByTask(
      itemId,
      projectId,
    );
  }

  @Get('user-item-usage')
  async getUserItemUsage(
    @Query('userId') userId: string,
    @Query('itemId') itemId: string,
    @Query('projectId') projectId: string,
  ) {
    if (!userId || !itemId || !projectId) {
      throw new BadRequestException(
        'userId, itemId, and projectId are required',
      );
    }
    return this.reportsService.getUserItemUsageInProject(
      userId,
      itemId,
      projectId,
    );
  }

  @Get('item-user-contributions')
  async getItemUserContributions(
    @Query('itemId') itemId: string,
    @Query('projectId') projectId: string,
  ) {
    if (!itemId || !projectId) {
      throw new BadRequestException('Both itemId and projectId are required');
    }
    return this.reportsService.getItemUsageWithUserContributions(
      itemId,
      projectId,
    );
  }

  @Get('shell-schedule/:projectId')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment; filename="ShellSchedule.xlsx"')
  async downloadShellSchedule(
    @Param('projectId') projectId: string,
    @Res() res: Response,
  ) {
    const buffer =
      await this.reportsService.generateShellScheduleForASpecificProject(
        projectId,
      );
    res.send(buffer);
  }
}
