import fs from 'node:fs/promises';
export async function moveFile(src, dst) {
    try {
        await fs.rename(src, dst);
        return true;
    }
    catch (err) {
        return false;
    }
}
