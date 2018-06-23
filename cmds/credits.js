
const Discord = require('discord.js');

// Command Handler
exports.run = async (bot, message, args, tools) => {

  let jsicon = "https://discord.js.org/static/logo-square.png";

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setTitle('Credits for this bot')
        .setColor('#42f4d9')
        .addField('KeBiem', `KeBiem taught me about the basic coding for this bot, and provided the basic framework.`)
        .addField('GhoulRotMG', `Creating the RotMG related commands.`)
        .addField('Deca Games/Kabam/Wildshadow', `Creating RealmEye, and Realm of the Mad God.`)
        .setTimestamp()
        .setFooter("RotMG Bot ©2018", jsicon);

    // Send Embed
    message.channel.send(embed);

}
module.exports.help = {
    name: "credits"
}
