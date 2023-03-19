import cliTable from 'cli-table3';
import color from '@colors/colors';
export function helpChmod() {
    const table = new cliTable({
        head: [color.green('String'), color.green('Binary'), color.green('Decimal')],
        colWidths: [20, 20, 20],
    });
    table.push(['rwx', '111', '7']);
    table.push(['rw-', '110', '6']);
    table.push(['r-x', '101', '5']);
    table.push(['r--', '100', '4']);
    table.push(['-wx', '011', '3']);
    table.push(['-w-', '010', '2']);
    table.push(['--x', '--1', '1']);
    table.push(['---', '000', '0']);
    return table.toString();
}
const msg = helpChmod();
console.log(msg);
