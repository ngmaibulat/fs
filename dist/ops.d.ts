/// <reference types="node" resolution-mode="require"/>
import { PathLike } from 'node:fs';
export declare function moveFile(src: PathLike, dst: PathLike): Promise<boolean>;
