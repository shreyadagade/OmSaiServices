
import { Injectable } from '@angular/core';

export interface Project {
  projectId: number;
  projectName: string;
  projectDiscription: string;
  totalManPower: number;
  projectBudget: number;
  status: string;
  projectStartDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectStore {
  projects: Project[] = [
    { projectId: 2, projectName: 'JSPM', projectDiscription: 'NA', totalManPower: 200, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 3, projectName: 'PSIPL', projectDiscription: 'Security Services', totalManPower: 15, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 4, projectName: 'Small Site', projectDiscription: 'Other Site', totalManPower: 45, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 5, projectName: 'Krishnae Infrastructure', projectDiscription: 'Traffic Warden', totalManPower: 20, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 6, projectName: 'Thane Project', projectDiscription: 'Traffic Warden', totalManPower: 75, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 7, projectName: 'ASIPL', projectDiscription: 'Traffic Warden', totalManPower: 35, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 8, projectName: 'TATA', projectDiscription: 'Traffic Marshal', totalManPower: 80, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 9, projectName: 'SRPF', projectDiscription: 'Peon Mochi', totalManPower: 13, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 10, projectName: 'Enterprises', projectDiscription: 'Security', totalManPower: 30, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 11, projectName: 'office', projectDiscription: 'Office Staff', totalManPower: 6, projectBudget: 0, status: 'Running', projectStartDate: '' },
    { projectId: 12, projectName: 'Test', projectDiscription: 'test project', totalManPower: 20, projectBudget: 100000, status: 'Running', projectStartDate: '' },
    { projectId: 13, projectName: 'KAD NAGAR HOLEWASTI', projectDiscription: 'NA', totalManPower: 10, projectBudget: 1, status: 'Running', projectStartDate: '' },
    { projectId: 14, projectName: 'AMNORA', projectDiscription: '', totalManPower: 20, projectBudget: 20, status: 'Running', projectStartDate: '' },
    { projectId: 15, projectName: 'Pune Mahanagar Parivahan Mahamandal Limited', projectDiscription: '', totalManPower: 21, projectBudget: 4568256, status: 'Running', projectStartDate: '' },
    { projectId: 16, projectName: 'VISIONS VISHRANTWADI', projectDiscription: 'T.W', totalManPower: 25, projectBudget: 500000, status: 'Running', projectStartDate: '' },
    { projectId: 17, projectName: 'string', projectDiscription: 'string', totalManPower: 0, projectBudget: 0, status: 'string', projectStartDate: '' },
    { projectId: 18, projectName: 'Civil', projectDiscription: 'string', totalManPower: 0, projectBudget: 0, status: 'Running', projectStartDate: '' }
  ];

  getNextId(): number {
    return Math.max(0, ...this.projects.map(p => p.projectId)) + 1;
  }

  add(project: Project): void {
    this.projects.push(project);
  }

  update(project: Project): void {
    const index = this.projects.findIndex(p => p.projectId === project.projectId);
    if (index !== -1) {
      this.projects[index] = project;
    }
  }

  delete(id: number): void {
    this.projects = this.projects.filter(p => p.projectId !== id);
  }

  getById(id: number): Project | undefined {
    return this.projects.find(p => p.projectId === id);
  }
}
