import fs from 'node:fs/promises';
export async function readFile(src) {
    const res = await fs.readFile(src);
    return res;
}
export async function readFileAsString(src) {
    const res = await fs.readFile(src, 'utf8');
    return res;
}
