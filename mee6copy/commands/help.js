const { RichEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

  
  if (!args[0]) {
    let embed = new RichEmbed()
    .addField(`Misc 💫`, '`help`')
    .addField('User 👳', '`level`, `leaderboard`')
    .addField('Settings ' + client.emojis.get('632166977644920872'), '`set-levelchannel`, `set-levelmessage`, `addrole`, `resetall` `!set-xpgain`')
    .setColor("RANDOM")
    msg.channel.send(embed)
    return;
  }

  if (!client.commands.get(args[0])) return msg.channel.send('I could not find a command with that name.')
  
  let array = client.commands.map(x => x)

 let data = array.findIndex(obj => obj.help.name == args[0])

  let embed = new RichEmbed()
  .setTitle(`${args[0]}`)
  .setDescription(`Name: **${array[data].help.name}**\nUsage: **${array[data].help.usage}**`)
  .setColor("RANDOM")
  msg.channel.send(embed)



}

module.exports.help = {
    name:"help",
    usage: "!help || !help <command>",
    group: "misc"
}