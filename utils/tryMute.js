const Users = require('../db/users.js')


module.exports = async function (ctx,bot) {
    const sender = await Users.findOne({
        attribute: 'mute',
        where : {
            vk_id : ctx.message.from_id
        }
    });
    if (sender.dataValues.mute === false){
        return true
    }
    await bot.execute('messages.delete',{
        peer_id : ctx.message.peer_id,
        cmids: ctx.message.conversation_message_id,
        delete_for_all: true
    });


};