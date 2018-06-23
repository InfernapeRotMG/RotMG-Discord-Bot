
const Discord = require('discord.js');

// Command Handler
exports.run = async (bot, message, args, tools) => {

  let jsicon = "https://discord.js.org/static/logo-square.png";

    // Form Embed
    const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .addField('Custom Items', `
 Please visit https://hastebin.com/onigamoyiz.diff for full list of the custom items.`)
 .addField('Custom Misc Items', `
 - Toxic Ambrosia
 - Molten Ambrosia
 - Aqua Ambrosia
 - 5000 Fame
 - 1000 Fame
 - 100 Fame
 - Potion of Maxy`)
 .addField('Custom Mobs', `
 - Pichu XP Gift
 - Lava God
 - Elder Beholder
 - Ghoul Guardian
 - Shrivelled Ghoul
 - Turkey God`)
 .setTimestamp()
 .setAuthor("Ghoul Reborn Custom Features")
 .setThumbnail("https://static.drips.pw/rotmg/wiki/Misc%20items/Ambrosia.png")
 .setFooter("RotMG Bot ©2018", jsicon);

    // Send Embed
    message.channel.send(embed);

}
module.exports.help = {
    name: "customfeatures"
}
