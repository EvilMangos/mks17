import * as fs from "fs/promises";

export async function readFile(filePath: string): Promise<string[]> {
	if (!filePath.endsWith(".mks17")) {
		throw new Error("File must have a .mks17 extension");
	}
	const fileContent = await fs.readFile(filePath, "utf-8");
	return fileContent
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);
}
