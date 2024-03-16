// usermanager.ts
import { User } from './user'

export class UserManager {
	private currentUser: User | null = null

	constructor() {
		this.currentUser = {
			id: 1,
			firstName: 'Kriss',
			lastName: 'Jaro',
		}
	}

	getCurrentUser(): User | null {
		return this.currentUser
	}

	setCurrentUser(user: User | null): void {
		this.currentUser = user
	}
}
