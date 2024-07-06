import fs, { PathLike, constants } from 'node:fs';
import { FileSystemError, PermissionsError, ValueError } from 'error-wave';
import { isPathLike } from './validators.js';

/**
 * Asserts that the given value is {@link PathLike}.
 * @param {*} value A value of any type.
 * @throws {TypeError} If the given value is not {@link PathLike}.
 * @throws {ValueError} If the given value is an empty string.
 */
export function assertIsPathLike(value: any): asserts value is PathLike {
    if (!isPathLike(value)) {
        throw new TypeError('This must be PathLike!');
    } else if (value === '') {
        throw new ValueError('This must not be an empty string!');
    }
}

/**
 * Asserts that the given path exists.
 * @param {*} path A system path.
 * @throws {TypeError} If the given value is not {@link PathLike}.
 * @throws {ValueError} If the given value is an empty string.
 * @throws {FileSystemError} If the given path does not exist.
 */
export function assertPathExists(path: any): asserts path is PathLike {
    assertIsPathLike(path);
    if (!fs.existsSync(path)) {
        throw new FileSystemError(`Path "${path}" does not exist!`);
    }
}

/**
 * Asserts that the given path is a directory.
 * @param {*} path A system path.
 * @throws {TypeError} If the given value is not {@link PathLike}.
 * @throws {ValueError} If the given value is an empty string.
 * @throws {FileSystemError} If the given path does not exist.
 * @throws {FileSystemError} If the given path is not a directory.
 */
export function assertPathIsDirectory(path: any): asserts path is PathLike {
    assertPathExists(path);
    if (!fs.statSync(path).isDirectory()) {
        throw new FileSystemError(`Path "${path}" is not a directory!`);
    }
}

/**
 * Asserts that the given path is a file.
 * @param {*} path A system path.
 * @throws {TypeError} If the given value is not {@link PathLike}.
 * @throws {ValueError} If the given value is an empty string.
 * @throws {FileSystemError} If the given path does not exist.
 * @throws {FileSystemError} If the given path is not a file.
 */
export function assertPathIsFile(path: any): asserts path is PathLike {
    assertPathExists(path);
    if (!fs.statSync(path).isFile()) {
        throw new FileSystemError(`Path "${path}" is not a file!`);
    }
}

/**
 * Asserts that the given path is an executable file.
 * @param {*} path A system path.
 * @throws {TypeError} If the given value is not {@link PathLike}.
 * @throws {ValueError} If the given value is an empty string.
 * @throws {FileSystemError} If the given path does not exist.
 * @throws {FileSystemError} If the given path is not a file.
 * @throws {PermissionsError} If the given file is not executable.
 */
export function assertPathIsExecutable(path: any): asserts path is PathLike {
    assertPathIsFile(path);
    try {
        fs.accessSync(path, constants.X_OK);
    } catch {
        throw new PermissionsError(`File "${path}" is not executable!`);
    }
}
