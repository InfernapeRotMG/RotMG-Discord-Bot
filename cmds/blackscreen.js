
const Discord = require('discord.js');

// Command Handler
exports.run = async (bot, message, args, tools) => {

  let jsicon = "https://discord.js.org/static/logo-square.png";

    // Form Embed
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Update your client', `Please update your client to the latest one found in #client-here`)
        .addField('Select a name before you enter the server', `To prevent un-named hackers, you must select a name before entering the server.`)
        .addField('Server status', `Make sure the server is online. It should be on if GhoulRotMG is on, otherwise just send him a DM.`)
        .setTimestamp()
        .setAuthor("How to fix black screen issue")
        .setFooter("RotMG Bot ©2018", jsicon);

    // Send Embed
    message.channel.send(embed);

}
module.exports.help = {
    name: "blackscreen"
}
