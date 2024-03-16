// app.ts
import { ProjectService } from './projectservice.ts'
import { UserManager } from './usermanager.ts'

const projectService = new ProjectService()
const userManager = new UserManager()
const projectList = document.getElementById('projectList')

window.addEventListener('DOMContentLoaded', () => {
	const addProjectBtn = document.getElementById('addProjectBtn')
	if (addProjectBtn) {
		// console.log(addProject)
		addProjectBtn.addEventListener('click', addProject)
		renderProjects()
		renderUserInfo()
	} else {
		console.error('Add project button not found!')
	}
})

let currentEditId: string | null = null

function editProject(id: string) {
	const project = projectService.getProjectById(Number(id))
	if (project) {
		currentEditId = id
		const nameInput = document.getElementById('nameInput') as HTMLInputElement
		const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement
		nameInput.value = project.name
		descriptionInput.value = project.description
		alert('Editing project: ' + project.name)
	}
}

function addProject() {
	const nameInput = document.getElementById('nameInput') as HTMLInputElement
	const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement
	const name = nameInput.value.trim()
	const description = descriptionInput.value.trim()

	if (name && description) {
		if (currentEditId) {
			const project = projectService.getProjectById(Number(currentEditId))
			if (project) {
				project.name = name
				project.description = description
				projectService.updateProject(project)
				renderProjects()
				nameInput.value = ''
				descriptionInput.value = ''
				currentEditId = null 
			}
		} else {
			const project = {
				id: Date.now(),
				name,
				description,
			}
			projectService.addProject(project)
			renderProjects()
			nameInput.value = ''
			descriptionInput.value = ''
		}
	} else {
		alert('Please enter project name and description')
		return
	}
}

function deleteProject(id: string) {
	const confirmDelete = confirm('Are you sure you want to delete this project?')
	if (confirmDelete) {
		projectService.deleteProject(Number(id))
		renderProjects()
	}
}

function renderProjects() {
	if (projectList) {
		projectList.innerHTML = ''
		const projects = projectService.getAllProjects()
		projects.forEach(project => {
			const li = document.createElement('li')
			li.textContent = `${project.name}: ${project.description}`

			const editBtn = document.createElement('button')
			editBtn.textContent = 'Edit'
			editBtn.addEventListener('click', () => editProject(project.id.toString()))
			li.appendChild(editBtn)

			const deleteBtn = document.createElement('button')
			deleteBtn.textContent = 'Delete'
			deleteBtn.addEventListener('click', () => deleteProject(project.id.toString()))
			li.appendChild(deleteBtn)

			li.dataset.id = project.id.toString()

			projectList.appendChild(li)
		})
	} else {
		console.error('Project list element not found!')
	}
}

function renderUserInfo() {
	const currentUser = userManager.getCurrentUser()
	if (currentUser) {
		const userInfoDiv = document.createElement('div')
		userInfoDiv.textContent = `Logged in as: ${currentUser.firstName} ${currentUser.lastName}`
		document.body.appendChild(userInfoDiv)
	} else {
		console.log('No user logged in.')
	}
}
