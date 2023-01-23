import { Injectable } from "@angular/core";

/**
 * Allows the state of an object to be stored and retrieved later.
 * This is used to store the state of a component when navigating away from component page
 * When navigating back to the page, the stored state is retrieved
 */
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