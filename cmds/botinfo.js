const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  let jsicon = "https://discord.js.org/static/logo-square.png"
  let bicon = bot.user.displayAvatarURL

  let Bembed = new Discord.RichEmbed()
  .setTitle("Information Regarding the Bot")
  .setDescription("This bot was created by Infernape RotMG")
  .setColor("#328484")
  .addField("InfernapeBot", "Version 0.1")
  .addField("Created On", bot.user.createdAt)
  .addField("My Creator", "GhoulRotMG")
  .addField("Coded Language", "Javascript & Node.JS")
  .setThumbnail(bicon)
  .setTimestamp()
  .setFooter("GhoulRotMG ©2018", jsicon);

  message.channel.send(Bembed);
}

module.exports.help = {
  name: "botinfo"
}
