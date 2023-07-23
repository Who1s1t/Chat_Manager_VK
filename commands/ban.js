const Users = require("../db/users");
const config = require("../config.json");


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);
    const sender = await Users.findOne({
        attribute: 'role',
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (config.commandAccess[sender.dataValues.role].mute !== "yes") {
        await ctx.reply("Отказано в доступе");
        return
    }
    const user = await bot.execute('users.get',{
        user_id : vk_id,
        name_case: 'dat'
    });
    const user_ban = await Users.findOne({
        where : {
            vk_id
        }
    });
    if (sender.dataValues.role<=user_ban.dataValues.role) {
        await ctx.reply("Роль человека выше или равна вашей!");
        return
    }
    await bot.execute('messages.removeChatUser',{
        user_id : vk_id,
        chat_id: String(ctx.message.peer_id).slice(-1)
    });

};