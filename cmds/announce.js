const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let jsicon = "https://discord.js.org/static/logo-square.png"

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You do not have administrator!");
let announcemessage = args.join(" ");
message.delete().catch();

let announceEmbed = new Discord.RichEmbed()
.setTitle(`Important Announcement from ${message.author.username}`)
.setDescription(announcemessage)
.setColor("RANDOM")
.addField("Author", `${message.author.username}#${message.author.discriminator}`)
.setTimestamp()
.setFooter("GhoulRotMG ©2018", jsicon);

message.channel.send(`@everyone`, announceEmbed);
message.author.send("I have successfully announced what you requested me to do.")
}
module.exports.help = {
  name: "announce"
}
