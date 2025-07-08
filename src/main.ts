import { readFile } from "./fileReader";
import { tokenize, parse } from "./parser";
import "./variables";

export async function main(filePath: string): Promise<void> {
	const lines = await readFile(filePath);
	const tokens = tokenize(lines);
	const commands = parse(tokens);
	commands.forEach((command) => {
		command.evaluate();
	});
}

if (require.main === module) {
	const filePath = process.argv[2];
	if (!filePath) {
		console.error("Please provide a file path");
		process.exit(1);
	}
	main(filePath);
}
