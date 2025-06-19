const ms = require('ms');

//━━━━━━━━━━━━━━━[ PREMIUM ]━━━━━━━━━━━━━━━━━//
function addPrem(usersDatabase, idchat, duration) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  const durationInMillis = ms(duration);
  if (!durationInMillis) {
    return 'Format durasi tidak valid.';
  }

  const now = Date.now();
  usersDatabase[idchat].premiumExpiry = now + durationInMillis;
  return `*</> VIP USER REGIS </>*

*Subscribe Info* :
- User : @${idchat.split("@")[0]}
- Expired : ${duration.toUpperCase()}
- Tempo :
${new Date(usersDatabase[idchat].premiumExpiry).toLocaleString()}

*Benefit Info* :
- Download : 90MB++
- Limit : Unlimited
- Request : 10/s
- VIP Access : Yes
- User Priority : Yes
`
}

function delPrem(usersDatabase, idchat) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  delete usersDatabase[idchat].premiumExpiry;
  return `Premium telah dihapus.`;
}

function checkPremiumStatus(usersDatabase, vreden) {
  setInterval(() => {
  const now = Date.now();
  for (const id in usersDatabase) {
    if (usersDatabase[id].premiumExpiry && usersDatabase[id].premiumExpiry < now) {
      let teks = `*</> VIP EXPIRED </>*

*Makaseh udah beli*

*Benefit Regular* :
- Download : 30MB
- Limit : 100
- Request : 1/5s
- VIP Access : No
- User Priority : No
`;
      const contentText = {
        text: teks,
        contextInfo: {
          mentionedJid: vreden.ments(teks),
          externalAdReply: {
            title: `VIP EXPIRED 💳`,
            previewType: "PHOTO",
            thumbnailUrl: `https://pomf2.lain.la/f/lswq2r83.jpg`,
            sourceUrl: "-"
          }
        }
      };
      vreden.sendMessage(id, contentText);
      console.log(`Notifikasi: Premium untuk ${id} telah habis.`);
      delete usersDatabase[id].premiumExpiry;
    }
  }
  }, 1000)
}

function isPremium(usersDatabase, idchat) {
  const now = Date.now();
  return usersDatabase[idchat] && usersDatabase[idchat].premiumExpiry && usersDatabase[idchat].premiumExpiry > now;
}

function listPremium(users) {
    const currentTime = Date.now();
    const premiumUsers = [];

    for (const user in users) {
        if (users[user].premiumExpiry > currentTime) {
            premiumUsers.push(user);
        }
    }

    return premiumUsers;
}
//━━━━━━━━━━━━━━━[ SEWA ]━━━━━━━━━━━━━━━━━//
function addSewa(usersDatabase, idchat, duration) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  const durationInMillis = ms(duration);
  if (!durationInMillis) {
    return 'Format durasi tidak valid.';
  }

  const now = Date.now();
  usersDatabase[idchat].sewaExpiry = now + durationInMillis;
  return `*</> SEWA BOT INFO </>*

*Subscribe Info* :
- Grup : ${idchat.split("@")[0]}
- Expired : ${duration.toUpperCase()}
- Tempo :
${new Date(usersDatabase[idchat].sewaExpiry).toLocaleString()}

*Benefit Info* :
- Feature : 1300++
- Management : Yes 
- Request : 1/5s
- VIP Access : No
- Grup Priority : Yes
- Protection : Yes
`
}

function delSewa(usersDatabase, idchat) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  delete usersDatabase[idchat].sewaExpiry;
  return `Sewa telah dihapus.`;
}

function checkSewaStatus(usersDatabase, vreden) {
  setInterval(() => {
  const now = Date.now();
  for (const id in usersDatabase) {
    if (usersDatabase[id].sewaExpiry && usersDatabase[id].sewaExpiry < now) {
      let teks = `*</> SEWA EXPIRED </>*

*Sewa expired, bot otomatis keluar!*
_bayy member tercintahh_
`;
      const contentText = {
        text: teks,
        contextInfo: {
          mentionedJid: vreden.ments(teks),
          externalAdReply: {
            title: `SEWA EXPIRED 💫`,
            previewType: "PHOTO",
            thumbnailUrl: `https://pomf2.lain.la/f/lswq2r83.jpg`,
            sourceUrl: "-"
          }
        }
      };
      vreden.sendMessage(id, contentText);
      console.log(`Notifikasi: Sewa untuk ${id} telah habis.`);
      delete usersDatabase[id].sewaExpiry;
      vreden.groupLeave(id)
    }
  }
  }, 1000)
}

