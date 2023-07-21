const Users = require('../db/users.js')


module.exports = async function (ctx, bot) {
    const sender = await Users.findOne({
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (sender) return;
    const user = await bot.execute('users.get',{
        user_id :  ctx.message.from_id
    });
    await Users.create({
        vk_id: user[0].id,
        firstname: user[0].first_name,
        lastname: user[0].last_name,
        rate: 0,
        role: 1,
    })
    await ctx.reply(`${user[0].first_name} зарегистрирован`);
};