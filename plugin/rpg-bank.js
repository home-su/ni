let handler = async (m, { vreden, isPremium, rpgdb, usersdb }) => {
  let user = usersdb[m.sender];
  let rpg = rpgdb[m.sender];
  const caption = `
⛊「 *B A N K  U S E R* 」
│ 📛 *Name:* ${user.daftar ? user.nama : vreden.getName(m.sender)}
│ 🏛️ *atm:* ${rpg.bank} 💲
│ 💹 *saldo:* ${user.saldo} 💲
│ 🌟 *Status:* ${isPremium ? "Premium" : "Free"}
│ 📑 *Registered:* ${user.daftar ? "Yes" : "No"}
╰──┈┈⭑
`.trim();
  await vreden.sendMessage(
    m.chat,
    {
      text: caption,
      contextInfo: {
        externalAdReply: {
          title: "BANK USER",
          body: "Info bank user bot",
          thumbnailUrl: "https://telegra.ph/file/8172419ad03cd5782f12d.jpg",
          sourceUrl: "",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
};
handler.help = ["bank"];
handler.tags = ["rpg"];
handler.command = ["bank"];

handler.register = false;
module.exports = handler;
