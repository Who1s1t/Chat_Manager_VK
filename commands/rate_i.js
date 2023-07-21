const Users = require('../db/users.js')
let config = require('../config.json');


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);

    const user = await bot.execute('users.get',{
        user_id : vk_id
    });
    const user_rate = await Users.findOne({
        attributes: ['rate','role'],
        where : {
            vk_id
        }
    });

    await ctx.reply(`Это [id${user[0].id}|${user[0].first_name}] \nРоль: ${config.role[user_rate.dataValues.role]} \nРейтинг: ${user_rate.dataValues.rate}/100 `);
};