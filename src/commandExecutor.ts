import { ASTNode, CommandNode } from "./ast";
import { variables } from "./variables";

export const commands = [
	"printmk",
	"add",
	"subtract",
	"divide",
	"multiply",
	"pow",
	"save",
];

export function executeCommand(command: CommandNode): number | null {
	switch (command.name) {
		case "printmk":
			printmk(command.parameters);
			return null;
		case "add":
			return add(command.parameters);
		case "subtract":
			return subtract(command.parameters);
		case "divide":
			return divide(command.parameters);
		case "multiply":
			return multiply(command.parameters);
		case "pow":
			return pow(command.parameters);
		case "save":
			save(command.parameters);
			return null;
		default:
			throw new Error(`Unknown command: ${command.name}`);
	}
}

function printmk(parameters: ASTNode[]): void {
	parameters.forEach((parameter) => {
		console.log(parameter.evaluate());
	});
}

function add(parameters: ASTNode[]): number {
	return parameters.reduce((acc, param) => acc + param.evaluate()!, 0);
}

function subtract(parameters: ASTNode[]): number {
	return parameters
		.slice(1)
		.reduce((acc, param) => acc - param.evaluate(), parameters[0].evaluate());
}

function divide(parameters: ASTNode[]): number {
	return parameters
		.slice(1)
		.reduce((acc, param) => acc / param.evaluate(), parameters[0].evaluate());
}

function multiply(parameters: ASTNode[]): number {
	return parameters
		.slice(1)
		.reduce((acc, param) => acc * param.evaluate(), parameters[0].evaluate());
}

function pow(parameters: ASTNode[]): number {
	return parameters
		.slice(1)
		.reduce(
			(acc, param) => Math.pow(acc, param.evaluate()),
			parameters[0].evaluate()
		);
}

function save(parameters: ASTNode[]): void {
	const variable = parameters[0];
	const value = parameters[1];
	variables[variable.name].setValue(value.evaluate());
}
