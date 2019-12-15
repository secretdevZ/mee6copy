const { RichEmbed } = require('discord.js')

exports.run = (client, msg, args) => {

    const xpForLevel = level => Math.ceil(level*level*100);
    const calcLevel = xp => Math.floor(0.1*Math.sqrt(xp));
    // So if you have 523 xp/points, you are level:
    const curLevel = calcLevel(client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")) // 2
    // Points needed for currentLevel + 1;
    const pointsNeeded = xpForLevel(curLevel + 1);
    // So how many points are left?
    let embed = new RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Level: **` + client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") + '**' + '\n' + `XP: ${client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")}/${pointsNeeded} (${pointsNeeded - client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")} needed)`)
    
    msg.channel.send(embed)

}

module.exports.help = {
    name:"level",
    usage: "!level"
  }