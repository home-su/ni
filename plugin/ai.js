const { fetchJson } = require("../lib/myfunc")

let handler = async (m, { vreden, text, usersdb, prefix, command }) => {
			try {
				if (usersdb[m.sender].limit < 1) return warning(`Limit pemakaian tercapai, chat pemilik bot agar mendapatkan limit kembali\n\n${ownnomor}`)
				if (!text) return m.reply('Iyaa kenafaa?')
				let result = await fetchJson(`https://api.vreden.my.id/api/simi?query=${encodeURIComponent(text)}&lang=id`)
				const gpt = result.result
				m.sendForward(gpt)
			} catch (err) {
				console.log(err)
				m.reply('Terjadi Kesalahan')
			}
}
handler.command = ["oi"];
handler.tags = ["ai"];
handler.help = ["oi"].map((a) => a + " *text*");
module.exports = handler