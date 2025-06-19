let handler = async (m, { args, vreden, usersdb, prefix, command, rpgdb }) => {

  let user = usersdb[m.sender];

  let rpg = rpgdb[m.sender];

  let jumlah = args[0];

  if (!jumlah) return vreden.sendMessage(m.chat, { text: `Masukkan jumlah saldo yang ingin ditarik!\nContoh: ${prefix+command} 1000` }, { quoted: m });

  if (jumlah.toLowerCase() == "all") jumlah = rpg.bank;

  let tarik = parseInt(jumlah);

  if (isNaN(tarik)) return vreden.sendMessage(m.chat, { text: `Jumlah yang kamu masukkan tidak valid.` }, { quoted: m });

  if (tarik <= 0) return vreden.sendMessage(m.chat, { text: `Jumlah harus lebih dari 0.` }, { quoted: m });

  if (tarik > rpg.bank) return vreden.sendMessage(m.chat, { text: `Saldo bank kamu tidak cukup untuk menarik ${tarik} 💲.` }, { quoted: m });

  rpg.bank -= tarik;

  user.saldo += tarik;

  await vreden.sendMessage(m.chat, {

    text: `✅ *Berhasil menarik saldo!*\n\n💳 Bank: -${tarik} 💲\n💰 Saldo: +${tarik} 💲`,

  }, { quoted: m });

};

handler.help = ["withdraw <jumlah>|all"];

handler.tags = ["rpg"];

handler.command = ["withdraw", "wd"];

handler.register = false;

module.exports = handler;