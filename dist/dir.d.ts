/// <reference types="node" resolution-mode="require"/>
import { DirContents } from './types.js';
import { PathLike } from 'node:fs';
declare function isDir(dirname: string): Promise<boolean>;
declare function lsDir(dirname: string, filesOnly?: boolean): Promise<string[]>;
export declare function stat(path: PathLike): Promise<false | import("fs").Stats>;
declare function lsDirEx(dirname: string, filesOnly?: boolean): Promise<DirContents>;
declare function countDir(dirname: string, filesOnly?: boolean): Promise<number>;
export { isDir, lsDir, lsDirEx, countDir };
