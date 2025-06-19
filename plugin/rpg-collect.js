let handler = async (m, { vreden, usersdb, rpgdb }) => {
  let __timers = new Date() - rpgdb[m.sender].lastclaim;
  let _timers = 43200000 - __timers;
  let timers = clockString(_timers);

  if (new Date() - rpgdb[m.sender].lastclaim > 43200000) {
    let rewardSaldo = await randomNomor(20000);
    let rewardLimit = await randomNomor(15);  

    usersdb[m.sender].saldo += rewardSaldo;
    usersdb[m.sender].limit += rewardLimit;
    rpgdb[m.sender].lastclaim = new Date() * 1;

    vreden.sendTextWithMentions(
      m.chat,
      `Kamu sudah mengklaim dan mendapatkan *${rewardSaldo}* 💵saldo dan *${rewardLimit}* 🎟️limit`,
      m
    );
  } else {
    vreden.sendTextWithMentions(
      m.chat,
      `Silakan tunggu *${timers}* lagi untuk bisa mengklaim lagi`,
      m
    );
  }
};
handler.help = ["collect"];
handler.tags = ["rpg"];
handler.command = ["collect"];
module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}

function randomNomor(min, max = null) {
	if (max !== null) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	} else {
		return Math.floor(Math.random() * min) + 1
	}
}