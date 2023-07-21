const Users = require('../db/users.js')
let config = require('../config.json');


module.exports = async function (ctx,bot) {
    const vk_id = ctx.message.text.match(/\d{4,}/);

    const user = await bot.execute('users.get',{
        user_id : vk_id,
        name_case: 'gen'
    });
    const user_rate = await Users.findOne({
        attributes: ['rate','role'],
        where : {
            vk_id
        }
    });

    await ctx.reply(`Рейтинг ${user[0].first_name} равен ${user_rate.dataValues.rate}, а роль ${config.role[user_rate.dataValues.role]}`);
};