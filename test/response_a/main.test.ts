import { main } from "../../src/main";
import { variables } from "../../src/variables";

const mockLines = ["printmk 12", "save sum add 23 43 54"];

jest.mock("../../src/fileReader.ts", () => ({
	readFile: jest.fn(() => mockLines),
}));

describe("main function", () => {
	it("executes commands correctly", () => {
		const mockFilePath = "testFile.mks17";

		const spy = jest.spyOn(console, "log").mockImplementation(() => {});
		main(mockFilePath);
		expect(spy.mock.calls[0][0]).toBe(12);
		expect(variables["sum"].value).toBe(120);
		spy.mockRestore();
	});
});
