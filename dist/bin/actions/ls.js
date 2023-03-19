import cliTable from 'cli-table3';
import color from '@colors/colors';
import { isDir } from '../../dir.js';
import { lsDirEx } from '../../dir.js';
import { formatDate } from '../date.js';
export function formatTable(data) {
    const alignRight = 'right';
    const alignLeft = 'left';
    //make footer
    const len = data.dirs.length + data.files.length;
    const footer = [
        { colSpan: 8, content: 'Total', hAlign: alignRight },
        { content: len.toString(), hAlign: alignRight },
    ];
    const table = new cliTable({
        head: [
            // { content: 'foo', hAlign: 'center' },
            color.green('Name'),
            color.green('Type'),
            color.green('Owner'),
            color.green('Group'),
            color.green('Size'),
            color.green('Created'),
            color.green('Modified'),
            color.green('Accessed'),
            color.green('Mode'),
        ],
        colWidths: [20, 18, 15, 10, 10, 18, 18, 18, 8],
    });
    for (const row of data.dirs) {
        const permString = '0' + (row.stat.mode & 0o777).toString(8);
        const arr = [
            color.blue(row.filename),
            '<dir>',
            color.yellow(row.userinfo?.username || ''),
            color.yellow(row.groupinfo?.name || ''),
            '',
            color.yellow(formatDate(row.stat.birthtime)),
            color.yellow(formatDate(row.stat.mtime)),
            color.yellow(formatDate(row.stat.atime)),
            // color.yellow(permString), //mode
            { content: color.yellow(permString), hAlign: alignRight }, //mode
        ];
        //@ts-ignore
        table.push(arr);
    }
    for (const row of data.files) {
        const permString = '0' + (row.stat.mode & 0o777).toString(8);
        const arr = [
            color.yellow(row.filename),
            color.yellow(row.filetype || ''),
            color.yellow(row.userinfo?.username || ''),
            color.yellow(row.groupinfo?.name || ''),
            // color.yellow(row.stat.size.toString()),
            { content: row.stat.size.toString(), hAlign: alignRight },
            color.yellow(formatDate(row.stat.birthtime)),
            color.yellow(formatDate(row.stat.mtime)),
            color.yellow(formatDate(row.stat.atime)),
            { content: color.yellow(permString), hAlign: alignRight }, //mode
        ];
        //@ts-ignore
        table.push(arr);
    }
    table.push(footer);
    return table.toString();
}
export async function actionLs(options) {
    let dirname = '.';
    if (options.dir) {
        const found = await isDir(options.dir);
        if (!found) {
            console.error('Directory not found: ', options.dir);
            process.exit(1);
        }
        dirname = options.dir;
    }
    const data = await lsDirEx(dirname);
    const out = formatTable(data);
    console.log(out);
}
