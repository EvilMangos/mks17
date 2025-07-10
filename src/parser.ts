import { Token, TokenType } from "./token";
import { ASTNode, NumberNode, CommandNode, VariableNode } from "./ast";
import { commands } from "./commandExecutor";
import { variables } from "./variables";

export function tokenize(lines: string[]): Token[][] {
	const tokens: Token[][] = [];

	lines.forEach((line) => {
		if (line === "") return;

		const parts = line.split(/\s+/);
		const temptLine: Token[] = [];
		parts.forEach((part) => {
			if (!isNaN(Number(part))) {
				temptLine.push(new Token(TokenType.NUMBER, part));
			} else if (commands.includes(part)) {
				temptLine.push(new Token(TokenType.COMMAND, part));
			} else {
				temptLine.push(new Token(TokenType.VARIABLE, part));
			}
		});
		tokens.push(temptLine);
	});

	return tokens;
}

export function parse(tokens: Token[][]): ASTNode[] {
	const astNodes: ASTNode[] = [];

	for (const tokensLine of tokens) {
		const commands: CommandNode[] = [];
		for (const token of tokensLine) {
			if (token.type === TokenType.COMMAND) {
				commands.push(new CommandNode(token.value));
			} else if (token.type === TokenType.NUMBER) {
				commands[commands.length - 1].parameters.push(
					new NumberNode(Number(token.value))
				);
			} else if (token.type === TokenType.VARIABLE) {
				if (!variables[token.value]) {
					variables[token.value] = new VariableNode(token.value);
				}
				commands[commands.length - 1].parameters.push(variables[token.value]);
			}
		}
		for (let i = commands.length - 1; i >= 1; i--) {
			commands[i - 1].parameters.push(commands[i]);
		}
		astNodes.push(commands[0]);
	}

	return astNodes;
}
