import cliTable from 'cli-table3';
import color from '@colors/colors';

import { lsDirEx } from '../dir.js';
import { FileStat } from '../types.js';

export function formatTable(data: FileStat[]): string {
    const table = new cliTable({
        head: [
            color.green('Name'),
            color.green('Type'),
            color.green('Owner'),
            color.green('Group'),
            color.green('Size'),
        ],
        colWidths: [20, 25, 20, 20, 20],
    });

    for (const row of data) {
        const arr = [
            color.yellow(row.filename),
            color.yellow(row.filetype),
            color.yellow(row.userinfo?.username || ''),
            color.yellow(row.groupinfo?.name || ''),
            color.yellow(row.stat.size.toString()),
        ];
        //@ts-ignore
        table.push(arr);
    }

    return table.toString();
}

const data = await lsDirEx('.');
const out = formatTable(data);

console.log(out);
