

let { RichEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

  

  if (!args[0]) return msg.channel.send(`You forgot the channel.`)

  let channel = msg.guild.channels.find(c => c.name === args[0]) || msg.mentions.channels.first()

  if (!channel) return msg.channel.send('I could not find that channel!')

  let array = client.settings.get(msg.guild.id, "noxpchannels")
  if (array.includes(channel.id)) {
    client.settings.remove(msg.guild.id, channel.id, "noxpchannels")
    msg.channel.send('You already had that channel disabled to get xp in, I removed it from the list. You will now get xp again.')
    return;
  }



 client.settings.push(msg.guild.id, channel.id, "noxpchannels")
 msg.channel.send(`XP will not be gained in ${channel} anymore.`)
   

  


}

module.exports.help = {
    name:"set-noxpchannel",
    usage: "!set-noxpchannel <channel> | !set-noxpchannel #channel"
  }