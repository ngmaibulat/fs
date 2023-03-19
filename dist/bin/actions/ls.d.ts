import { DirContents } from '../../types.js';
import { LsOptions } from '../types.js';
export declare function formatTable(data: DirContents): string;
export declare function actionLs(options: LsOptions): Promise<void>;
