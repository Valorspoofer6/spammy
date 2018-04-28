const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const images = JSON.parse(fs.readFileSync("./pokemonrefs.json", "utf8"));

var interval = 5000;
var spamid = [];
var infoid = [];

/*function step() {
    var index;
    for (index = 0; index < spamid.length; ++index) {
        client.channels.get(spamid[index]).send('spamming here');
    }
};*/

client.on('ready', () => {
    console.log('I am ready!');
    //setTimeout(step, interval);
});

client.on('message', message => {
    
    if (message.content === '$ping') {
    	message.reply('pong');
    }
    
    if (message.content === '$spam-92') { 
        if (spamid.indexOf(message.channel.id) < 0) {
            spamid.push(message.channel.id);
        }
        message.channel.send('spam enabled');
        
        setInterval(function() {
            var index;
            for (index = 0; index < spamid.length; ++index) {
                client.channels.get(spamid[index]).send('spamming here');
            }            
        }, 5000);
    }
    
    if (message.content === '$stop-92') {
        var index = spamid.indexOf(message.channel.id);
        if (index > -1) {
          spamid.splice(index, 1);
        }
        message.channel.send('spam disabled');
        
        if (spamid.length < 1) {
            clearInterval(interval);
        } else {
            setInterval(function() {
                var index;
                for (index = 0; index < spamid.length; ++index) {
                    client.channels.get(spamid[index]).send('spamming here');
                }            
            }, 5000);
        }
    }
    
    if (message.content === '$spamchannels-92') { 
        message.channel.send('spam channels: ' + spamid.join(' '));
    }

    if (message.content === '$info-92') {
        var index = infoid.indexOf(message.channel.id);
        if (index > -1) {
            infoid.splice(index, 1);
            message.channel.send('spawns info disabled');
        } else {
            infoid.push(message.channel.id);
            message.channel.send('spawns info enabled');
        }
    }

    if (message.content === '$infochannels-92') { 
        message.channel.send('spawns info channels: ' + infoid.join(' '));
    }

    if (infoid.indexOf(message.channel.id) > -1) {
        if (message.embeds.length > 0) {
            emb = message.embeds[0];
            if (emb.title.startsWith('A wild')) {
                //message.channel.send(emb.image.url);
                name = emb.image.url.split('/').pop(-1).split('.')[0];
                //message.channel.send(images[name]);
                realname = images[name];
                if (realname.length >0)
                    message.channel.send('A wild ' + realname + ' has appeared');
            }
        }
    }
    
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
