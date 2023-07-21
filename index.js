const VkBot = require('node-vk-bot-api');
const commands = require('./commands')
const utils = require('./utils')
require('dotenv').config()
const bot = new VkBot({
    token: process.env.TOKEN,

    group_id: process.env.GROUP_ID,

});
bot.use(async (ctx, next) => {
    try {
        await commands.reg(ctx,bot)
        const is_not_mute = await utils.tryMute(ctx,bot)
        if (!is_not_mute){
            return
        }
        await next();
    } catch (e) {
        console.error(e);
        await ctx.reply("Неправильная команда!")
    }
});

bot.command('!rate i',  async (ctx) => {
    await commands.rate_i(ctx,bot)
});
bot.command('!rate',  async (ctx) => {
    await commands.rate(ctx,bot)
});
bot.command('!drate',  async (ctx) => {
    await commands.drate(ctx,bot)
});
bot.command('!raise',  async (ctx) => {
    await commands.raise(ctx,bot)
});
bot.command('!mute',  async (ctx) => {
    await commands.mute(ctx,bot)
});
bot.command('!dmute',  async (ctx) => {
    await commands.dmute(ctx,bot)
});

(async () => {
    const longPollParams = await bot.getLongPollParams();
    console.log(longPollParams)
    bot.startPolling((err) => {
        if (err) {
            console.error(err);
        }

    },longPollParams['ts']);
})()