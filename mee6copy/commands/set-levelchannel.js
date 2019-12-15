const { RichEmbed } = require('discord.js')

exports.run = (client, msg, args) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
    if (!args[0]) return msg.channel.send('You forgot to give me the name of a channel.')
    let channel = msg.guild.channels.find(c => c.name === args[0]) || msg.mentions.channels.first()
    if (!channel) return msg.channel.send('I could not find a channel with the name of `' + args[0] + '`')

    client.settings.set(msg.guild.id, channel.id, "channel")
    msg.channel.send('Successfully updated level ups to be sent in ' + channel + ' 👍')

}

module.exports.help = {
    name:"set-levelchannel",
    usage: "!set-levelchannel <channel> || !set-levelchannel #channel"
  }