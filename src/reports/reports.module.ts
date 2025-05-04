import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { QuantitiesModule } from 'src/quantities/quantities.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { ShellsheduleModule } from 'src/shellshedule/shellshedule.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    TasksModule,
    ShellsheduleModule,
    QuantitiesModule,
    ProjectsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

/*
---

### 1. **Total Item Usage Report (Project-Specific)**  
**Q:** *How much "Steel Beams" were used in the "Downtown Tower" project?*  
**A:** Sums quantities of "Steel Beams" **only for tasks under "Downtown Tower."**  
*Example:*  
- **Project: Downtown Tower**  
  - Steel Beams: 1,200 units (used across all tasks in this project).  

---

### 2. **Item Breakdown by Task (Within a Project)**  
**Q:** *How was "Concrete Mix" allocated across tasks in the "Hospital Renovation" project?*  
**A:** Lists tasks **under that project** and their concrete usage.  
*Example:*  
- **Project: Hospital Renovation**  
  - Task A (Foundation): 500 units  
  - Task B (Emergency Wing): 300 units  

---

### 3. **User-Specific Item Usage (Project-Filtered)**  
**Q:** *How much "Electrical Wiring" did User John request for tasks in the "Solar Farm" project?*  
**A:** Shows John’s wiring assignments **only for tasks linked to "Solar Farm."**  
*Example:*  
- **Project: Solar Farm**  
  - John assigned:  
    - 200 units to Task X (Panel Installation)  
    - 50 units to Task Y (Grid Connection).  

---

### 4. **Item Usage + User Contribution (Project Scope)**  
**Q:** *Can I see "Drywall" usage and user requests for the "Hotel Lobby" project?*  
**A:** Breaks down Drywall usage **per user** within the project’s tasks.  
*Example:*  
- **Project: Hotel Lobby**  
  - Total Drywall: 800 units  
    - User Alice: 500 units (Task A: Walls)  
    - User Bob: 300 units (Task B: Ceilings).  

---

### Why Projects Matter:  
1. **Cost Tracking:** Avoid mixing up material costs between projects.  
   - *Example:* Steel used in "Project A" shouldn’t inflate "Project B’s" budget.  
2. **Accountability:** Link users, tasks, and materials to specific projects.  
   - *Example:* Knowing John ordered wiring for "Solar Farm" (not "Warehouse").  
3. **Inventory Management:** Project-specific reports prevent overallocation.  
   - *Example:* Ensure 500 units of concrete are reserved for "Hospital Renovation."  

---

### Key Adjustments to Your Original Questions:  
- **Filter all queries by `project_id`** (e.g., via `Task.project` relationship).  
- **Group by project first**, then drill into tasks/users/items.  
- **Exportable Reports (PDF/Excel):** Label files with project names (e.g., `Hotel_Lobby_Drywall_Report.xlsx`).  

Would you like to add project-based filters like time ranges (e.g., "Q1 2024") or approval statuses (e.g., "Pending vs. Approved Quantities")?












































































---

5. Single Task Material Breakdown  
Q: What materials were used in "Roofing Task" and who ordered them?  
A: Lists all items (e.g., Shingles, Nails) and the users involved.  
Example:  
- Roofing Task:  
  - Shingles: 200 units (User John)  
  - Nails: 5 kg (User Sarah)

---

6. Task-Centric Summary  
Q: Can I get a summary of "Interior Finishing Task" showing all materials and contributors?  
A: Groups all items and users for that task.  
Example:
- Interior Finishing:  
  - Paint: 20 gallons (User Jane)  
  - Flooring: 500 sq.ft (User Mike)  

---

7. User Contribution to Projects
Q: How can I track which projects User Alex contributed to via material requests?  
A: Links Alex’s material assignments to tasks/projects.  
Example:  
- Alex worked on:  
  - Project "Sky Tower" (Requested Steel: 10 units)  
  - Project "Park Plaza" (Requested Glass: 5 units)  

---

8. Project-Wide Material Costs [PDF, Excel]
Q: How do I estimate the total "Wood" cost for "Project X"?  
A: Sums all wood quantities assigned to tasks under Project X.  
Example:
- Project X (Wood): 500 units × $10/unit = $5,000.  

---

Key Relationships Used:  
- Items → Tasks: Via `ItemTaskToQuantity` (tracks amounts).  
- Users → Tasks: Through `Quantity.createdBy` (who logged the usage).  
- Tasks → Projects: Direct link in `Task` entity.  

*/
