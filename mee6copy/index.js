const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
let cooldown = new Set()
let prefix = '!'
const Enmap = require('enmap')
client.commands = new Discord.Collection()
client.profile = new Enmap({name:"profile", fetchAll: true,})
client.settings = new Enmap({name:"settings", fetchAll: true,})
client.reactionroles = new Enmap({name:"reactionroles", fetchAll: true,})

fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err)
  let jsfiles = files.filter(f => f.split(".").pop() === "js")

  if (jsfiles.length <= 0) {
    console.log("There are no commands to load...")
    return;
  }

  console.log(`Loading ${jsfiles.length} Commands`)
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} Loaded!`)
    client.commands.set(props.help.name, props)
        
  })
})

client.on('message', (msg) => {

  if (msg.author.bot) return;
  if (msg.author.id === client.user.id) return;

  client.reactionroles.ensure(msg.guild.id, {
    roles: [],
  })
     client.profile.ensure(`${msg.guild.id}-${msg.author.id}`, {
        id: msg.author.id,
        guild: msg.guild.id,
        level: 0,
        levelpoints: 0
    })

    client.settings.ensure(msg.guild.id, {
      roles: [],
      message: 'Not set',
      channel: 0,
      xpgain: [ { first: 0, second: 30 }],
      noxproles: [],
      noxpchannels: [],
    })


    let points = Math.floor(Math.random(client.settings.get(msg.guild.id, "xpgain")[0].first) * client.settings.get(msg.guild.id, "xpgain")[0].second)
    let randomcooldown = Math.floor(Math.random(5000) * 8000)
      if (cooldown.has(`${msg.author.id}-${msg.guild.id}`)) {
          points = 0;
      }
  

      let array3 = client.settings.get(msg.guild.id, "noxpchannels")

      if (array3.length) {
        array3.forEach(c => {
          
          if (c == msg.channel.id) {
            console.log('points was set to 0')
            points = 0;
          }

        })
      }

      let array2 = client.settings.get(msg.guild.id, "noxproles")
      if (array2.length) {
             array2.forEach(r => {
                let member = msg.guild.member(msg.author)
  
                console.log('hey')
                let roletofind = msg.guild.roles.find(n => n.name === r)
                if(member.roles.has(roletofind.id)) {
                  points = 0;
                  console.log('true')
                }
          
             })
            }

            client.profile.math(`${msg.guild.id}-${msg.author.id}`, '+', points, "levelpoints")
            cooldown.add(`${msg.author.id}-${msg.guild.id}`);

    //  client.profile.inc(`${message.guild.id}-${message.author.id}`, "levelpoints")
  
      setTimeout(() => {
          cooldown.delete(`${msg.author.id}-${msg.guild.id}`)
      }, randomcooldown);
    
    
       const curLevel = Math.floor(0.1 * Math.sqrt(client.profile.get(`${msg.guild.id}-${msg.author.id}`, "levelpoints")) + 1);
     
const { RichEmbed } = require('discord.js')
        if (client.profile.get(`${msg.guild.id}-${msg.author.id}`, "level") < curLevel) {
  
          let message = client.settings.get(msg.guild.id, "message")
          let channel = client.settings.get(msg.guild.id, "channel")

          if (!channel) channel = msg.channel.id
          if (message == "Not set") message = `{user} has leveled up to level **{level}**! `
          client.channels.get(channel).send(message.replace('{user}', msg.author).replace('{level}', curLevel))



          client.profile.set(`${msg.guild.id}-${msg.author.id}`, curLevel, "level");
    
          let array = client.settings.get(msg.guild.id, "roles")
          
          let data = array.findIndex(obj => obj.level === curLevel)
          if (data < 0) return;

          
          msg.guild.member(msg.author).addRole(array[data].role)
          msg.channel.send('You leveled up to level **' + curLevel + '** and was rewarded with the role ' + msg.guild.roles.get(array[data].role) + ' 👍').then(m => {
            setTimeout(() => {
              m.delete()
            }, 5000);
          })
    }


    if (msg.content.indexOf(prefix) !== 0) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command)



    if (!cmd) return;
    cmd.run(client, msg, args);
})

client.on('guildCreate', (guild, member) => {

  client.settings.ensure(guild.id, {
    roles: [],
    message: 'Not set',
    channel: 0,
    xpgain: [ { first: 0, second: 30 }],
    noxproles: [],
  })

  

})



  client.login("NjMxMzc4MDc4ODIzNjEyNDMz.Xacg-w.3f8vz1d_TFKCW3b3ro72kdrqyt8")

