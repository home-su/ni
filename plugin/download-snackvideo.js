const cheerio = require("cheerio")
const fetch = require("node-fetch")

let handler = async (m, { vreden, prefix, command, text }) => {
  if (!text) return m.reply('Masukan snackvideo link.')
  await vreden.sendMessage(m.chat, {
					react: {
						text: "⏱️",
						key: m.key,
					}
				})
  let res = await snack(text) 
  let capt = `*SnackVideo Down💫*\n\nUsername : ${res.author}\nLike : ${res.like}\nComment : ${res.comment}\nShare : ${res.share}`
  await vreden.sendFile(m.chat, res.media, '', capt, m)
}

handler.help = ['snackvideo [url]']
handler.tags = ['downloader']
handler.command = ["snackvideodl","snackvideodownload"]
module.exports = handler;

async function snack(url) {
  const res = await fetch(url)
  const body = await res.text()
  const $ = cheerio.load(body)
  const video = $("div.video-box").find("a-video-player")
  const author = $("div.author-info")
  const attr = $("div.action")
  
  const data = {
    title: $(author).find("div.author-desc > span").children("span").eq(0).text().trim(),
    thumbnail: $(video).parent().siblings("div.background-mask").children("img").attr("src"),
    media: $(video).attr("src"),
    author: $("div.author-name").text().trim(),
    authorImage: $(attr).find("div.avatar > img").attr("src"),
    like: $(attr).find("div.common").eq(0).text().trim(),
    comment: $(attr).find("div.common").eq(1).text().trim(),
    share: $(attr).find("div.common").eq(2).text().trim(),
  }
  return data
}