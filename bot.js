const discord = require("discord.js");
const { db } = require('./helpers/firebase/firebaseSetup');
const client = new discord.Client();
client.commands = new discord.Collection();
require('dotenv').config();
const fs = require('fs');

//This is the function to start the bot and do everything you need to do
const startBot = (token, prefix) => {
  const commandFiles = fs.readdirSync('./botCommands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./botCommands/${file}`);
    client.commands.set(command.name, command);
  }

  client.on('message', async message => {

    if (message.channel.type == 'dm' || message.content.startsWith(prefix)) {
      client.channels.cache
        .get(`799370509946060810`)
        .send(`<@!${message.author.id}>: ${message.content}`);
    }

    //End if sent by bot or message doesn't start with prefix
    if (message.author.bot || !message.content.startsWith(prefix)) {
      return;
    }

    //Define args by splitting on " " and command by the first one. It's possible to recover the content by args.join(" ")
    var args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    //If command doesn't exist, just exit. Otherwise, we look to do the command
    if (!client.commands.has(commandName)) {
      message.channel.send('huh');
      return;
    }

    const command = client.commands.get(commandName);
    if (command.args > args.length) {
      message.reply(`there were not sufficent arguments for the command (it requires ${command.args} argument${command.args == 1 ? '' : 's'} but you provided ${args.length} argument${args.length == 1 ? '' : 's'}).`);
      return;
    }

    //Try and catch - try to do it, if it succeeds cool, else throw error (via Discord and console)
    try {
      if (commandName == 'help') {
        command.execute(message, args, client.commands);
      } else if (commandName == 'suggestion' || commandName == 'blacklist' || commandName == 'send' || commandName == 'guilds') {
        command.execute(message, args, client);
      } else {
        command.execute(message, args);
      }
    } catch (error) {
      console.log(error);
    }
  });

  //On ready.
  client.once("ready", () => {
    console.log("bot ready!");
    client.user.setPresence({
      status: 'dnd',
      activity: {
        name: 'quizdb.org | gb/help',
        type: 'WATCHING',
        url: 'https://www.kidovid19.com'
      }
    });
  });

  //Login with token
  client.login(token);

}

module.exports = {
  startBot,
  client
};