#!/usr/bin/env node
import { Command } from 'commander';
import { actionHelpChmod } from './actions/help-chmod.js';
const program = new Command();
const name = 'jls';
const description = 'Extended ls command';
const version = '0.0.2';
program.name(name).description(description).version(version);
program
    .command('help-chmod')
    .description('Show help on rwx')
    .option('--format', 'Format', 'cli')
    .action(actionHelpChmod);
program.parse();
