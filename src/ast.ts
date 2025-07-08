import { executeCommand } from "./commandExecutor";

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

	constructor(name: string, value: number | null = null) {
		super();
		this.name = name;
		this.value = value;
	}

	evaluate(): number {
		return this.value || 0;
	}

	setValue(value: number): void {
		this.value = value;
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
