import { DirContents } from '../../index.js';
import { LsOptions, HashResults } from '../types.js';
export declare function formatTable(data: HashResults[]): string;
export declare function calcHashes(dirname: string, data: DirContents): Promise<HashResults[]>;
export declare function actionHash(options: LsOptions): Promise<void>;
