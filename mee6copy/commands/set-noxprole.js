

let { RichEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

  

  if (!args[0]) return msg.channel.send(`You forgot the role name.`)

  let array = client.settings.get(msg.guild.id, "noxproles")
  if (array.includes(args[0])) {
    client.settings.remove(msg.guild.id, args[0], "noxproles")
    msg.channel.send('You had already added that, so I removed it from the list.')
    return;
  }
  
  if (!msg.guild.roles.find(r => r.name === args[0])) return msg.channel.send(`I could not find a role with that kind of name, remember it has to be capital letters if it is.`)

  let role = msg.guild.roles.find(r => r.name === args[0]).id || msg.mentions.roles.first().id 

    

  client.settings.push(msg.guild.id, args[0], "noxproles")
  msg.channel.send(`users with the role ${msg.guild.roles.get(role)} will not gain xp anymore.`)
   

}

module.exports.help = {
    name:"set-noxprole",
    usage: "!set-noxprole"
  }