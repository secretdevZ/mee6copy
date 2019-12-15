const { RichEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You do not have the required permission to use this command.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
 
    if (!args[0]) return msg.channel.send(`You forgot the role.`)

    if (!msg.guild.roles.find(r => r.name === args[0])) return msg.channel.send('I could not find that role.')

    if (!args[1]) return msg.channel.send('You forgot to specify a level for the role to be given at.')


    if (isNaN(args[1])) return msg.channel.send('Level argument has to be an `integer` (number)')

    let array = client.settings.get(msg.guild.id, "roles")
    let role = msg.guild.roles.find(r => r.name === args[0]).id || msg.mentions.roles.first().id
    let data = array.findIndex(obj => obj.level === parseInt(args[1]))
    let data2 = array.findIndex(obj => obj.role === msg.guild.roles.get(role).name)


    if (data2 > -1) return msg.channel.send('You have already enabled a role with that name to be assigned.')
    if (data > -1) return msg.channel.send('You have already added that role to be assigned at a level.')


    client.settings.push(msg.guild.id, {level: parseInt(args[1]), role: role }, "roles")
    msg.channel.send(`Successfully added ${msg.guild.roles.get(role)} to level ${args[1]} 👍`)

}

module.exports.help = {
    name:"addrole",
    usage:"!addrole <role> <level>"
  }