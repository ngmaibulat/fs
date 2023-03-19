/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import { PathLike } from 'node:fs';
export declare function readFile(src: PathLike): Promise<Buffer>;
export declare function readFileAsString(src: PathLike): Promise<string>;
