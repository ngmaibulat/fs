import { Writable } from 'node:stream';
class ngmWritableStream extends Writable {
    data;
    constructor() {
        super();
        this.data = '';
    }
    //@ts-ignore
    write(chunk, encoding, callback) {
        this.data = this.data || '';
        this.data += chunk.toString();
        callback();
    }
    getData() {
        return this.data;
    }
}
// export async function hashFile(
//     filePath: string,
//     algo: string = 'sha256',
//     format: BufferEncoding = 'hex'
// ) {
//     const hash = createHash(algo)
//     const input = createReadStream(filePath)
//     const out = new ngmWritableStream()
//     const res = input.pipe(hash).setEncoding(format).pipe(ngmWritableStream)
//     return res
// }
