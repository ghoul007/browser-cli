#!/usr/bin/env node

const puppeteer = require('puppeteer');
const { success, debug, complete, pending } = require('signale');
const ms = require('ms');
const { program } = require('commander');
const {cmd} =  require("./cmd");


const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));
const init = async () => {
    try {

        let cmdList;

        program
            .option('-l, --list <type>', 'the command list ( separate with comma )')
            // .option('-f, --file <type>', 'the file contains command list')
            .parse(process.argv)
        if (program.list) {
            cmdList = program.list.split(',').map(e => e.trim());
        } else {
            throw new Error('missing flag list "--list"');
        }

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        for await (const c of cmdList) {
            await cmd(page, c)
        }

        success('done')
        await browser.close();

    } catch (error) {
        console.log(error)
    }
}





init();