const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const images = JSON.parse(fs.readFileSync("./pokemonrefs.json", "utf8"));

var interval;
var spamid = [];
var infoid = [];
var aliveid = [];
var curr = 0;
var testchannel = "436971996736258049";
var count = 0;
var acurr = 0;


/*function step() {
    if (spamid.length > 0) {
        if (curr >= spamid.lenght) {
            curr = 0;
        }
        client.channels.get(spamid[curr]).send('spamming here');
        curr = curr + 1;
    }
};*/

client.on('ready', () => {
    console.log('I am ready!');
    //timer = setTimeout(step, interval);
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
        
        clearInterval(interval);
        if (spamid.length > 0) {
            interval = setInterval(function() {
                if (spamid[curr] === undefined)
                    curr = 0;
                count++;
                if (count > 90 && aliveid.length > 0) {
                    if (aliveid[acurr] === undefined) {
                        acurr = 0;
                        count = 0;   
                    }
                    client.channels.get(aliveid[acurr]).send('p!ping');
                    acurr++;
                }
                else {
                    client.channels.get(spamid[curr]).send('spamming here');
                    curr++;
                }
            }, 2000);
        }
    }
    
    if (message.content === '$stop-92') {
        var index = spamid.indexOf(message.channel.id);
        if (index > -1) {
          spamid.splice(index, 1);
        }
        message.channel.send('spam disabled');
        
        clearInterval(interval);
        if (spamid.length > 0) {
            interval = setInterval(function() {
                if (spamid[curr] === undefined)
                    curr = 0;
                count++;
                if (count > 90 && aliveid.length > 0) {
                    if (aliveid[acurr] === undefined) {
                        acurr = 0;
                        count = 0;   
                    }
                    client.channels.get(aliveid[acurr]).send('p!ping');
                    acurr++;
                }
                else {
                    client.channels.get(spamid[curr]).send('spamming here');
                    curr++;
                }
            }, 2000);
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

    if (message.content === '$alive-92') {
        var index = aliveid.indexOf(message.channel.id);
        if (index > -1) {
            aliveid.splice(index, 1);
            message.channel.send('keep alive disabled');
        } else {
            aliveid.push(message.channel.id);
            message.channel.send('keep alive enabled');
        }
    }

    if (message.content === '$alivechannels-92') { 
        message.channel.send('keep alive channels: ' + aliveid.join(' '));
    }

    if (infoid.indexOf(message.channel.id) > -1) {
        if (message.embeds.length > 0) {
            emb = message.embeds[0];
            if (emb.title.startsWith('A wild')) {
                //message.channel.send('Att size: ' + emb.files[0].size);
                //if (message.attachments.length > 0)
                //    message.channel.send('Message got attachment');
                //name = emb.image.url;
                //att = message.attachments[0];
                //realname = att.size;
                //realname = images[name];
                //if (realname.length >0)
                //message.channel.send(att);
                //message.channel.send(JSON.stringify(emb, null, 2));
            }
        }
    }
    
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
