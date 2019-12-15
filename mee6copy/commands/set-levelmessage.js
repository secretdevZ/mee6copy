const { RichEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) return msg.channel.send('Please specify what message should be sent when somebody levels up, you can use {level} and the level will show, {user} and the user will be tagged.')

    let text = args.join(' ')

    if (text.length > 1800) return msg.channel.send('Sorry, the message can not be longer than 1800 characters.')

    client.settings.set(msg.guild.id, text, "message")
    msg.channel.send('Level Message was updated! 👍')

}

module.exports.help = {
    name:"set-levelmessage",
    usage: "!set-levelmessage <message> (max 1800 characters)"
  }