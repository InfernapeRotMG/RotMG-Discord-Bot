
const Discord = require('discord.js');

// Command Handler
exports.run = async (bot, message, args, tools) => {

  let jsicon = "https://discord.js.org/static/logo-square.png";

    // Form Embed
    const embed = new Discord.RichEmbed()
.setTitle('Custom Item Drop Locations for Ghoul Reborn')
.setColor('RANDOM')
.addField('Set Drop Information', `
- Extreme Prejudice Wizard Set: Sprite World
- Gothic Rogue Set: Abyss of the Demons
- Aqua Ninja Set: Ocean Trench
- Ghost King Assassin Set: Ghost King
- Doom Archer Set: Undead Lair
- Heaven Ninja Set: Wine Cellar
- Lost Dragon Warrior Set: Davy Jones Locker
- Forgotten Rogue Set: God-Lands, Wine Cellar
- Monk Mystic Set: Tomb of the Ancients
- Chicken Wizard Set: Sprite World
- Janus Huntress Set: Oryx's Courtyard
- Flaming Paladin Set: Abyss of the Demons`)
.addField('Other Item Drop Information', `
- Custom Ambrosias: XP Area
- Potion of Maxy: Wine Cellar, Elder Gods`)
.setTimestamp()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Misc%20items/Ambrosia.png")
.setFooter("RotMG Bot ©2018", jsicon);

    // Send Embed
    message.channel.send(embed);

}
module.exports.help = {
    name: "setdrops"
}
