
const Discord = require('discord.js');

// Command Handler
exports.run = async (bot, message, args, tools) => {

  let jsicon = "https://discord.js.org/static/logo-square.png";

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setTitle('Donate to Ghoul Reborn')
        .setColor('#42f4d9')
        .addField('Donate to  Email - PayPal', `The donation email to this server is: rotmgkevin123@gmail.com`)
        .addField('Donate by other payment options.', `Please message @GhoulRotMG#0001 directly for this.`)
        .addField('Donation Information', `Please visit #donations for more information`)
        .setTimestamp()
        .setFooter("RotMG Bot ©2018", jsicon);

    // Send Embed
    message.channel.send(embed);

}
module.exports.help = {
    name: "donate"
}
