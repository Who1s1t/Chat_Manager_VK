const Users = require('../db/users.js')


module.exports = async function (ctx, bot) {
    const vk_id = (ctx.message.action && ctx.message.action.type === 'chat_invite_user') ? ctx.message.action.member_id : ctx.message.from_id;
    const user = await Users.findOne({
        where : {
            vk_id
        }
    });

    if (user) return;

    const user_vk = await bot.execute('users.get',{
        user_id :  vk_id
    });

    await Users.create({
        vk_id: user_vk[0].id,
        firstname: user_vk[0].first_name,
        lastname: user_vk[0].last_name,
        rate: 0,
        role: 0,
    })

    await ctx.reply(`${user_vk[0].first_name} зарегистрирован`);
};