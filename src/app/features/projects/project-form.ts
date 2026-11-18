
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Project, ProjectStore } from './project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectForm implements OnInit {
  isEdit = false;
  projectId: number | null = null;

  projectName = '';
  totalManPower: number | null = null;
  projectBudget: number | null = null;
  projectDiscription = '';
  status = '';
  projectStartDate = '';

  errorMessage = '';

  readonly statusList = [
    'Upcomping',
    'Running',
    'Completed',
    'Cancelled'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: ProjectStore
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.projectId = Number(id);

      const project = this.store.getById(this.projectId);

      if (project) {
        this.projectName = project.projectName;
        this.totalManPower = project.totalManPower;
        this.projectBudget = project.projectBudget;
        this.projectDiscription = project.projectDiscription;
        this.status = project.status;
        this.projectStartDate = project.projectStartDate;
      } else {
        this.router.navigate(['/admin/project']);
      }
    }
  }

  saveProject(): void {
    if (
      !this.projectName.trim() ||
      this.totalManPower === null ||
      this.projectBudget === null ||
      !this.status ||
      !this.projectStartDate
    ) {
      this.errorMessage = 'Please fill the required fields.';
      return;
    }

    const project: Project = {
      projectId: this.projectId ?? this.store.getNextId(),
      projectName: this.projectName.trim(),
      totalManPower: this.totalManPower,
      projectBudget: this.projectBudget,
      projectDiscription: this.projectDiscription,
      status: this.status,
      projectStartDate: this.projectStartDate
    };

    if (this.isEdit) {
      this.store.update(project);
    } else {
      this.store.add(project);
    }

    this.router.navigate(['/admin/project']);
  }

  cancel(): void {
    this.router.navigate(['/admin/project']);
  }
}
