const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let jsicon = "https://discord.js.org/static/logo-square.png";

let serverEmbed = new Discord.RichEmbed()
.setTitle("**Server Invite:**")
.setDescription("**This is the official server invite link. Please use this to invite other members. https://discord.gg/Vmv7Rpd**")
.setFooter("Infernape RotMG ©2018", jsicon)
.setTimestamp()

message.author.send(serverEmbed);
message.channel.send(`**Sent the invite in your DMs, ${message.author}**`)
}

module.exports.help = {
  name: "serverinvite"
}
