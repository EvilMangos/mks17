export enum TokenType {
	NUMBER,
	COMMAND,
	VARIABLE,
}

export class Token {
	type: TokenType;
	value: string;

	constructor(type: TokenType, value: string) {
		this.type = type;
		this.value = value;
	}
}
