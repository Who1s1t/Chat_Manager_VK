const Users = require('../db/users.js')
const config = require("../config.json");


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);
    const sender = await Users.findOne({
        attribute: 'role',
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (config.commandAccess[sender.dataValues.role].dmute !== "yes") {
        await ctx.reply("Отказано в доступе");
        return
    }
    const user = await bot.execute('users.get',{
        user_id : vk_id,
        name_case: 'dat'
    });
    const user_mute = await Users.findOne({
        where : {
            vk_id
        }
    });
    if (sender.dataValues.role<=user_mute.dataValues.role) {
        await ctx.reply("Роль человека выше или ровна вашей!");
        return
    }
    user_mute.update({
        mute : false
    });

    await ctx.reply(`Теперь ${user[0].first_name} разрешено отправлять сообщения`);
};