import fs from 'node:fs/promises';
import path from 'node:path';

import posix from 'posix';
import isFile from '@aibulat/isfile';
import { passwdUser } from 'passwd-user';

import { getFileType } from './fileType.js';
import { FileStat } from './types.js';

async function isDir(dirname: string): Promise<boolean> {
    if (!dirname) {
        throw new Error('Invalid Argument');
    }

    try {
        const stats = await fs.stat(dirname);
        return stats.isDirectory();
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}

async function lsDir(dirname: string, filesOnly: boolean = false): Promise<string[]> {
    const found = await isDir(dirname);

    if (!found) {
        throw new Error(`Directory not found: ${dirname}`);
    }

    const files = await fs.readdir(dirname);

    if (filesOnly) {
        const res = [];

        for (const item of files) {
            const rpath = path.resolve(dirname, item);
            const checked = await isFile(rpath);
            if (checked) {
                res.push(rpath);
            }
        }

        return res;
    }

    return files;
}

async function lsDirEx(dirname: string, filesOnly: boolean = false): Promise<FileStat[]> {
    const files = await lsDir(dirname, filesOnly);
    const res: FileStat[] = [];

    for (const file of files) {
        const st = await fs.stat(file);
        const userinfo = await passwdUser(st.uid);
        const filetype = getFileType(file);

        const groupinfo = posix.getgrnam(st.gid);

        res.push({
            filename: file,
            stat: st,
            filetype,
            userinfo,
            groupinfo,
        });
    }

    return res;
}

async function countDir(dirname: string, filesOnly: boolean = false): Promise<number> {
    const found = await isDir(dirname);

    if (!found) {
        throw new Error(`Directory not found: ${dirname}`);
    }

    const elems = await lsDir(dirname, filesOnly);

    return elems.length;
}

export { isDir, lsDir, lsDirEx, countDir };
