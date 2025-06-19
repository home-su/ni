let fs = require("fs");
let handler = async (m, { vreden, usersdb, rpgdb, pangkat }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  let name = vreden.getName(m.sender);
  let anu;
  if (usersdb[who]) {
    anu = `
🏦 Bank *${rpgdb[who].bank}*
⭐ Role : *${pangkat(who).rank}*\n\n
*${usersdb[who].exp}* Exp ✨
*${usersdb[who].limit}* Limit 📊
*${usersdb[who].saldo}* Money 💵`;
  } else {
    anu = `User tidak ditemukan`;
  }
  await vreden.sendMessage(
    m.chat,
    {
      text: anu,
      contextInfo: {
        externalAdReply: {
          title: "ISI DOMPET 🌝",
          body: "info Dompet User Bot",
          thumbnailUrl: "https://telegra.ph/file/bb562cfd966da4ed5b81a.jpg",
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};

handler.help = ["my", "dompet"];
handler.tags = ["rpg"];
handler.command = ["dompet", "my"];

module.exports = handler;
