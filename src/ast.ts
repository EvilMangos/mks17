import { executeCommand } from "./commandExecutor";
import {variables} from "./variables";

export abstract class ASTNode {
	name: string = "";
	abstract evaluate(): number;
}

export class NumberNode extends ASTNode {
	value: number;

	constructor(value: number) {
		super();
		this.value = value;
	}

	evaluate(): number {
		return this.value;
	}
}

export class VariableNode extends ASTNode {
	name: string;
	value: number | null;
	totalNumberOfInvokes: number;
	currentNumberOfInvokes: number;

	constructor(name: string, value: number | null = null) {
		super();
		this.name = name;
		this.value = value;
		this.totalNumberOfInvokes = 1;
		this.currentNumberOfInvokes = 0;
	}

	evaluate(): number {
		this.incrementCurrentNumberOfInvokes();
		const result = this.value ?? 0;
		this.tryGarbageCollect();
		return result;
	}

	setValue(value: number): void {
		this.incrementCurrentNumberOfInvokes();
		this.value = value;
		this.tryGarbageCollect();
	}

	removeValue(): void {
		this.incrementCurrentNumberOfInvokes();
		this.value = null;
		this.tryGarbageCollect();
	}

	incrementTotalNumberOfInvokes(): void {
		this.totalNumberOfInvokes += 1;
	}

	incrementCurrentNumberOfInvokes(): void {
		this.currentNumberOfInvokes += 1;
	}

	private tryGarbageCollect(): void {
		if (
			this.currentNumberOfInvokes >= this.totalNumberOfInvokes
		) {
			delete variables[this.name];
		}
	}
}

export class CommandNode extends ASTNode {
	name: string;
	parameters: ASTNode[];

	constructor(name: string, parameters: ASTNode[] = []) {
		super();
		this.name = name;
		this.parameters = parameters;
	}

	evaluate(): number {
		return executeCommand(this) || 0;
	}
}
