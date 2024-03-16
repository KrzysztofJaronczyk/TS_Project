// app.ts
import { ProjectService } from './projectservice.ts'

const projectService = new ProjectService()
const projectList = document.getElementById('projectList')

window.addEventListener('DOMContentLoaded', () => {
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        console.log(addProject); // Sprawdź, czy funkcja addProject jest dostępna
        addProjectBtn.addEventListener('click', addProject);
        renderProjects();
    } else {
        console.error("Add project button not found!");
    }
});


// Dodajmy zmienną globalną, która będzie przechowywać identyfikator aktualnie edytowanego projektu
let currentEditId: string | null = null

function editProject(id: string) {
	const project = projectService.getProjectById(Number(id))
	if (project) {
		// Przypiszmy identyfikator aktualnego edytowanego projektu
		currentEditId = id

		// Uzupełnijmy dane w popupie
		const nameInput = document.getElementById('nameInput') as HTMLInputElement
		const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement
		nameInput.value = project.name
		descriptionInput.value = project.description

		// Wyświetlmy popup
		// Możesz tutaj wykorzystać różne techniki, np. modale, dialogi, czy nawet ukryte divy z CSS
		// W tym przykładzie użyjemy prostego alertu, ale zalecamy zaimplementowanie bardziej eleganckiego rozwiązania
		alert('Editing project: ' + project.name)
	}
}

// W funkcji addProject dodajemy logikę, aby w przypadku, gdy mamy aktualny projekt do edycji, aktualizować go zamiast dodawać nowy
function addProject() {
	const nameInput = document.getElementById('nameInput') as HTMLInputElement
	const descriptionInput = document.getElementById('descriptionInput') as HTMLInputElement
	const name = nameInput.value.trim()
	const description = descriptionInput.value.trim()

	if (name && description) {
		if (currentEditId) {
			// Jeśli mamy aktualnie edytowany projekt, zaktualizuj jego dane
			const project = projectService.getProjectById(Number(currentEditId))
			if (project) {
				project.name = name
				project.description = description
				projectService.updateProject(project)
				renderProjects()
				nameInput.value = ''
				descriptionInput.value = ''
				currentEditId = null // Zresetuj aktualny projekt do edycji
			}
		} else {
			// W przeciwnym razie, dodaj nowy projekt
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

// Funkcja renderProjects pozostaje bez zmian

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

			// Dodanie przycisku do edycji projektu
			const editBtn = document.createElement('button')
			editBtn.textContent = 'Edit'
			editBtn.addEventListener('click', () => editProject(project.id.toString()))
			li.appendChild(editBtn)

			// Dodanie przycisku do usuwania projektu
			const deleteBtn = document.createElement('button')
			deleteBtn.textContent = 'Delete'
			deleteBtn.addEventListener('click', () => deleteProject(project.id.toString()))
			li.appendChild(deleteBtn)

			// Ustawienie identyfikatora projektu jako atrybutu data-id
			li.dataset.id = project.id.toString()

			projectList.appendChild(li)
		})
	} else {
		console.error('Project list element not found!')
	}
}
