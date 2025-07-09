import { readFile } from "../src/fileReader";

const mockContent = "printmk 12\nsave sum add 23 43 54\n";

jest.mock("fs", () => ({
	readFileSync: jest.fn(() => mockContent),
}));

describe("fileReader", () => {
	it("reads file content correctly", () => {
		const result = readFile("testFile.mks17");
		expect(result).toEqual(["printmk 12", "save sum add 23 43 54"]);
	});

	it("throws error if file does not have .mks17 extension", () => {
		expect(() => readFile("testFile.txt")).toThrow(
			"File must have a .mks17 extension"
		);
	});
});
