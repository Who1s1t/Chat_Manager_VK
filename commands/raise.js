const Users = require('../db/users.js')
const config = require("../config.json");


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);
    const new_raise = ctx.message.text.match(/\d+/);
    if (new_raise[0] < 0 || new_raise[0] > 6 || new_raise[0].length !== 1){
        await ctx.reply("Неверный параметр")
        return
    }
    const sender = await Users.findOne({
        attribute: 'role',
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (config.commandAccess[sender.dataValues.role].raise !== "yes") {
        await ctx.reply("Отказано в доступе");
        return
    }
    const user = await bot.execute('users.get',{
        user_id : vk_id,
    });
    const user_raise = await Users.findOne({
        attribute: 'role',
        where : {
            vk_id
        }
    });
    if (sender.dataValues.role<=user_raise.dataValues.role) {
        await ctx.reply("Роль человека выше или равна вашей!");
        return
    }

    user_raise.update({
        role : new_raise,
        rate : config.roleToRate[new_raise]
    })

    await ctx.reply(`Это [id${user[0].id}|${user[0].first_name}] \nРоль: ${config.role[user_raise.dataValues.role]} \nРейтинг: ${user_raise.dataValues.rate}/100 `);
};