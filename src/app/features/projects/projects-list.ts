
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectStore } from './project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})

export class Projects {
  constructor(public store: ProjectStore) {}

  deleteProject(id: number): void {
    if (confirm('Are you sure want to delete?')) {
      this.store.delete(id);
    }
  }
}
