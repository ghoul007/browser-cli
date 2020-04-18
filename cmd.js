const { success, debug, complete, pending } = require('signale');
const ms = require('ms');
const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

module.exports.cmd = async (page, command) => {

    const [action, ele1, ele2] = command.split(/\s/);

    switch (action) {
        case 'wait':
            pending('...')
            await wait(ms(ele1.trim()))
            break;

        case 'goto':
            success('go to page');
            await page.goto(ele1)
            break;

        case 'type':
            success('go to page');
            await page.type(ele1, ele2)
            break;
        case 'click':
            success('click ' + ele1);
            await page.click(ele1);
            break;
        case 'keypress':
            success('press ' + ele1);
            await page.keyboard.press[ele1.trim()];
            break;
        default:
            break;
    }
    return page

}