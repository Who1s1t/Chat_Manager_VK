const Users = require('../db/users.js')
const config = require("../config.json");


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);
    const add_rate = ctx.message.text.match(/\d+/);

    if (add_rate[0].length > 2) {
        await ctx.reply("Неверный параметр")
        return
    }


    const sender = await Users.findOne({
        attribute: 'role',
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (config.commandAccess[sender.dataValues.role].rate !== "yes") {
    await ctx.reply("Отказано в доступе");
    return
    }
    const user = await bot.execute('users.get',{
        user_id : vk_id,
        name_case: 'gen'
    });
    const user_rate = await Users.findOne({
        where : {
            vk_id
        }
    });
    if (sender.dataValues.role<=user_rate.dataValues.role) {
        await ctx.reply("Роль человека выше или равна вашей!");
        return
    }

    await user_rate.increment('rate',{by: +add_rate});
    while (user_rate.dataValues.rate >= config.roleToRate[user_rate.dataValues.role + 1]){
        await user_rate.update({
            role: user_rate.dataValues.role + 1
        });
    }


    await ctx.reply(`Это [id${user[0].id}|${user[0].first_name}] \nРоль: ${config.role[user_rate.dataValues.role]} \nРейтинг: ${user_rate.dataValues.rate}/100 `);
};