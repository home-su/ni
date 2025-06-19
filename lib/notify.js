const fs = require('fs')
const chalk = require('chalk')
const { getBuffer } = require('./myfunc')
const {
	delay,
	proto,
	jidDecode,
	jidNormalizedUser,
	generateForwardMessageContent,
	generateWAMessageFromContent,
	downloadContentFromMessage,
} = require('@whiskeysockets/baileys')
const moment = require('moment-timezone')


module.exports.groupNotify = async (vreden, chats) => {
  try {
    const metadata = await vreden.groupMetadata(chats.id)
    const participants = chats.participants
    const groupName = metadata.subject
    const groupDesc = metadata.desc
    let setting = JSON.parse(fs.readFileSync('./setting.json'));
    for (let member of participants) {
      const fkontaku = {
        key: {
          participant: `0@s.whatsapp.net`,
          ...(chats.id ? {
            remoteJid: `status@broadcast`
          } : {})
        },
        message: {
          'contactMessage': {
            'displayName': ``,
            'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;,;;;\nFN:,\nitem1.TEL;waid=${member.split('@')[0]}:${member.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            'jpegThumbnail': setting.mediaPath.thumbnail,
            thumbnail: setting.mediaPath.thumbnail,
            sendEphemeral: true
          }
        }
      }
      try {
        pp_user = await vreden.profilePictureUrl(member, 'image')
      }
      catch {
        pp_user = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
      }
      try {
        ppgroup = await vreden.profilePictureUrl(chats.id, 'image')
      }
      catch {
        ppgroup = 'https://telegra.ph/file/c3f3d2c2548cbefef1604.jpg'
      }
      if (chats.action == 'add' && (global.db.data.chats[chats.id]?.welcome || setting.general.autoWelcome)) {
        var welcomeText = global.db.data.chats[chats.id].setwelcome || `*👋 Hello* @${member.split("@")[0]}\n\n*Selamat Datang Di*\n⏤͟͟͞͞✧ ${groupName}\n\n*Catatan:*\n_Baca Deskripsi Grupnya Yahh!_\n_Semoga Betah~~_`
        var replaceText = welcomeText.replace(/@user/gi, `@${member.split('@')[0]}`).replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc);
        var add = `https://api.vreden.my.id/api/notify?background=https://telegra.ph/file/588090b81788803c48717.jpg&title=Welcome&desk=semoga%20betah%20kak!!&avatar=${encodeURIComponent(pp_user)}`;
        if (setting.bots.welcomeType == "v1") {
        let button = [{
          "name": "quick_reply",
          "buttonParamsJson": `{\"display_text\":\"Welcome 👋\",\"id\":\".biji\"}`
        }]
        vreden.sendButtonImage(chats.id, {
          url: add
        }, button, replaceText, setting.bots.footer, fkontaku)
      } else if (setting.bots.welcomeType == "v2") {
      await vreden.sendMessage(chats.id, {
		text: replaceText,
			contextInfo: {
				mentionedJid: [member],
				forwardingScore: 9999,
				isForwarded: true,
				externalAdReply: {
					title: "Welcome 👋",
					body: 'Semoga betah ya kak',
					
					sourceUrl: "https://chat.whatsapp.com/G9VrJg9AXEkA5M2p4a4e6F"
					
				}
			}
		}, {
			quoted: fkontaku
		})
      } else if (setting.bots.welcomeType == "v3") {
        vreden.sendTextWithMentions(chats.id, replaceText, fkontaku)
      }
      } else if (chats.action == 'remove' && (global.db.data.chats[chats.id]?.goodbye || setting.general.autoLeave)) {
        var leftText = global.db.data.chats[chats.id].setleft || `*👋GoodBye* @${member.split("@")[0]}\n\n*Quote:*\n_Karena Setiap Pertemuan Akan Ada Perpisahan_`
        var replaceText = leftText.replace(/@user/gi, `@${member.split('@')[0]}`).replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc);
        var leftImage = `https://api.vreden.my.id/api/notify?background=https://telegra.ph/file/a9fd3df1d53b8b0f32068.jpg&title=Goodbye&desk=jangan%20balik%20lagi%20kak!!&avatar=${encodeURIComponent(pp_user)}`;
        if (setting.bots.welcomeType == "v1") {
        let button = [{
          "name": "quick_reply",
          "buttonParamsJson": `{\"display_text\":\"Byee👋\",\"id\":\".biji\"}`
        }]
        vreden.sendButtonImage(chats.id, {
          url: leftImage
        }, button, replaceText, setting.bots.footer, fkontaku);
        } else if (setting.bots.welcomeType == "v2") {
      await vreden.sendMessage(chats.id, {
		text: replaceText,
			contextInfo: {
				mentionedJid: [member],
				forwardingScore: 9999,
				isForwarded: true,
				externalAdReply: {
					title: "Byee 👋",
					body: 'Gak usah balik lagi yak',
					
					sourceUrl: "https://chat.whatsapp.com/G9VrJg9AXEkA5M2p4a4e6F"
					
				}
			}
		}, {
			quoted: fkontaku
		})
      } else if (setting.bots.welcomeType == "v3") {
        vreden.sendTextWithMentions(chats.id, replaceText, fkontaku)
      }
      } else if (chats.action == 'promote') {
        var promote = await getBuffer(`https://telegra.ph/file/0f665e9f52aca8d9e13ca.jpg`)
        vreden.sendMessage(chats.id, {
          text: `*🎊 Selamat* @${member.split("@")[0]}, Kamu Menjadi Admin\n\n*Quote:*\n_Jadilah Pemimpin Yang Baek_`,
          contextInfo: {
            mentionedJid: [member],
            "externalAdReply": {
              "showAdAttribution": true,
              "containsAutoReply": true,
              "title": `Selamat Kak🥳`,
              "body": `${setting.owner.name}`,
              "previewType": "PHOTO",
              "thumbnailUrl": ``,
              "thumbnail": promote,
              "sourceUrl": `${setting.links.website}`
            }
          }
        }, {
          quoted: fkontaku
        })
      } else if (chats.action == 'demote') {
        var demote = await getBuffer(`https://telegra.ph/file/527667156421dbe4c8d04.jpg`)
        vreden.sendMessage(chats.id, {
          text: `*😞 Yang Sabar* @${member.split("@")[0]}, Kamu Menjadi Orang Biasa\n\n*Quote:*\n_Hidup Itu Seperti Roda Kadang Diatas, Kadang Dibawah_`,
          contextInfo: {
            mentionedJid: [member],
            "externalAdReply": {
              "showAdAttribution": true,
              "containsAutoReply": true,
              "title": `Yang Sabar Ya Boss🎭`,
              "body": `${setting.owner.name}`,
              "previewType": "PHOTO",
              "thumbnailUrl": ``,
              "thumbnail": demote,
              "sourceUrl": `${setting.links.website}`
            }
          }
        }, {
          quoted: fkontaku
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
}
	
module.exports.deleteNotify = async (vreden, chats) => {
  let setting = JSON.parse(fs.readFileSync('./setting.json'));
  if (setting.general.antiDelete) {
    try {
      const dataChat = global.dbc
      const mess = dataChat.find((a) => a.id == chats.id);
      const mek = mess.m;
      const participant = mek.key.remoteJid.endsWith("@g.us") ? mek.key.participant : mek.key.remoteJid;
      const froms = mek.key.remoteJid;
      await vreden.sendMessage(
        froms, {
          text: `*</> ANTI DELETE </>*

*Message* :
- *Name* : ${mek.pushName}
- *User* : @${mek.sender.split("@")[0]}
- *Clock* : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')} WIB 
- *MessageType* : ${mek.mtype}

_*⬇️PESAN YANG DIHAPUS⬇️*_
    `,
          mentions: [participant],
        }, {
          quoted: mek
        }
      );
      await vreden.copyNForward(froms, mek, true);
      await delay(4000)
      let messek = dataChat.find((a) => a.id == chats.id);
      for (let [i, te] of dataChat.entries()) {
        if (te.id === chats.id) {
          dataChat.splice(i, 1);
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})