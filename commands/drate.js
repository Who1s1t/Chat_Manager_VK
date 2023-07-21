const Users = require('../db/users.js')
const config = require("../config.json");


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);
    const d_rate = ctx.message.text.match(/\d+/);
    const sender = await Users.findOne({
        attribute: 'role',
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (config.commandAccess[sender.dataValues.role].drate !== "yes") {
        await ctx.reply("Отказано в доступе");
        return
    }
    const user = await bot.execute('users.get',{
        user_id : vk_id,
        name_case: 'gen'
    });
    const user_rate = await Users.findOne({
        attribute: 'rate',
        where : {
            vk_id
        }
    });
    if (sender.dataValues.role>=user_rate.dataValues.role) {
        await ctx.reply("Роль человека выше или ровна вашей!");
        return
    }
    await user_rate.decrement('rate',{by: +d_rate});

    await ctx.reply(`Рейтинг ${user[0].first_name} теперь равен ${user_rate.dataValues.rate}`);
};