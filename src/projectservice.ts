// ProjectService.ts

import { Project } from './project';
export class ProjectService {
    private readonly storageKey = 'projects';

    getAllProjects(): Project[] {
        const projectsJson = localStorage.getItem(this.storageKey);
        return projectsJson ? JSON.parse(projectsJson) : [];
    }

    getProjectById(id: number): Project | undefined {
        const projects = this.getAllProjects();
        return projects.find(project => project.id === id);
    }

    addProject(project: Project): void {
        const projects = this.getAllProjects();
        projects.push(project);
        localStorage.setItem(this.storageKey, JSON.stringify(projects));
    }

    updateProject(updatedProject: Project): void {
        const projects = this.getAllProjects();
        const index = projects.findIndex(project => project.id === updatedProject.id);
        if (index !== -1) {
            projects[index] = updatedProject;
            localStorage.setItem(this.storageKey, JSON.stringify(projects));
        }
    }

    deleteProject(id: number): void {
        const projects = this.getAllProjects();
        const updatedProjects = projects.filter(project => project.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(updatedProjects));
    }
}