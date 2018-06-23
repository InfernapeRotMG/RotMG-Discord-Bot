const botconfig = require("./botconfig");
const Discord = require('discord.js');
const fs = require("fs");
const swearlist = require("./swearlist.json");
var profanities = require('profanities')
const prefix = botconfig.prefix
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 5;
const swearWords = ["darn", "shucks", "frak", "shite"];

fs.readdir("./cmds/", (err, files) => {
if(err) console.log(" ");

let jsfiles = files.filter(f => f.split(".").pop() === "js");
if(jsfiles.length <= 0) {
console.log("No commands to load!");
return;
}


bot.on('message', message => {
if (message.author.bot) return;
message.content = message.content.toLowerCase()
var sender = message.author;

if (message.content.includes("Hi")) {
message.channel.send(`👋, ${message.author}`);
}
if( swearWords.some(word => message.content.includes(word)) ) {
message.reply("Please do not swear 😘");
message.delete();
}
if (message.content === '!ping') {
var embed =new Discord.RichEmbed()
.setDescription(":ping_pong:") 
.setColor("#ff00ce") 
.setAuthor("Ping Menu", "https://www.realmeye.com/s/c5/img/eye.png") 
.setFooter("This bot was created by GhoulRotMG. All credits go to him.", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send('Do you want the ping?').then(m => m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`))
}
if (message.content === '!item') {
var embed = new Discord.RichEmbed()
.setDescription("To use the item command, please follow this format: ``!(itemname)``.")
.setColor("#ff00ce")
.setAuthor("Item Menu")
.setFooter("This bot was created by Infernape RotMG. All credits go to him.", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}
if (message.content.includes('server up?')) {
var embed =new Discord.RichEmbed()
.setThumbnail("https://www.realmeye.com/s/c5/img/eye-big.png")
.setDescription(`
Please don't ask questions like this. To check if server is up, simply load the client. If it gives you a black screen, which a white box in the middle, then the server is off.
If you have to ask, please directly message a helper, as they will provide you with the best service.`) 
.setColor("#02ff06") 
.setAuthor("Server Status", "https://www.realmeye.com/s/c5/img/eye.png") 
message.delete();
message.channel.send(`${message.author}`, embed);
}
if (message.content.includes('server down?')) {
var embed =new Discord.RichEmbed()
.setThumbnail("https://www.realmeye.com/s/c5/img/eye-big.png")
.setDescription(`
Please don't ask questions like this. To check if server is up, simply load the client. If it gives you a black screen, which a white box in the middle, then the server is off.
If you have to ask, please directly message a helper, as they will provide you with the best service.`) 
.setColor("#02ff06") 
.setAuthor("Server Status", "https://www.realmeye.com/s/c5/img/eye.png") 
console.log(`Deleted one server status message.`)
message.delete();
message.channel.send(`${message.author}`, embed);
}
if (message.content === '!invite') {
let invlink = "**https://bit.ly/2Ix5Ckv**"
let jsicon = "https://discord.js.org/static/logo-square.png"
let bicon = bot.user.displayAvatarURL
let iEmbed = new Discord.RichEmbed()
.setTitle("Invite RotMG Bot to your server!")
.setDescription(invlink)
.setThumbnail(bicon)
.setColor("RANDOM")
.addField("RotMG Bot", "Testing Version 0.1")

.setFooter("GhoulRotMG ©2018", jsicon);
message.author.send(iEmbed);
message.channel.send(`:mailbox_with_mail: I have sent the invite link in your DMs <@${message.author.id}>`);
}
if (message.content.includes("@441172145595482113")) {
let response = `**${message.author}, how can I help you?**`
message.channel.send(response);
}
if (message.content === '!mysteryboxes') {
message.author.send(`Please go to these sites: **https://i.imgur.com/CNAEt32.jpg, https://i.imgur.com/5xfKGHR.jpg, https://i.imgur.com/n4I52OF.jpg** For the mystery box details.`);
message.delete();
}
if (message.content === '!massdm') {
    setInterval(function() {
        let user = message.mentions.users.first() || message.author;
            user.send('**Hey, this is a mass DM. Please join: https://discord.gg/Vmv7Rpd**')
    }, 3000)
}
if (message.content === '!medusa') {
let response = `${message.author}`
var embed =new Discord.RichEmbed()

.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Medusa.png")
.addField("**Drops**", `
- Potion of Speed`)
.addField("Portal Drops", `
- Snake Pit`)
.addField("**Medusa Information**", `The Medusa has 2 bullets.
- Green Bolt: 100 Damage with a 14 tile range.
- Red Bomb: 150 Damage with a 8 tile range. The bomb does damage in a 4 tile radius of damage.`)
.addField("***Medusa Guide***", `To easily defeat the Medusa, simply circle around it. It is the easiest way to dodge the green bolts. For ranged classes, this method should prevent damage from the red bombs. For meeles, you should be able to simply tank the red bomb, whilst dodging the green bullets.`)
.setColor("#02ff06") 
.setAuthor("Information for Medusa", "https://www.realmeye.com/s/c5/img/eye.png") 
message.channel.send(embed)
console.log(`Gave ${message.author.username}#${message.author.discriminator} information for a mob`);
}
if (message.content === '!beholder') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Beholder.png")
.addField("**Drops**", `
- Potion of Defense`)
.addField("Portal Drops", `
- None`)
.addField("**Beholder Information**", `The Beholder has 2 bullets.
- White Bolt: 120 Damage with a 13.5 tile range.
- Purple Star: 21 tile range. Blind for 5 seconds.`)
.addField("Beholder Guide", `
- The Beholder’s white bolts are slow compared to other gods’ shots, but they inflict heavy damage – second only to the damage inflicted by a Medusa’s grenade. Beholders fire in all directions, so dodging using small adjustments rather than large sweeps is recommended.
- If struck by the purple, blind-inducing shots, don’t panic. Your character and the white bolts are the most visible things on the screen. Dodge as you normally would.
- The Beholder becomes much more dangerous when paired with other gods. Fast-moving, non-white bullets combined with blindness can quickly kill you. Try to lure Beholders away from other gods to kill alone, without being attacked by other gods at the same time.`)
.setColor("RANDOM") 
.setAuthor("Information for Beholder", "https://i.imgur.com/8uPej8O.png") 
message.channel.send(embed);
console.log(`Gave ${message.author.username}#${message.author.discriminator} information for a mob`);
}
if (message.content === '!ghostgod'|| message.content === '!ghost god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Ghost%20God.png")
.addField("**Drops**", `
- Potion of Wisdom`)
.addField("Portal Drops", `
- Undead Lair`)
.addField("**Ghost God Information**", `The Ghost God has 1 bullet.
- White Bolt: 120 Damage with a 13.5 tile range.`)
.addField("Ghost God Guide", `
- Any class is capable of killing a Ghost God, but it is the most difficult for any sword class character because of their limited range. Ghost Gods shoot at where your character will be, but the shots are slow enough that a slight motion to the left or right will cause the projectile to miss. 
- Note: If you are a Trickster the Ghost God will often fall for your decoy and you can get in enough hits to kill it.
- As a melee class, the Crystal Sword makes dispatching Ghost Gods significantly easier, since it is easier to stay out of a dangerous range.
- Beware Ghost God crossfires, since they spawn often and can come from unexpected directions. Even experienced players run from a Ghost God crossfire.`)
.setColor("#02acff") 
.setAuthor("Information for Ghost God", "https://www.realmeye.com/s/c5/img/eye.png") 
message.channel.send(embed);
console.log(`Gave ${message.author.username}#${message.author.discriminator} information for a mob`);
}
if (message.content === '!slimegod'|| message.content === '!slime god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Slime%20God.png")
.addField("**Drops**", `
- Potion of Defense`)
.addField("Portal Drops", `
- Toxic Sewers`)
.addField("**Slime God Information**", `The Slime God has 2 bullets.
- Red Fire: 80 Damage with a 11 tile range.
- Green Star: 14 tile range. Slowed for 6 seconds.`)
.addField("Slime God Guide", `
- The Slime god chases the closest player while firing bullets, he shoots to the place you are going to go, he also shoots a green star which slows you and it can be very dangerous near a group of gods.
- To prevent yourself from being hurt, simply circle the Slime God, and make sure you frequently switch the rotation from clock wise to counter clock-wise, and vice versa.
- You want to avoid being slowed, escpecially if you are being followed by gods.`)
.setColor("#2f6727") 
.setAuthor("Information for Slime God", "https://www.realmeye.com/s/c5/img/eye.png") 
message.channel.send(embed);
console.log(`Gave ${message.author.username}#${message.author.discriminator} information for a mob`);
}
if (message.content === '!whitedemon'|| message.content === '!white demon') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/White%20Demon.png")
.addField("**Drops**", `
- Potion of Attack`)
.addField("Portal Drops", `
- Abyss of the Demons`)
.addField("**Slime God Information**", `The White Demon has 1 bullet.
- White Demon Shot: 45 Armor-Piercing damage with a 10 tile range.`)
.addField("White Demon Guide", `
- The White Demon fires three white spherical bullets in a wide cone at the closest player. The space between the bullets and their relatively slow speed makes this a slightly less lethal encounter than many other gods, even when they come in groups.
- Don’t take them too lightly: their bullets have the armor-piercing property and always do 45 damage no matter what awesome gear you’re wearing. When playing sword classes, be sure to dodge their attacks, as they too predict your movement and due to their wide spread, you will most likely get hit by at least 1.
- This is really the only true godland danger to a maxed melee, but be careful when they group together with other gods; most commonly the medusa. Just tank the hits and get your damage in.
- White demons are easy to aggro and will follow you pretty persistently. This makes them easy to drag back to a safer area you’ve cleared out beforehand.`)
.setColor("#ffffff") 
.setAuthor("Information for White Demon", "https://www.realmeye.com/s/c5/img/eye.png") 
message.channel.send(embed);
console.log(`Gave ${message.author.username}#${message.author.discriminator} information for a mob`);
}
if (message.content === '!spritegod'|| message.content === '!sprite god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Sprite%20God.png")
.setDescription(`
**These are the drops for Sprite God**:
- Potion of Dexterity: 50%
- Sword of the Colossus: 0.00001%

It spawns Sprite Childs which drop a portal to the Sprite World with a 40% chance.`) 
.setColor("#fd00ff") 
.setAuthor("Information for Sprite God", "https://www.realmeye.com/s/c5/img/eye.png") 
message.channel.send(embed);

}
if (message.content === '!entgod'|| message.content === '!ent god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Ent%20God.png")
.setDescription(`
**These are the drops for End God**:
- Potion of Defense: 50%
- Leaf Bow: 0.00001%

It does not drop a portal at the moment, but potentially there will be a new dungeon coming soon! :wink:`) 
.setColor("#c18d2a") 
.setAuthor("Information for Ent God", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!luckyentgod'|| message.content === '!lucky ent god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Lucky%20Ent%20God.png")
.setDescription(`
**These are the drops for Lucky Ent God**:
- Potion of Defense: 50%
- Void Bow: 0.00001%

It drops the portal to the Woodland Labrynth with a 100% chance.`) 
.setColor("#ffdb00") 
.setAuthor("Information for Lucky Ent God", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!flyingbrain'|| message.content === '!flying brain') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Flying%20Brain.png")
.setDescription(`
**These are the drops for Flying Brain**:
- Potion of Attack: 50%
- Robe of the Mad Scientist: 0.00001%

It drops the portal to Mad Lab with a 40% chance.`) 
.setColor("#f000ff") 
.setAuthor("Information for Flying Brain", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!rockconstruct'|| message.content === '!rock construct') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Rock%20Bot.png")
.setDescription(`
**These are the drops for Rock Construct**:
- Potion of Life: 10%
- Bracer of the Guardian: 0.0000001%

It does not drop any portal.`) 
.setColor("#929a95") 
.setAuthor("Information for Rock Construct", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!woodconstruct'|| message.content === '!wood construct') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Paper%20Bot.png")
.setDescription(`
**These are the drops for Wood Construct**:
- Potion of Mana: 10%
- Twilight Gemstone: 0.0000001%

It does not drop any portal.`) 
.setColor("#ba8c34") 
.setAuthor("Information for Wood Construct", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!steelconstruct'|| message.content === '!steel construct') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Steel%20Bot.png")
.setDescription(`
**These are the drops for Steel Construct**:
- No potion/top drops, but will add in new update.
- The Forgotten Crown: 0.0000001%

It does not drop any portal.`) 
.setColor("#00ffdf") 
.setAuthor("Information for Steel Construct", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!djinn') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Djinn.png")
.setDescription(`
**These are the drops for Djinn**:
- Potion of Speed: 50%
- Helm of the Juggernaut: 0.00001%

It does not drop a portal at the moment, but potentially there will be a new dungeon coming soon! :wink:`) 
.setColor("#00d2ff") 
.setAuthor("Information for Djinn", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!luckydjinn'|| message.content === '!lucky djinn') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Lucky%20Djinn.png")
.setDescription(`
**These are the drops for Lucky Djinn**:
- Potion of Life: 20%
- Potion of Mana: 20%

It drops the portal to the Crawling Depths with a 100% chance.`) 
.setColor("#ffe700") 
.setAuthor("Information for Lucky Djinn", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!leviathan') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Leviathan.png")
.setDescription(`
**These are the drops for Leviathan**:
- Potion of Life: 5%
- Potion of Mana: 5%

It does not drop a portal at the moment, but potentially there will be a new dungeon coming soon! :wink:`) 
.setColor("#00ff9f") 
.setAuthor("Information for Leviathan", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!bes'|| message.content === '!tombdefender') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Tomb%20Defender.png")
.setDescription(`
**These are the drops for Tomb Defender (Bes)**:
- Potion of Life: 100%
- Ring of the Pyramid: 2%
- Tome of Holy Protection: 5%
- Shendyt of Geb: 2%`) 
.setColor("#ffce00") 
.setAuthor("Information for Tomb Defender (Bes)", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!nut'|| message.content === '!tombsupport') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Tomb%20Support.png")
.setDescription(`
**These are the drops for Tomb Support (Nut)**:
- Potion of Life: 100%
- Ring of the Sphinx: 2%
- Wand of Geb: 2%`) 
.setColor("#00abff") 
.setAuthor("Information for Tomb Defender (Nut)", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!geb'|| message.content === '!tombattack') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Tomb%20Attacker.png")
.setDescription(`
**These are the drops for Tomb Attack (Geb)**:
- Potion of Life: 100%
- Ring of the Nile: 2%
- Book of Geb: 2%`) 
.setColor("#03c123") 
.setAuthor("Information for Tomb Attack (Geb)", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!stheno the snake queen'|| message.content === '!sthenothesnakequeen') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Stheno%20the%20Snake%20Queen.png")
.setDescription(`
**These are the drops for Stheno the Snake Queen**:
- Potion of Speed: 100%
- Wand of the Bulwark: 1%`) 
.setColor("#03c123") 
.setAuthor("Information for Stheno the Snake Queen", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!limon the sprite goddess'|| message.content === '!limonthespritegoddess') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Limon%20the%20Sprite%20God.png")
.setDescription(`
**These are the drops for Limon the Sprite Goddess**:
- Potion of Dexterity: 100%
- Potion of Defense: 10%
- Staff of Extreme Prejudice: 1%
- Cloak of the Plane Walker: 1%
- Spell of Extreme Prejudice: 1%
- Robe of Extreme Prejudice: 1%
- Ring of Extreme Prejudice: 1%`) 
.setColor("#ff9a00") 
.setAuthor("Information for Limon the Sprite Goddess", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!malphas'|| message.content === '!archdemonmalphas'|| message.content === '!archdemon malphas') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Archdemon%20Malphas.png")
.setDescription(`
**These are the drops for Archdemon Malphas**:
- Potion of Vitality: 100%
- Potion of Defense: 100%
- Skull of Endless Torment: 1%
- Demon Blade: 1%
- Fire Dragon Battle Armor: 1%
- Sword of Illumination: 1%
- Gothic Dagger: 1%
- Gothic Cloak: 1%
- Gothic Armor: 1%
- Gothic Ring: 1%
- Ring of Boiling Lava: 1%
- Steel Armor of Magma: 1%
- Seal of Splashing Lava: 1%
- Flaming Sword of Fury: 1%`) 
.setColor("#ff0000") 
.setAuthor("Information for Archdemon Malphas", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
 if (message.content === '!abyssidol'|| message.content === '!abyss idol'|| message.content === '!abysstroom') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Abyss%20Idol.png")
.setDescription(`
**These are the drops for Abyss Idol**:
- Potion of Vitality: 100%
- Potion of Defense: 100%
- Greater Potion of Vitality: 10%
- Greater Potion of Defense: 10%
- Wine Cellar Incantation: 5%
- Sword of Illumination: 3%
- Gothic Dagger: 1%
- Gothic Cloak: 1%
- Gothic Armor: 1%
- Gothic Ring: 1%`) 
.setColor("#ffdb00") 
.setAuthor("Information for Abyss Idol", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
 if (message.content === '!oryx2'|| message.content === '!o2'|| message.content === '!oryxthemadgod2'|| message.content === '!oryx the mad god 2') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Oryx%20the%20Mad%20God%202.png")
.setDescription(`
**These are the drops for Oryx the Mad God 2**:
- Potion of Vitality: 100%
- Potion of Defense: 60%
- Potion of Attack: 60%
- Potion of Wisdom: 60%
- Ambrosia: 10%
- Potion of Maxy: 5%
- Tops (T12 and T13): 20%`) 
.setColor("#0051ff") 
.setAuthor("Information for Oryx the Mad God 2", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!stone guardian'|| message.content === '!oryxcastle'|| message.content === '!stone guardians') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Oryx%20Stone%20Guardian%20Right.png")
.setDescription(`
**These are the drops for Stone Guardian (Right and Left)**:
- Potion of Defense: 100%
- Ancient Stone Sword: 5%
- Ambrosia: 1%
- Potion of Maxy: 1%`) 
.setColor("#858585") 
.setAuthor("Information for Stone Guardian (Right and Left)", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!exp chicken'|| message.content === '!xpgift'|| message.content === '!xp gift') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/XP%20Gift%20A.png")
.setDescription(`
**These are the drops for XP Gifts**:
- Potion of Defense: 0.5%
- Potion of Speed: 0.5%
- Potion of Wisdom: 0.5%
- Potion of Attack: 0.5%
- Potion of Dexterity: 0.5%
- Potion of Vitality: 0.5%
- Potion of Life: 0.1%
- Potion of Mana: 0.1%
- Ambrosia: 0.01%`) 
.setColor("#ffffff") 
.setAuthor("Information for XP Gifts", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!cube'|| message.content === '!cube god'|| message.content === '!cubegod') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Cube%20God.png")
.setDescription(`
**These are the drops for Cube God**:
- Potion of Dexterity: 50%
- Potion of Wisdom: 50%
- Dirk of Cronus: 1%`) 
.setColor("#00fff9") 
.setAuthor("Information for Cube God", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!skull'|| message.content === '!skull shrine'|| message.content === '!skullshrine') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Skull%20Shrine.png")
.setDescription(`
**These are the drops for Skull Shrine**:
- Potion of Defense: 50%
- Potion of Wisdom: 50%
- Potion of Vitality: 50%
- Orb of Conflict: 1%`) 
.setColor("#00fff9") 
.setAuthor("Information for Skull Shrine", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!hermit'|| message.content === '!hermit god'|| message.content === '!hermitgod') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Hermit%20God.png")
.setDescription(`
**These are the drops for Hermit God**:
- Potion of Defense: 50%
- Potion of Wisdom: 50%
- Potion of Mana: 50%
- Potion of Life: 30%
- Helm of the Juggernaut: 0.5%
- Coral Bow: 0.5%
- Coral Silk Armor: 0.5%
- Coral Venom Trap: 0.5%
- Coral Ring: 1%

It drops a portal to the Ocean Trench at a 100% drop rate.`) 
.setColor("#00fff9") 
.setAuthor("Information for Hermit God", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!sphinx'|| message.content === '!grand sphinx'|| message.content === '!grandsphinx') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Grand%20Sphinx.png")
.setDescription(`
**These are the drops for Grand Sphinx**:
- Potion of Wisdom: 50%
- Potion of Vitality: 50%
- Potion of Mana: 50%
- Potion of Life: 30%
- Helm of the Juggernaut: 0.5%
- Ring of the Pyramid: 0.5%
- Ring of the Nile: 0.5%
- Ring of the Sphinx: 1%
- Tome of Holy Protection: 0.5%

It drops a portal to the Tomb of the Ancients at a 100% chance.`) 
.setColor("#00fff9") 
.setAuthor("Information for Grand Sphinx", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!penta'|| message.content === '!penteract'|| message.content === '!pentaract') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Pentaract%20Tower.png")
.setDescription(`
**These are the drops for Pentaract**:
- Potion of Attack: 50%
- Potion of Vitality: 50%
- Potion of Dexterity: 50%
- Potion of Defense: 50%
- Potion of Speed: 50%
- Potion of Wisdom: 50%
- Seal of Blasphemous Prayer: 1%`) 
.setColor("#00fff9") 
.setAuthor("Information for Pentaract", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!septavius'|| message.content === '!septaviustheghostgod'|| message.content === '!septavius the ghost god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Enemies/Septavius%20the%20Ghost%20God.png")
.setDescription(`
**These are the drops for Septavius the Ghost God**:
- Potion of Wisdom: 100%
- Doom Bow: 2%
- Doom Quiver: 1%
- Doom Armor: 1%
- Doom Ring: 1%
- Bow of the Morning Star: 1%

There is also a chance that it will drop a UDL key (10%).`) 
.setColor("#00fff9") 
.setAuthor("Information for Septavius the Ghost God", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}

if (message.content === '!updates'|| message.content === '!updates to come'|| message.content === '!updatestocome') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Misc%20items/Ambrosia.png")
.setDescription(`
**These are the updates that will be released in the near future**:
- New Boss Behaviors
- New Custom Items (40+)
- New Dungeons
- New Jeebs
- New Custom God Land Mobs
- New Dungeon Bosses

**These are the updates that will be released in the far future:**
- New Class
- New Realm Style
- New UI for Client`) 
.setColor("RANDOM") 
.setAuthor("Information for Future Updates", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!customgods'|| message.content === '!custom gods'|| message.content === '!gods') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Misc%20items/Ambrosia.png")
.setDescription(`
**These are the Custom Gods that will be released in the near future**:
- Lava God
- Turkey God
- Ghoul Guardian
- Elder Beholder

**These are the Custom Gods that will be released in the far future:**
- Super Man
- Stone God
- Fairy Man
- Cotton Ball
- Shrivelled Ghost`) 
.setColor("RANDOM") 
.setAuthor("Information for Custom Gods", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!elderbeholder'|| message.content === '!elder beholder') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/N8eZYC6.png")
.setDescription(`
**These are the drops for Elder Beholder**:
- Potion of Maxy: 1%
- Forgotten Dagger: 1%
- Forgotten Cloak: 1%
- Forgotten Armor: 1%
- Forgotten Ring: 1%`) 
.setColor("RANDOM") 
.setAuthor("Information for Elder Beholder", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!lavagod'|| message.content === '!lava god') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/g3jZfqy.png")
.setDescription(`
**These are the drops for Lava God**:
- Potion of Maxy: 1%
- Forgotten Dagger: 1%
- Forgotten Cloak: 1%
- Forgotten Armor: 1%
- Forgotten Ring: 1%`) 
.setColor("RANDOM") 
.setAuthor("Information for Lava God", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!ghoulguardian'|| message.content === '!ghoul guardian') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/0WFTnsC.png")
.setDescription(`
**These are the drops for Ghoul Guardian**:
- Potion of Maxy: 1%
- Forgotten Dagger: 1%
- Forgotten Cloak: 1%
- Forgotten Armor: 1%
- Forgotten Ring: 1%`) 
.setColor("RANDOM") 
.setAuthor("Information for Ghoul Guardian", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of dexterity'|| message.content === '!potionofdexterity'|| message.content === '!dex') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Dexterity.png")
.setDescription(`
This is the information for Potion of Dexterity:**:
- The Potion of Dexterity permanentely increases your dexterity stat by 1.`) 
.setColor("#ff9a00") 
.setAuthor("Information for Potion of Dexterity", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of life'|| message.content === '!potionoflife'|| message.content === '!life') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Life.png")
.setDescription(`
This is the information for Potion of Life:**:
- The Potion of Life permanentely increases your HP stat by 5.`) 
.setColor("#00fff9") 
.setAuthor("Information for Potion of Life", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of mana'|| message.content === '!potionofmana'|| message.content === '!mana') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Mana.png")
.setDescription(`
This is the information for Potion of Mana:**:
- The Potion of Mana permanentely increases your MP stat by 5.`) 
.setColor("#fdff00") 
.setAuthor("Information for Potion of Mana", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of defense'|| message.content === '!potionofdefense'|| message.content === '!def') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Defense.png")
.setDescription(`
This is the information for Potion of Defense:**:
- The Potion of Defense permanentely increases your defense stat by 1.`) 
.setColor("#222327") 
.setAuthor("Information for Potion of Defense", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of attack'|| message.content === '!potionofattack'|| message.content === '!att'|| message.content === '!attack') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Attack.png")
.setDescription(`
This is the information for Potion of Attack:**:
- The Potion of Attack permanentely increases your attack stat by 1.`) 
.setColor("#f000ff") 
.setAuthor("Information for Potion of Attack", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of wisdom'|| message.content === '!potionofwisdom'|| message.content === '!wis') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Wisdom.png")
.setDescription(`
This is the information for Potion of Wisdom:**:
- The Potion of Wisdom permanentely increases your wisdom stat by 1.`) 
.setColor("#0085ff") 
.setAuthor("Information for Potion of Wisdom", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of vitality'|| message.content === '!potionofvitality'|| message.content === '!vit') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Vitality.png")
.setDescription(`
This is the information for Potion of Vitality:**:
- The Potion of Vitality permanentely increases your vitality stat by 1.`) 
.setColor("#ff0000") 
.setAuthor("Information for Potion of Vitality", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!potion of speed'|| message.content === '!potionofspeed'|| message.content === '!spd') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Consumable/Stat%20Potions/Potion%20of%20Speed.png")
.setDescription(`
This is the information for Potion of Speed:**:
- The Potion of Speed permanentely increases your speed stat by 1.`) 
.setColor("#35e126") 
.setAuthor("Information for Potion of Speed", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
























//Bows

if (message.content === '!blood bow'|| message.content === '!bow of innocent blood'|| message.content === '!bbow'|| message.content === '!bowofinnocentblood') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Weapons/Bows/T11%20Bow%20of%20Innocent%20Blood.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Tier 11")
.addField("Item Information", `
Minimum Damage: 45
Maximum Damage: 70
Rate of Fire: 1
Number of Projectiles: 3
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 310
Fame Bonus: 3%
Soulbound: No`)
.addField("Guide", "The Bow of Innocent Blood is a cheap bow that can be good when you are starting off. However, you should really be aiming to switch this out for other bows, as this can significantly decrease your DPS, and may be silly to use in certain situations.")
.setColor("#e12626") 
.setAuthor("Information for Bow of Innocent Blood", "https://www.realmeye.com/s/c5/img/eye.png") 
message.channel.send(embed);

}
if (message.content === '!eternal frost'|| message.content === '!bow of eternal frost'|| message.content === '!eternalfrost'|| message.content === '!bowofeternalfrost') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Weapons/Bows/T11%20Bow%20of%20Eternal%20Frost.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Tier 11")
.addField("Item Information", `
Minimum Damage: 45
Maximum Damage: 70
Rate of Fire: 1
Number of Projectiles: 3
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 310
Fame Bonus: 3%
Soulbound: No`)
.addField("Guide", "Essentially a reskin of the Bow of Innocent Blood, this bow has no other use except for asthetics.")
.addField("Projectile", `https://imgur.com/7ztjzsH`)
.setColor("#26c0e1") 
.setAuthor("Information for Bow of Eternal Frost", "https://www.realmeye.com/s/c5/img/eye.png") 

message.channel.send(embed);

}
if (message.content === '!nightmares'|| message.content === '!bow of nightmares'|| message.content === '!bowofnightmares') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Weapons/Bows/T11%20Bow%20of%20Nightmares.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Tier 11")
.addField("Item Information", `
Minimum Damage: 45
Maximum Damage: 70
Rate of Fire: 1
Number of Projectiles: 3
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 310
Fame Bonus: 3%
Soulbound: No`)
.addField("Guide", "Essentially a reskin of the Bow of Innocent Blood, this bow has no other use except for asthetics.")
.setColor("#55228b")
.setAuthor("Information for Bow of Nightmares", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);
}
if (message.content === '!mystical energy'|| message.content === '!bow of mystical energy'|| message.content === '!bowofmysticalenergy') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Weapons/Bows/T13%20Bow%20of%20Mystical%20Energy.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Tier 13")
.addField("Item Information", `
Minimum Damage: 50
Maximum Damage: 75
Rate of Fire: 1
Number of Projectiles: 3
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 550
Fame Bonus: 5%
Soulbound: Yes`)
.setColor("#eaf908")
.addField("Guide", "The Bow of Mystical Energy is a more powerful version of the tiered bows. This drops from the Lost Halls, so it can be a challenge to get. It is recommended that you use another bow instead of this because of DPS issues.")
.setAuthor("Information for Bow of Mystical Energy", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);
}
if (message.content === '!leaf bow'|| message.content === '!leafbow'|| message.content === '!leaf') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Leaf%20Bow.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Untired")
.addField("Item Information", `
Minimum Damage: 95
Maximum Damage: 125
Rate of Fire: 1.4
Number of Projectiles: 1
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 800
Fame Bonus: 5%
Soulbound: Yes`)
.setColor("#10f908")
.setAuthor("Information for Leaf Bow", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}
if (message.content === '!doom bow'|| message.content === '!doombow'|| message.content === '!dbow') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Doom%20Bow.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Untired")
.addField("Item Information", `
Minimum Damage: 400
Maximum Damage: 500
Rate of Fire: 0.33
Number of Projectiles: 1
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 900
Fame Bonus: 6%
Soulbound: Yes`)
.setColor("#fbf8f8")
.setAuthor("Information for Doom Bow", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}
if (message.content === '!coral bow'|| message.content === '!coralbow'|| message.content === '!cbow') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Coral%20Bow.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Untired")
.addField("Item Information", `
Minimum Damage: 60
Maximum Damage: 80
Rate of Fire: 1.25
Number of Projectiles: 2
Range: 8 Tiles`)
.addField("Other Information", `
Feedpower: 1200
Fame Bonus: 6%
Soulbound: Yes`)
.setColor("#f400de")
.setAuthor("Information for Coral Bow", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}
if (message.content === '!thousand shot'|| message.content === '!thousandshot'|| message.content === '!tshot') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Thousand%20Shot.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Untired")
.addField("Item Information", `
Minimum Damage: 50
Maximum Damage: 70
Rate of Fire: 2.5
Number of Projectiles: 1
Range: 7.5 Tiles`)
.addField("Other Information", `
Feedpower: 900
Fame Bonus: 6%
Soulbound: Yes`)
.setColor("#0d0c0d")
.setAuthor("Information for Thousand Shot", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}
if (message.content === '!precisely calibrated stringstick'|| message.content === '!preciselycalibratedstringstick'|| message.content === '!vanitybow') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Precisely%20Calibrated%20Stringstick.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Untired")
.addField("Item Information", `
Minimum Damage: 10
Maximum Damage: 15
Rate of Fire: 0.5
Number of Projectiles: 1
Range: 5 Tiles`)
.addField("Other Information", `
Feedpower: None
Fame Bonus: None
Soulbound: Yes`)
.setColor("#9a7315")
.setAuthor("Information for Precisely Calibrated Stringstick", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}
if (message.content === '!bow of the morning star'|| message.content === '!bowofthemorningstar'|| message.content === '!morning star'|| message.content ==='morningstar') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Bow%20of%20the%20Morning%20Star.png")
.addField("Classes", "Archer, Huntress")
.addField("Tier", "Untired")
.addField("Item Information", `
Minimum Damage: 400
Maximum Damage: 500
Rate of Fire: 0.33
Number of Projectiles: 1
Range: 7 Tiles`)
.addField("Other Information", `
Feedpower: 900
Fame Bonus: 6%
Soulbound: Yes`)
.setColor("#02c6ff")
.setAuthor("Information for Bow of the Morning Star", "https://www.realmeye.com/s/c5/img/eye.png")

message.channel.send(embed);

}















//Swords
if (message.content === '!skysplitter sword'|| message.content === '!skysplittersword'|| message.content === '!sky'|| message.content === '!skysword') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Weapons/Swords/T11%20Skysplitter%20Sword.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Tier 11")
.addField("Item Information", `
Minimum Damage: 210
Maximum Damage: 270
Rate of Fire: 1
Number of Projectiles: 1
Range: 3.5 Tiles`)
.addField("Other Information", `
Feedpower: 310
Fame Bonus: 3%
Soulbound: No`)
.setColor("RANDOM")
.setAuthor("Information for Skysplitter Sword", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!acclaim sword'|| message.content === '!sword of acclaim'|| message.content === '!acclaim'|| message.content === '!swordofacclaim') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Weapons/Swords/T12%20Sword%20of%20Acclaim.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Tier 12")
.addField("Item Information", `
Minimum Damage: 220
Maximum Damage: 275
Rate of Fire: 1
Number of Projectiles: 1
Range: 3.5 Tiles`)
.addField("Other Information", `
Feedpower: 450
Fame Bonus: 4%
Soulbound: No`)
.setColor("RANDOM")
.setAuthor("Information for Sword of Acclaim", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!splendor sword'|| message.content === '!sword of splendor'|| message.content === '!splendor'|| message.content === '!swordofsplendor') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/Klyve1D.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Tier 13")
.addField("Item Information", `
Minimum Damage: 225
Maximum Damage: 280
Rate of Fire: 1
Number of Projectiles: 1
Range: 3.5 Tiles`)
.addField("Other Information", `
Feedpower: 650
Fame Bonus: 5%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Sword of Splendor", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!crystal sword'|| message.content === '!sword of crystal'|| message.content === '!crystalsword'|| message.content === '!csword') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/dp1HJKq.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Untiered")
.addField("Item Information", `
Minimum Damage: 180
Maximum Damage: 210
Rate of Fire: 1
Number of Projectiles: 1
Range: 4.5 Tiles`)
.addField("Other Information", `
Feedpower: 400
Fame Bonus: 3%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Crystal Sword", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!ancient stone sword'|| message.content === '!ancientstonesword'|| message.content === '!stonesword'|| message.content === '!ass') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Ancient%20Stone%20Sword.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Untiered")
.addField("Item Information", `
Minimum Damage: 340
Maximum Damage: 390
Rate of Fire: 0.6
Number of Projectiles: 1
Range: 4 Tiles`)
.addField("Other Information", `
Feedpower: 900
Fame Bonus: 4%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Ancient Stone Sword", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!pirate kings cutlass'|| message.content === '!piratekingscutlass'|| message.content === '!cutlass'|| message.content === '!piratecutlass') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Pirate%20King's%20Cutlass.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Untiered")
.addField("Item Information", `
Minimum Damage: 180
Maximum Damage: 230
Rate of Fire: 1.3
Number of Projectiles: 1
Range: 3.3 Tiles`)
.addField("Other Information", `
Feedpower: 800
Fame Bonus: 5%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Pirate King's Cutlass", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!demon blade'|| message.content === '!demonblade'|| message.content === '!dblade'|| message.content === '!d blade') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Demon%20Blade.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Untiered")
.addField("Item Information", `
Minimum Damage: 150
Maximum Damage: 175
Rate of Fire: 1
Number of Projectiles: 2
Range: 3.38 Tiles`)
.addField("Other Information", `
Feedpower: 800
Fame Bonus: 6%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Demon Blade", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!sword of the colossus'|| message.content === '!swordofthecolossus'|| message.content === '!colossus'|| message.content === '!colo sword') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://i.imgur.com/WEOyC4r.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Untiered")
.addField("Item Information", `
Minimum Damage: 280
Maximum Damage: 295
Rate of Fire: 1
Number of Projectiles: 1
Range: 4.5 Tiles`)
.addField("Other Information", `
Feedpower: 1200
Fame Bonus: 6%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Sword of the Colossus", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!sword of the mad god'|| message.content === '!swordofthemadgod'|| message.content === '!sotmg'|| message.content === '!mad god sword') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Sword%20of%20the%20Mad%20God.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "ST")
.addField("Item Information", `
Minimum Damage: 220
Maximum Damage: 275
Rate of Fire: 1
Number of Projectiles: 1
Range: 3.5 Tiles`)
.addField("Other Information", `
Feedpower: 450
Fame Bonus: 4%
Soulbound: No`)
.setColor("RANDOM")
.setAuthor("Information for Sword of the Mad God", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!pixie-enchanted sword'|| message.content === '!pixieenchantedsword'|| message.content === '!pixie'|| message.content === '!pixie enchanted sword') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Pixie-Enchanted%20Sword.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "ST")
.addField("Item Information", `
Minimum Damage: 75
Maximum Damage: 90
Rate of Fire: 1
Number of Projectiles: 4
Range: 4.55 Tiles`)
.addField("Other Information", `
Feedpower: 500
Fame Bonus: 4%
Soulbound: No`)
.setColor("RANDOM")
.setAuthor("Information for Pixie-Enchanted Sword", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!indomptable'|| message.content === '!indomptable sword'|| message.content === '!indomptablesword'|| message.content === '!lod sword') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Indomptable.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "ST")
.addField("Item Information", `
Minimum Damage: 75
Maximum Damage: 90
Rate of Fire: 1
Number of Projectiles: 4
Range: 4.55 Tiles`)
.addField("Other Information", `
Feedpower: 500
Fame Bonus: 4%
Soulbound: No`)
.setColor("RANDOM")
.setAuthor("Information for Indomptable", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!doctor swordsworth'|| message.content === '!doctorswordsworth'|| message.content === '!dr swordsworth'|| message.content === '!drswordsworth') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Doctor%20Swordsworth.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Vanity")
.addField("Item Information", `
Minimum Damage: 40
Maximum Damage: 70
Rate of Fire: 0.33
Number of Projectiles: 3
Range: 2.8 Tiles`)
.addField("Other Information", `
Feedpower: 500
Fame Bonus: 4%
Soulbound: Yes`)
.setColor("RANDOM")
.setAuthor("Information for Doctor Swordsworth", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
if (message.content === '!unstable anomaly'|| message.content === '!unstableanomaly'|| message.content === '!unstable sword'|| message.content === '!anomaly') {
var embed =new Discord.RichEmbed()
.setThumbnail("https://static.drips.pw/rotmg/wiki/Untiered/Unstable%20Anomaly.png")
.addField("Classes", "Knight, Warrior, Paladin")
.addField("Tier", "Vanity")
.addField("Item Information", `
Minimum Damage: 10
Maximum Damage: 15
Rate of Fire: 0.25
Number of Projectiles: 10
Range: 5 Tiles`)
.addField("Other Information", `
Feedpower: 0
Fame Bonus: 1%
Soulbound: No`)
.setColor("RANDOM")
.setAuthor("Information for Unstable Anomaly", "https://www.realmeye.com/s/c5/img/eye.png")
message.channel.send(embed);

}
});

jsfiles.forEach((f, i) => {
let props = require(`./cmds/${f}`);
bot.commands.set(props.help.name, props);
});
});

bot.on('ready', async () => {
console.log(`${bot.user.username} is ready!`);
bot.user.setActivity(`with ${bot.guilds.size} servers | !help`);

try {
let link = await bot.generateInvite(["ADMINISTRATOR"]);
console.log(`Administrator Invite Link:`, link);
} catch(e) {
console.log(e.stack);
}
});

bot.on('message', async message => {
if(message.author.bot) return;

let messageArray = message.content.split(" ");
let command = messageArray[0];
let args = messageArray.slice(1);

if(!command.startsWith(prefix)) return;

let cmd = bot.commands.get(command.slice(prefix.length));
if(cmd) cmd.run(bot, message, args);

setTimeout(() => {
 cooldown.delete(message.author.id)
 }, cdseconds * 1000)
});

bot.login('Insert Bot Token');