function isSewa(usersDatabase, idchat) {
  const now = Date.now();
  return usersDatabase[idchat] && usersDatabase[idchat].sewaExpiry && usersDatabase[idchat].sewaExpiry > now;
}

function listSewa(users) {
    const currentTime = Date.now();
    const sewaUsers = [];

    for (const user in users) {
        if (users[user].sewaExpiry > currentTime) {
            sewaUsers.push(user);
        }
    }

    return sewaUsers;
}

//━━━━━━━━━━━━━━━[ KLAIM MINGGUAN ]━━━━━━━━━━━━━━━━━//
function addMingguan(usersDatabase, idchat, duration) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  const durationInMillis = ms(duration);
  if (!durationInMillis) {
    return 'Format durasi tidak valid.';
  }

  const now = Date.now();
  usersDatabase[idchat].mingguanExpiry = now + durationInMillis;
  return `Klaim mingguan telah ditambahkan hingga ${new Date(usersDatabase[idchat].mingguanExpiry).toLocaleString()}.`;
}

function delMingguan(usersDatabase, idchat) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  delete usersDatabase[idchat].mingguanExpiry;
  return `Klaim mingguan telah dihapus.`;
}

function checkMingguanStatus(usersDatabase, vreden) {
  setInterval(() => {
  const now = Date.now();
  for (const id in usersDatabase) {
    if (usersDatabase[id].mingguanExpiry && usersDatabase[id].mingguanExpiry < now) {
      console.log(`Notifikasi: Klaim mingguan untuk ${id} telah habis.`);
      delete usersDatabase[id].mingguanExpiry;
    }
  }
  }, 1000)
}

function isMingguan(usersDatabase, idchat) {
  const now = Date.now();
  return usersDatabase[idchat] && usersDatabase[idchat].mingguanExpiry && usersDatabase[idchat].mingguanExpiry > now;
}

function listMingguan(users) {
    const currentTime = Date.now();
    const mingguanUsers = [];

    for (const user in users) {
        if (users[user].mingguanExpiry > currentTime) {
            mingguanUsers.push(user);
        }
    }

    return mingguanUsers;
}
//━━━━━━━━━━━━━━━[ KLAIM BULANAN ]━━━━━━━━━━━━━━━━━//

function addBulanan(usersDatabase, idchat, duration) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  const durationInMillis = ms(duration);
  if (!durationInMillis) {
    return 'Format durasi tidak valid.';
  }

  const now = Date.now();
  usersDatabase[idchat].bulananExpiry = now + durationInMillis;
  return `Klaim bulanan telah ditambahkan hingga ${new Date(usersDatabase[idchat].bulananExpiry).toLocaleString()}.`;
}

function delBulanan(usersDatabase, idchat) {
  if (!usersDatabase[idchat]) {
    return 'User tidak ditemukan.';
  }

  delete usersDatabase[idchat].bulananExpiry;
  return `Klaim bulanan telah dihapus.`;
}

function checkBulananStatus(usersDatabase, vreden) {
  setInterval(() => {
  const now = Date.now();
  for (const id in usersDatabase) {
    if (usersDatabase[id].bulananExpiry && usersDatabase[id].bulananExpiry < now) {
      console.log(`Notifikasi: Klaim bulanan untuk ${id} telah habis.`);
      delete usersDatabase[id].bulananExpiry;
    }
  }
  }, 1000)
}

function isBulanan(usersDatabase, idchat) {
  const now = Date.now();
  return usersDatabase[idchat] && usersDatabase[idchat].bulananExpiry && usersDatabase[idchat].bulananExpiry > now;
}

function listBulanan(users) {
    const currentTime = Date.now();
    const bulananUsers = [];

    for (const user in users) {
        if (users[user].bulananExpiry > currentTime) {
            bulananUsers.push(user);
        }
    }

    return bulananUsers;
}

