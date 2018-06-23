const Discord = require('discord.js');
const quiz = [
  { q: "What color is the sky?", a: ["no color", "invisible"] },
  { q: "Name a soft drink brand.", a: ["pepsi", "coke", "rc", "7up", "sprite", "mountain dew"] },
  { q: "Name a programming language.", a: ["actionscript", "coffeescript", "c", "c++", "basic", "python", "perl", "javascript", "dotnet", "lua", "crystal", "go", "d", "php", "ruby", "rust", "dart", "java", "javascript"] },
  { q: "Who's a good boy?", a: ["you are", "whirl"] },
  { q: "Who created me?", a: ["Infernape", "Infernape RotMG"] },
  { q: "What programming language am I made in?", a: ["javascript",] },
  { q: "Name the seventh planet from the Sun.", a: ["uranus"] },
  { q: "Name the World's biggest island.", a: ["greenland",] },
  { q: "What's the World's longest river?", a: ["amazon", "amazon river"] },
  { q: "Name the World's largest ocean.", a: ["pacific", "pacific ocean"] },
  { q: "Name one of the three primary colors.", a: ["blue", "red", "yellow"] },
  { q: "How many colors are there in a rainbow?", a: ["7", "seven"] },
  { q: "What do you call a time span of one thousand years?", a: ["millennium"] },
  { q: "How many squares are there on a chess board?", a: ["64", "sixty four"] },
  { q: "How many degrees are found in a circle?", a: ["360", "360 degrees", "three hundred sixty"] },
  { q: "The Dewey Decimal system is used to categorize what?", a: ["books"] },
  { q: "How many points does a compass have?", a: ["32", "thirty two"] },
  { q: "How many strings does a cello have?", a: ["4", "four"] },
  { q: "How many symphonies did Beethoven compose?", a: ["9", "nine"] },
  { q: "How many lines should a limerick have?", a: ["5", "five"] },
  { q: "What is the most basic language Microsoft made?", a: ["visual basic"] },
  { q: "What is the most complicated language?", a: ["binary"] },
  { q: "'OS' computer abbreviation usually means?", a: ["operating system"] },
  { q: "How many weapons are there in RotMG", a: ["6", "six"] },
  { q: "What white bag drops from the Lord of the Lost Lands?", a: ["Shield of Ogmur", "Ogmur"] },
  { q: "What white bag drops from the Hermit God and Grand Sphinx?", a: ["Helm of the Juggernaut", "Jugg"] },
  { q: "How many Towers are there in a Pentaract?", a: ["5", "Five"] },
  { q: "What class requires Level 20 on Priest and Wizard to unlock?", a: ["Necromancer", "Necro"] },
  { q: "What is the maximum level a player can reach?", a: ["20", "Twenty"] },
  { q: "What color star am I if i have 44 stars?", a: ["Orange"] },
  { q: "How much fame does a class need to achieve in order to obtain 4 stars for that class?", a: ["800"] },
  { q: "Carl and the Passions changed band name to what", a: ["Beach Boys"] },
  { q: "How many rings on the Olympic flag", a: ["Five"] },
  { q : "What colour is vermilion a shade of", a: ["Red"] },
  { q: "King Zog ruled which country", a: ["Albiana"] },
  { q: "What colour is Spock's blood", a: ["Green"] },
  { q: "Where in your body is your patella", a: ["Knee"] },
  { q: "Where can you find London bridge today", a: ["USA"] },
  { q: "What spirit is mixed with ginger beer in a Moscow mule", a: ["Vodka"] },
  { q: "Who was the first man in space ", a: ["Yuri Gagarin"] },
  { q: "What would you do with a Yashmak", a: ["Wear it"] },
  { q: "Who betrayed Jesus to the Romans ", a: ["Judas Escariot"] },
  { q: "Which animal lays eggs", a: ["Duck billed platypus"] },
  { q: "On television what was Flipper", a: ["Dolphin"] },
  { q: "Who's band was The Quarrymen", a: ["John Lenon"] },
  { q: "Which was the most successful Grand National horse", a: ["Red Rum"] },
  { q: "Who starred as the Six Million Dollar Man", a: ["Lee Majors"] },
  { q: "In the song Waltzing Matilda - What is a Jumbuck", a: ["Sheep"] },
  { q: "Who was Dan Dare's greatest enemy in the Eagle", a: ["Mekon"] },
  { q: "What is Dick Grayson better known as", a: ["Robin"] },
  { q: "What was given on the fourth day of Christmas", a: ["birds"] },
  { q: "What was Skippy ( on TV )", a: ["The bush kangaroo"] },
  { q: "What does a funambulist do", a: ["Tightrope walker"] },
  { q: "What is the name of Dennis the Menace's dog", a: ["Gnasher"] },
  { q: "What are bactrians and dromedaries", a: ["Camels"] },
  { q: "Who played The Fugitive ", a: ["David Jason"] },
  { q: "Who was the King of Swing", a: ["Benny Goodman"] },
  { q: "Who was the first man to fly across the channel", a: ["Louis Bleriot"] },
  { q: "Who starred as Rocky Balboa", a: ["Sylvester Stallone"] },
  { q: "In which war was the charge of the Light Brigade ", a: ["Crimean"] },
  { q: "Who invented the television", a: ["John Logie Baird"] },
  { q: "Who would use a mashie niblick", a: ["Golfer"] },
  { q: "In the song who killed Cock Robin", a: ["Sparrow"] },
  { q: "What do deciduous trees do", a: ["Lose their leaves in winter"] },
  { q: "In golf what name is given to the No 3 wood", a: ["Spoon"] },
  { q: "If you has caries who would you consult", a: ["Dentist"] },
  { q: "What other name is Mellor’s famously known by", a: ["Lady Chatterlys Lover"] },
  { q: "What did Jack Horner pull from his pie ", a: ["Plum"] },
  { q: "How many feet in a fathom ", a: ["Six"] },
  { q: "Which film had song Springtime for Hitler", a: ["The Producers"] },
  { q: "Name the legless fighter pilot of ww2", a: ["Douglas Bader"] },
  { q: "What was the name of inn in Treasure Island", a: ["Admiral Benbow"] },
  { q: "What was Erich Weiss better known as", a: ["Harry Houdini"] },
  { q: "Who sailed in the Nina - Pinta and Santa Maria", a: ["Christopher Columbus"] },
  { q: "Which leader died in St Helena ", a: ["Napoleon Bonaparte"] },
  { q: "Who wrote Gone with the Wind", a: ["Margaret Mitchell"] },
  { q: "What does ring a ring a roses refer to", a: ["The Black Death"] },
  { q: "Whose nose grew when he told a lie", a: ["Pinocchio"] },
  { q: "Who has won the most Oscars", a: ["Walt Disney"] },
  { q: "What would a Scotsman do with a spurtle", a: ["Eat porridge"] },
  { q: "Which award has the words for valour on it", a: ["Victoria Cross"] },
  { q: "On what day of the week did 9/11 happen?", a: ["Tuesday"] },
  { q: "How many characters are there in RotMG?", a: ["14",  "fourteen"] }

];
const options = {
  max: 1,
  time: 20000,
  errors: ["time"],
};

module.exports.run = async (bot, message, args) => {

  const item = quiz[Math.floor(Math.random() * quiz.length)];
  await message.channel.send(item.q);
  try {
    const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
    const winnerMessage = collected.first();
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                                 .setTitle(`Correct Answer: \`${winnerMessage.content}\``)
                                 .setFooter(`Question: ${item.q}`)
                                 .setColor(message.guild.me.displayHexColor)
                                })
  } catch (_) {
    return message.channel.send({embed: new Discord.RichEmbed()
                                 .setAuthor('No one got the answer in time!')
                                 .setTitle(`Correct Answer(s): \`${item.a}\``)
                                 .setFooter(`Question: ${item.q}`)
                                })
  }
}
module.exports.help = {
name: "quiz"
}
