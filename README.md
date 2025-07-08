# How to set up project

`npm i` - to install dependencies (versions node: 22.12.0 and npm: 11.1.0 work for me).

Put your MKS17 code into `input.mks17` file.

To run MKS17 code, run at the project root directory: `npx ts-node src/main input.mks17` 

# MKS17 Language Documentation

## Overview
MKS17 is a custom scripting language designed for simple computations and variable manipulations. Files in this language use the `.mks17` extension. The language supports basic arithmetic operations, variable storage, and output functionality through a command-based syntax.

## File Structure
- Programs are written in plain text files with the `.mks17` extension.
- Each line in the file represents a sequence of commands, numbers, or variables separated by whitespace.
- Empty lines are ignored during processing.

## Syntax and Elements
### Tokens
The language recognizes three types of tokens:
- **Numbers**: Numeric values used in calculations (e.g., `5`, `10.2`).
- **Commands**: Predefined operations that perform specific tasks (e.g., `add`, `printmk`).
- **Variables**: Named identifiers for storing and retrieving values (e.g., `x`, `result`).

### Commands
MKS17 supports the following built-in commands:
- **printmk**: Outputs the evaluated result of each parameter to the console.
- **add**: Adds all provided parameters together.
- **subtract**: Subtracts subsequent parameters from the first parameter.
- **divide**: Divides the first parameter by subsequent parameters.
- **multiply**: Multiplies the first parameter by subsequent parameters.
- **pow**: Raises the first parameter to the power of subsequent parameters.
- **save**: Stores a computed value into a variable (format: `save variable value`).

### Variables
- Variables are dynamically created when first referenced in the program.
- They can store numeric values using the `save` command.
- If a variable is used before assignment, it evaluates to `0`.

### Command Nesting
- Commands can be nested, allowing complex expressions. For example, a command can take another command as a parameter, which is evaluated first.
- Nested commands are processed from the innermost to the outermost.

## Execution Flow
1. **Reading**: The input file is read line by line.
2. **Tokenization**: Each line is split into tokens (numbers, commands, variables).
3. **Parsing**: Tokens are organized into an Abstract Syntax Tree (AST) where commands are nodes with parameters as children.
4. **Evaluation**: The AST is traversed, and each command or expression is evaluated, executing operations or storing/retrieving variable values.

## Example
An example MKS17 program might look like:
```
add 5 3
save x 10
printmk x
multiply x 2
printmk x
```
**Output**:
```
10
20
```

This program adds 5 and 3 (result ignored), saves 10 to variable `x`, prints `x`, multiplies `x` by 2, and prints the new value of `x`.

## Implementation Details
- The language is implemented in TypeScript.
- It uses a modular structure with separate components for file reading, tokenization, parsing, and command execution.
- Variables are stored in a global object for simplicity, allowing access across the program.

If you have specific aspects of the language you'd like to dive deeper into or additional features not covered in the provided files, please let me know!
