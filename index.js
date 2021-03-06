const Discord = require('discord.js');
const client = new Discord.Client();
const https = require('https');

const config = require('./config.json');
require('dotenv').config();

const l = require('./util/logger.js');


client.on('ready', () => {l.log('Cor.0N4 online.')});

client.on('message', message => {
	if (message.member.highestRole.name == '@everyone') {
		message.member.addRole(config.roles.visitor);
	}
  
  if (message.author.id == process.env.OWNER && message.content == ".!test") {
    message.channel.send("Basic systems functional.");
  }
  
	if (message.author.id == process.env.OWNER && message.content == ".!acc") {
		message.channel.send("All new visitors must introduce themselves in " + 
		message.guild.channels.find(channel => channel.name === "introductions").toString() + 
		" for clearance to enter the lab.");
	}
});

client.login(process.env.CLIENT_TOKEN);

setInterval(function () { // Keeps the bot awake
	try {
		https.get('https://cor0n4.glitch.me');
		l.log("ping");
	} catch(e) {
		l.error(e);
	}
}, 30000);