//━━━━━━━━━━━━━━━[ KLAIM BULANAN ]━━━━━━━━━━━━━━━━━//

function addBanned(usersDatabase, idchat, duration) {
  if (!usersDatabase[idchat]) return 'User tidak ditemukan.';

  const durationInMillis = ms(duration);
  if (!durationInMillis) return 'Format durasi tidak valid.';

  const now = Date.now();
  usersDatabase[idchat].bannedUntil = now + durationInMillis;

  return `*</> BANNED USER </>*

*Banned Info* :
- User : @${idchat.split("@")[0]}
- Expired : ${duration.toUpperCase()}
- Tempo :
${new Date(usersDatabase[idchat].bannedUntil).toLocaleString()}

*Status* :
- Akses : Ditolak
- Lama : ${duration}
- Aktif : Ya
`;
}
function delBanned(usersDatabase, idchat) {
  if (!usersDatabase[idchat]) return 'User tidak ditemukan.';
  delete usersDatabase[idchat].bannedUntil;
  return `✅ User @${idchat.split("@")[0]} sudah tidak dibanned.`;
}
function checkBannedStatus(usersDatabase, vreden) {
  setInterval(() => {
    const now = Date.now();
    for (const id in usersDatabase) {
      if (usersDatabase[id].bannedUntil && usersDatabase[id].bannedUntil < now) {
        vreden.sendMessage(id, {
          text: `✅ Kamu sudah bebas dari kepolisian dan bebas dari banned.`,
          contextInfo: {
            mentionedJid: [id],
            externalAdReply: {
              title: `UNBANNED ✅`,
              previewType: "PHOTO",
              thumbnailUrl: `https://pomf2.lain.la/f/p2v1v0pm.jpg`,
              sourceUrl: "-"
            }
          }
        });
        console.log(`Notifikasi: Banned untuk ${id} telah berakhir.`);
        delete usersDatabase[id].bannedUntil;
      }
    }
  }, 1000);
}
function isBanned(usersDatabase, idchat) {
  const now = Date.now();
  return usersDatabase[idchat]?.bannedUntil > now;
}
function listBanned(usersDatabase) {
  const now = Date.now();
  return Object.keys(usersDatabase).filter(id =>
    usersDatabase[id].bannedUntil > now
  );
}
function addProtection(usersdb, idchat, duration) {
  if (!usersdb[idchat]) return 'User tidak ditemukan.';

  const durationInMillis = ms(duration);
  if (!durationInMillis) return 'Format durasi tidak valid.';

  const now = Date.now();
  usersdb[idchat].protectionUntil = now + durationInMillis;

  return `🛡️ *Pengaman Aktif*

- User : @${idchat.split("@")[0]}
- Durasi : ${duration.toUpperCase()}
- Berakhir : ${new Date(usersdb[idchat].protectionUntil).toLocaleString()}
- Status : Aktif`;
}
function isProtected(usersdb, idchat) {
  const now = Date.now();
  return usersdb[idchat]?.protectionUntil > now;
}
function checkProtectionStatus(usersdb, vreden) {
  setInterval(() => {
    const now = Date.now();
    for (const id in usersdb) {
      if (usersdb[id].protectionUntil && usersdb[id].protectionUntil < now) {
        const msg = `🛡️ *Pengaman kamu telah habis.*\nSekarang kamu bisa dirampok!`;
        vreden.sendMessage(id, { text: msg });
        delete usersdb[id].protectionUntil;
      }
    }
  }, 1000);
}
module.exports = {
    addPrem,
    delPrem,
    checkPremiumStatus,
    isPremium,
    listPremium,
    addSewa,
    delSewa,
    checkSewaStatus,
    isSewa,
    listSewa,
    addMingguan,
    delMingguan,
    checkMingguanStatus,
    isMingguan,
    listMingguan,
    addBulanan,
    delBulanan,
    checkBulananStatus,
    isBulanan,
    listBulanan,
    checkBannedStatus,
    delBanned,
    addBanned,
    listBanned,
    isBanned,
    checkProtectionStatus,
    isProtected,
    addProtection
}