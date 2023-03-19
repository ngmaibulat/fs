import fs from 'node:fs/promises';
import path from 'node:path';
import posix from 'posix';
import isFile from '@aibulat/isfile';
import { passwdUser } from 'passwd-user';
import { getFileType } from './fileType.js';
async function isDir(dirname) {
    if (!dirname) {
        throw new Error('Invalid Argument');
    }
    try {
        const stats = await fs.stat(dirname);
        return stats.isDirectory();
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}
async function lsDir(dirname, filesOnly = false) {
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
async function lsDirWithDetails(dirname, filesOnly = false) {
    const found = await isDir(dirname);
    if (!found) {
        throw new Error(`Directory not found: ${dirname}`);
    }
    const files = await fs.readdir(dirname, { withFileTypes: true });
    if (filesOnly) {
        const res = [];
        for (const item of files) {
            const rpath = path.resolve(dirname, item.name);
            if (item.isFile()) {
                res.push(item);
            }
        }
        return res;
    }
    return files;
}
export async function stat(path) {
    try {
        return await fs.stat(path);
    }
    catch (err) {
        return false;
    }
}
async function lsDirEx(dirname, filesOnly = false) {
    const entries = await lsDirWithDetails(dirname, filesOnly);
    const files = [];
    const dirs = [];
    // console.log(entries);
    // process.exit(1);
    for (const file of entries) {
        const rpath = path.resolve(dirname, file.name);
        const st = await stat(rpath);
        if (!st) {
            continue;
        }
        const userinfo = await passwdUser(st.uid);
        const groupinfo = posix.getgrnam(st.gid);
        if (file.isDirectory()) {
            dirs.push({
                filename: file.name,
                stat: st,
                userinfo,
                groupinfo,
            });
        }
        //Not a Directory
        else {
            const filetype = getFileType(rpath);
            files.push({
                filename: file.name,
                stat: st,
                filetype,
                userinfo,
                groupinfo,
            });
        }
    }
    return { dirs, files };
}
async function countDir(dirname, filesOnly = false) {
    const found = await isDir(dirname);
    if (!found) {
        throw new Error(`Directory not found: ${dirname}`);
    }
    const elems = await lsDir(dirname, filesOnly);
    return elems.length;
}
export { isDir, lsDir, lsDirEx, countDir };
