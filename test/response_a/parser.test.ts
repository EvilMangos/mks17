import { CommandNode, NumberNode, VariableNode } from "../../src/ast";
import { tokenize, parse } from "../../src/parser";
import { Token, TokenType } from "../../src/token";

describe("parser", () => {
	const tokens = [
		[
			new Token(TokenType.COMMAND, "printmk"),
			new Token(TokenType.NUMBER, "12"),
		],
		[
			new Token(TokenType.COMMAND, "save"),
			new Token(TokenType.VARIABLE, "sum"),
			new Token(TokenType.COMMAND, "add"),
			new Token(TokenType.NUMBER, "23"),
			new Token(TokenType.NUMBER, "43"),
			new Token(TokenType.NUMBER, "54"),
		],
	];

	it("tokenizes correctly", () => {
		const lines = ["printmk 12", "save sum add 23 43 54"];
		const result = tokenize(lines);
		expect(result).toEqual(tokens);
	});

	it("parses correctly", () => {
		const result = parse(tokens);
		expect(result).toEqual([
			new CommandNode("printmk", [new NumberNode(12)]),
			new CommandNode("save", [
				new VariableNode("sum"),
				new CommandNode("add", [
					new NumberNode(23),
					new NumberNode(43),
					new NumberNode(54),
				]),
			]),
		]);
	});
});
