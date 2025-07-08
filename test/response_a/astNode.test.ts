import { NumberNode, VariableNode, CommandNode, ASTNode } from "../../src/ast";
import { variables } from "../../src/variables";

describe("ASTNode and its subclasses", () => {
	test("NumberNode evaluates correctly", () => {
		const value = 10;
		const node = new NumberNode(value);

		expect(node.evaluate()).toBe(value);
	});

	test("VariableNode evaluates correctly with initial value", () => {
		const value = 5;
		const node = new VariableNode("a", value);

		expect(node.evaluate()).toBe(value);
	});

	test("VariableNode evaluates to 0 if no value is set", () => {
		const node = new VariableNode("b");

		expect(node.evaluate()).toBe(0);
	});

	test("VariableNode setValue method sets the value", () => {
		const value = 15;
		const node = new VariableNode("c");

		node.setValue(value);
		expect(node.evaluate()).toBe(value);
	});

	test("CommandNode with printmk command executes correctly", () => {
		const value = 7;
		const node = new CommandNode("printmk", [new NumberNode(value)]);
		const spy = jest.spyOn(console, "log").mockImplementation(() => {});

		node.evaluate();
		expect(spy.mock.calls[0][0]).toBe(value);
		spy.mockRestore();
	});

	test("CommandNode with add command executes correctly", () => {
		const addend1 = 2;
		const addend2 = 3;
		const sum = addend1 + addend2;
		const node = new CommandNode("add", [
			new NumberNode(addend1),
			new NumberNode(addend2),
		]);

		expect(node.evaluate()).toBe(sum);
	});

	test("CommandNode with subtract command executes correctly", () => {
		const minuend = 10;
		const subtrahend = 5;
		const result = minuend - subtrahend;
		const node = new CommandNode("subtract", [
			new NumberNode(minuend),
			new NumberNode(subtrahend),
		]);

		expect(node.evaluate()).toBe(result);
	});

	test("CommandNode with divide command executes correctly", () => {
		const dividend = 10;
		const divisor = 2;
		const result = dividend / divisor;
		const node = new CommandNode("divide", [
			new NumberNode(dividend),
			new NumberNode(divisor),
		]);

		expect(node.evaluate()).toBe(result);
	});

	test("CommandNode with multiply command executes correctly", () => {
		const multiplier1 = 2;
		const multiplier2 = 3;
		const result = multiplier1 * multiplier2;
		const node = new CommandNode("multiply", [
			new NumberNode(multiplier1),
			new NumberNode(multiplier2),
		]);

		expect(node.evaluate()).toBe(result);
	});

	test("CommandNode with pow command executes correctly", () => {
		const base = 2;
		const exponent = 3;
		const result = Math.pow(base, exponent);
		const node = new CommandNode("pow", [
			new NumberNode(base),
			new NumberNode(exponent),
		]);

		expect(node.evaluate()).toBe(result);
	});

	test("CommandNode with save command executes correctly", () => {
		const variableName = "a";
		const variableValue = 10;
		const node = new CommandNode("save", [
			new VariableNode(variableName),
			new NumberNode(variableValue),
		]);
		variables[variableName] = {
			setValue: (value: ASTNode) => (variables[variableName] = value),
		};

		expect(() => node.evaluate()).not.toThrow();
		expect(variables[variableName]).toBe(variableValue);
	});
});
