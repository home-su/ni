let handler = async (m, { vreden, text, rpgdb, usersdb }) => {
  let dapat = Math.floor(Math.random() * 5000);
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) return m.reply("Tag salah satu lah, yang kamu ingin berdagang bareng")
  if (typeof rpgdb[who] == "undefined") return m.reply("Pengguna tidak ada didalam data base")
  let __timers = new Date() - rpgdb[m.sender].lastdagang;
  let _timers = 28800000 - __timers;
  let timers = clockString(_timers);
  let username = vreden.getName(who);
  if (new Date() - rpgdb[m.sender].lastdagang > 28800000) {
    if (4999 > usersdb[who].saldo) return m.reply("Target tidak memiliki modal harap masukkan modal 5000")
    if (4999 > usersdb[m.sender].saldo) return m.reply("kamu tidak memiliki modal harap masukkan modal 5000")
    usersdb[who].saldo -= dapat * 1;
    usersdb[m.sender].saldo -= dapat * 1;
    rpgdb[m.sender].lastdagang = new Date() * 1;
    vreden.sendTextWithMentions(
      m.chat,
      `Mohon tunggu kak..\nKamu dan @${who.split`@`[0]} sedang berdagang.. 😅\n\nKamu dan @${who.split`@`[0]} meletakkan modal -${dapat} 😅`,
      m,
    );
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 3600000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 7200000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 10800000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 14400000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 18000000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 21600000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +5000\n${(usersdb[m.sender].saldo += 5000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${(usersdb[who].saldo += 5000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 25200000);
    setTimeout(() => {
      vreden.sendTextWithMentions(
        m.chat,
        `Selamat kamu dan @${who.split`@`[0]} mendapatkan saldo..\n\nPenghasilan dagang kamu didapatkan +10000\n${(usersdb[m.sender].saldo += 10000)} saldo kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +10000\n${(usersdb[who].saldo += 10000)} saldo @${who.split`@`[0]}`,
        m,
      );
    }, 28800000);
  } else
    vreden.sendTextWithMentions(m.chat, `Anda Sudah Berdagang , tunggu ${timers} lagi..`, m);
};
handler.help = ["berdagang"];
handler.tags = ["rpg"];
handler.command = ["berdagang"];
handler.limit = true;
handler.group = true;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
