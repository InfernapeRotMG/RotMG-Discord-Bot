
const Discord = require('discord.js');

// Command Handler
exports.run = async (bot, message, args, tools) => {

  let jsicon = "https://discord.js.org/static/logo-square.png";

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setTitle('Web-Client for Ghoul Reborn')
        .setColor('#42f4d9')
        .addField('Webclient for browser', `https://GhoulRotMG.github.io/`)
        .addField('Webclient for Flash Player', `https://GhoulRotMG.github.io/client.swf`)
        .addField('Note:', `Please select a name to join the server. When you join, do /mscale 1.2 to fix the zoomed screen.`)
        .setTimestamp()
        .setFooter("RotMG Bot ©2018", jsicon);

    // Send Embed
    message.channel.send(embed);

}
module.exports.help = {
    name: "webclient"
}
