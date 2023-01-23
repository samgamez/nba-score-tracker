import { Injectable } from "@angular/core";

@Injectable()
export class StateService<T> {
	state?: T;

	store(newState: T): void {
		this.state = newState;
	}

	retrieve(): T | undefined {
		return this.state;
	}
}