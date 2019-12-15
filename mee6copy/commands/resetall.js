
let { RichEmbed } = require('discord.js')
exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })

   let toreset = client.profile.filter(p => p.guild === msg.guild.id).array()

   toreset.forEach(data => {
       client.profile.delete(`${msg.guild.id}-${data.id}`)
   })

   msg.channel.send(`I've successfully reset ${toreset.length} user(s).`);


}

module.exports.help = {
    name:"resetall",
    usage: "!resetall"
  }