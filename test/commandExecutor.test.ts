import { executeCommand } from "../src/commandExecutor";
import { ASTNode, CommandNode, NumberNode, VariableNode } from "../src/ast";
import { variables } from "../src/variables";

describe("commandExecutor", () => {
	it("executes printmk command correctly", () => {
		const value = 7;
		const spy = jest.spyOn(console, "log").mockImplementation(() => {});
		const command = new CommandNode("printmk", [new NumberNode(value)]);

		expect(executeCommand(command)).toBe(null);
		expect(spy.mock.calls[0][0]).toBe(value);
		spy.mockRestore();
	});

	it("executes add command correctly", () => {
		const addend1 = 2;
		const addend2 = 3;
		const sum = addend1 + addend2;
		const command = new CommandNode("add", [
			new NumberNode(addend1),
			new NumberNode(addend2),
		]);

		expect(executeCommand(command)).toBe(sum);
	});

	it("executes subtract command correctly", () => {
		const minuend = 10;
		const subtrahend = 5;
		const result = minuend - subtrahend;
		const command = new CommandNode("subtract", [
			new NumberNode(minuend),
			new NumberNode(subtrahend),
		]);

		expect(executeCommand(command)).toBe(result);
	});

	it("executes divide command correctly", () => {
		const dividend = 10;
		const divisor = 2;
		const result = dividend / divisor;
		const command = new CommandNode("divide", [
			new NumberNode(dividend),
			new NumberNode(divisor),
		]);

		expect(executeCommand(command)).toBe(result);
	});

	it("executes multiply command correctly", () => {
		const multiplier1 = 2;
		const multiplier2 = 3;
		const result = multiplier1 * multiplier2;
		const command = new CommandNode("multiply", [
			new NumberNode(multiplier1),
			new NumberNode(multiplier2),
		]);

		expect(executeCommand(command)).toBe(result);
	});

	it("executes pow command correctly", () => {
		const base = 2;
		const exponent = 3;
		const result = Math.pow(base, exponent);
		const command = new CommandNode("pow", [
			new NumberNode(base),
			new NumberNode(exponent),
		]);

		expect(executeCommand(command)).toBe(result);
	});

	it("executes save command correctly", () => {
		const variableName = "a";
		const variableValue = 10;
		const command = new CommandNode("save", [
			new VariableNode(variableName),
			new NumberNode(variableValue),
		]);

		variables[variableName] = {
			setValue: (value: ASTNode) => (variables[variableName] = value),
		};

		expect(executeCommand(command)).toBe(null);
		expect(variables[variableName]).toBe(variableValue);
	});

	it("throws error for unknown command", () => {
		const command = new CommandNode("unknown", []);

		expect(() => executeCommand(command)).toThrow("Unknown command: unknown");
	});
});
