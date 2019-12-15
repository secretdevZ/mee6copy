const { RichEmbed } = require('discord.js')
exports.run = async (client, msg, args) => {
  
  
  
    /*
    
     
    
    
    
    
    
    
    
    
    
    
    */
              let array2 = []

     msg.channel.send('How many roles do you want to add? (20 MAX)')
     
         const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
               max: 1,
               time: 30000
           });
     
     if (!msgs.size) return msg.channel.send('Did not get a valid integer withing 30 seconds, cancelling.')
     
     if (msgs.first().content.includes('-')) return msg.channel.send('Input has to be an integer larger than 0.')
   
     if (isNaN(msgs.first().content)) return msg.channel.send('Input has to be an integer, cancelling.')
     
         if (msgs.first().content <= 0) return msg.channel.send('Input has to be an integer larger than 0.')
   
     let value = msgs.first().content
     
     while(value > 0) {
       
       msg.channel.send('Now give me the `ID` or `NAME` of the role you wish to add.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 30000);
    })
       
   
       
       const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
               max: 1,
               time: 30000
           });
       
       
           let roles = client.reactionroles.get(msg.guild.id, "roles")
           let role = msg.guild.roles.find(r => r.name === msgs.first().content) || msg.guild.roles.get(msgs.first().content)
           if (!role) return msg.channel.send('I could not find that role, cancelling progress.').then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000);
        })
           if (roles.includes(msgs.first().content)) return msg.channel.send('You already had that role added as a reaction role, remove it before adding it onto a new message.').then(m => {
            setTimeout(() => {
                m.delete()
            }, 5000);
        })
       
       if (!msgs.size) return msg.channel.send('Did not get a response within 30 seconds, cancelling.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
       
       msg.channel.send('Now give me the emoji `NAME` or `ID`').then(m => {
        setTimeout(() => {
            m.delete()
        }, 30000);
    })
       
       const msgs2 = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
               max: 1,
               time: 30000
           });
       
       if(!msgs2.size) return msg.channel.send('Did not get a response within 30 seconds, cancelling.').then(m => {
        setTimeout(() => {
            m.delete()
        }, 3000);
    })
       let emoji = client.emojis.get(msgs2.first().content) || client.emojis.find(e => e.name === msgs2.first().content)   
       if (!emoji) return msg.channel.send('Could not find emoji (has to be a custom emoji), cancelling.').then(m => {
           setTimeout(() => {
               m.delete()
           }, 3000);
       })
       
       client.reactionroles.push(msg.guild.id, { emoji: emoji.name, emojiid: emoji.id, role: msgs.first().content }, "roles")
       msg.channel.send('[REPEAT]').then(m => {
           setTimeout(() => {
               m.delete()
           }, 3000);
       })
       value--
       
                  array2.push({id: emoji.id, role: msgs.first().content, name: emoji.name})
                  

     }
     
  
     
     let array = client.reactionroles.get(msg.guild.id, "roles")
     let embed = new RichEmbed()
     .setAuthor('React to get the role!', msg.guild.iconURL)
     .setDescription(array2.map(i => `${client.emojis.get(i.id)} => ${msg.guild.roles.get(msg.guild.roles.find(r => r.name === i.role).id)}`))
     .setColor(0xFFC0CB)
     msg.channel.send(embed).then(m => {
       
       for (var i = 0; i < array.length; i++) {
         m.react(array2[i].id)
       }
       
                 array2.length = 0;

     })
     
     

     
     
   }
   
   module.exports.help = {
    name:"addreactionrole",
    usage:"!addreactionrole, then it will walk you through"
  }