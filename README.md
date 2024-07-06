# proveit

![GitHub License](https://img.shields.io/github/license/targendaz2/proveit)
![GitHub Release](https://img.shields.io/github/v/release/targendaz2/proveit?label=version)
![NPM Version](https://img.shields.io/npm/v/proveit?logo=npm&logoColor=%23999999)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/targendaz2/proveit/test.yml?logo=github&label=tests&logoColor=%23999999)

This package adds additional assertions and type checkers to Node.js projects.

## Installation

This package is available on npm as [`proveit`](https://npmjs.com/package/proveit).

```bash
npm install -D jest proveit
```

## Usage

### Assertions

- `.assertIsPathLike(value)` - Asserts that the given value is [PathLike](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e601f0823d6d26007758ebbf8d427d3781bad840/types/node/fs.d.ts#L30).
- `.assertPathExists(path)` - Asserts that the given path exists.
- `.assertPathIsDirectory(path)` - Asserts that the given path is a directory.
- `.assertPathIsFile(path)` - Asserts that a given path is a file.
- `.assertPathIsExecutable(path)` - Asserts that the given path is an executable file.

### Type Checks

- `.isPathLike(value)` - Checks if the given value is [PathLike](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/e601f0823d6d26007758ebbf8d427d3781bad840/types/node/fs.d.ts#L30).
- `.isUnixFileMode(value)` - Checks if the given value could be a valid Unix file mode.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This package is licensed under the [MIT License](https://github.com/targendaz2/proveit/blob/main/LICENSE).
