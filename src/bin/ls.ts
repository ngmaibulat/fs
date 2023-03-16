import cliTable from 'cli-table3';
import color from '@colors/colors';

import { lsDirEx } from '../dir.js';
import { FileStat, DirContents } from '../types.js';

export function formatDate(d: Date) {
    const year = d.getFullYear();
    const month = d.getMonth().toString().padStart(2, '0');
    const day = d.getDay().toString().padStart(2, '0');
    const hour = d.getHours().toString().padStart(2, '0');
    const min = d.getMinutes().toString().padStart(2, '0');
    const sec = d.getSeconds().toString().padStart(2, '0');
    const msec = d.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hour}:${min}`;
}

export function formatTable(data: DirContents): string {
    //make footer
    const len = data.dirs.length + data.files.length;
    const footer = [
        { colSpan: 8, content: 'Total', hAlign: 'right' },
        { content: len.toString(), hAlign: 'right' },
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
            color.yellow(formatDate(row.stat.birthtime)), //created
            color.yellow(formatDate(row.stat.mtime)), //modified
            color.yellow(formatDate(row.stat.atime)), //accessed
            // color.yellow(permString), //mode
            { content: color.yellow(permString), hAlign: 'right' }, //mode
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
            { content: row.stat.size.toString(), hAlign: 'right' },
            color.yellow(formatDate(row.stat.birthtime)), //created
            color.yellow(formatDate(row.stat.mtime)), //modified
            color.yellow(formatDate(row.stat.atime)), //accessed
            { content: color.yellow(permString), hAlign: 'right' }, //mode
        ];
        //@ts-ignore
        table.push(arr);
    }

    table.push(footer);

    return table.toString();
}

const data = await lsDirEx('.');
const out = formatTable(data);

console.log(out);
