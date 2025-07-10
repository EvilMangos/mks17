import { readFile } from "./fileReader";
import { tokenize, parse } from "./parser";
import "./variables";
import {ASTNode} from "./ast";

export function executeCommands(commands: ASTNode[]): void {
	commands.forEach((command) => {
		command.evaluate();
	});
}

export async function main(filePath: string): Promise<void> {
	const lines = await readFile(filePath);
	const tokens = tokenize(lines);
	const commands = parse(tokens);
	executeCommands(commands);
}

if (require.main === module) {
	const filePath = process.argv[2];
	if (!filePath) {
		console.error("Please provide a file path");
		process.exit(1);
	}
	main(filePath);
}
