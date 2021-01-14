const discord = require("discord.js");

module.exports = {
  name: "help",
  onHelp: true,
  shortDesc: "Help!",
  description: "Help commands!",
  example: `\`gb/help\` or \`gb/help data\``,
  args: 0,
  async execute(message, args, commands) {
    var arr = Array.from(commands.keys());
    const helpEmbed = new discord.MessageEmbed()
      .setColor("#000080")
      .setAuthor("GrinderBowl Developer Team")
      .setTitle("Command List:")
      .setTimestamp()
    if (args.length == 0) {
      var valueCommand = ``;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] != undefined && commands.get(arr[i]).onHelp) {
          var commandObj = commands.get(arr[i]);
          valueCommand += `\`kid/${commandObj.name}\`: ${commandObj.shortDesc}\n`;
        }
      }
      valueCommand += `**Do \`kid/help <command>\` to find information on each command.**`;
      helpEmbed.setTitle("Command List:");
      helpEmbed.setDescription(valueCommand);
      message.channel.send(helpEmbed);
    } else {
      var command = args[0];
      if (commands.has(command) && commands.get(command).onHelp) {
        helpEmbed.setTitle(`\`kid/${command}\`:`);
        helpEmbed.setDescription(commands.get(command).description);
        helpEmbed.addField(`Example`, `${commands.get(command).example}`);
        message.channel.send(helpEmbed);
      } else {
        message.channel.send(`\`kid/${args[0]}\` is not a command!`);
      }
    }
  },
};
