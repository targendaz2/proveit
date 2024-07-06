import crypto from 'node:crypto';
import path from 'node:path';
import { beforeAll, describe, expect, test } from '@jest/globals';
import { FileSystemError, PermissionsError, ValueError } from 'error-wave';
import {
    assertIsPathLike,
    assertPathExists,
    assertPathIsDirectory,
    assertPathIsExecutable,
    assertPathIsFile,
} from '../src/assertions.js';
import { createTmpDir, createTmpFile } from './fixtures.js';

let tmpDir: string;
let tmpFile: string;
let nonExistentPath: string;
let executableFile: string;
let notExecutableFile: string;

beforeAll(() => {
    tmpDir = createTmpDir();
    tmpFile = createTmpFile();
    nonExistentPath = path.resolve('/tmp', crypto.randomUUID());

    executableFile = createTmpFile({
        content: 'console.log("Hello, world!");',
        mode: 0o766,
    });

    notExecutableFile = createTmpFile({
        content: 'console.log("Hello, world!"',
        mode: 0o655,
    });
});

describe('PathLike assertion tests', () => {
    test('passes when given a string', () => {
        const stringPath = 'this is a string';
        expect(() => assertIsPathLike(stringPath)).not.toThrowError();
    });

    test('passes when given a Buffer', () => {
        const bufferPath = Buffer.from('this is a Buffer');
        expect(() => assertIsPathLike(bufferPath)).not.toThrowError();
    });

    test('passes when given a URL', () => {
        const url = new URL('https://example.com');
        expect(() => assertIsPathLike(url)).not.toThrowError();
    });

    test('fails when given a non-PathLike value', () => {
        const nonPathLike = 17;
        expect(() => assertIsPathLike(nonPathLike)).toThrowError(TypeError);
    });

    test('fails when given an empty string', () => {
        const emptyPath = '';
        expect(() => assertIsPathLike(emptyPath)).toThrowError(ValueError);
    });
});

describe('path exists assertion tests', () => {
    test('passes when given an existing file', () => {
        expect(() => assertPathExists(tmpFile)).not.toThrowError();
    });

    test('passes when given an existing directory', () => {
        expect(() => assertPathExists(tmpDir)).not.toThrowError();
    });

    test('fails when given a non-existent path', () => {
        expect(() => assertPathExists(nonExistentPath)).toThrowError(
            FileSystemError,
        );
    });
});

describe('file assertion tests', () => {
    test('passes when given an existing file', () => {
        expect(() => assertPathIsFile(tmpFile)).not.toThrowError();
    });

    test('fails when given an existing directory', () => {
        expect(() => assertPathIsFile(tmpDir)).toThrowError(FileSystemError);
    });
});

describe('directory assertion tests', () => {
    test('passes when given an existing directory', () => {
        expect(() => assertPathIsDirectory(tmpDir)).not.toThrowError();
    });

    test('fails when given an existing file', () => {
        expect(() => assertPathIsDirectory(tmpFile)).toThrowError(
            FileSystemError,
        );
    });
});

describe('executable assertion tests', () => {
    test('passes when given an executable file', () => {
        expect(() => assertPathIsExecutable(executableFile)).not.toThrowError();
    });

    test('fails when given a not executable file', () => {
        expect(() => assertPathIsExecutable(notExecutableFile)).toThrowError(
            PermissionsError,
        );
    });
});
