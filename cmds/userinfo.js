const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


  let target = message.mentions.members.first() || message.member;

  let createdAt = target.user.createdAt
	let joinedAt = target.joinedAt
    let sicon = target.avatarURL;

    let Uembed = new Discord.RichEmbed()
      .setAuthor(target.user.username)
      .setColor("#80DDFF")
      .setThumbnail(target.avatarURL)
      .addField("Full Username", `${target.user.username}#${target.user.discriminator}`)
      .addField("Nickname", target.nickname || "None")
      .addField("ID", target.id)
      .addField("Status:", `${target.presence.status}`, true)
      .addField("Game:", `${target.presence.game ? target.presence.game.name : 'None'}`, true)
      .addField("Account Created At", createdAt)
      
      .addField("You Joined", joinedAt);

      message.channel.send(Uembed);
}

module.exports.help = {
  name: "userinfo"
}
