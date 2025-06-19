const fs = require('fs')
const axios = require("axios");
const FormData = require("form-data");
const cheerio = require("cheerio");
const Jimp = require("jimp");
const {
	fromBuffer
} = require('file-type')
const {
	sizeFormatter
} = require('human-readable')
const moment = require('moment-timezone')
const date = moment.tz('Asia/Jakarta').format(`DD MMM yyyy`)
let setting = JSON.parse(fs.readFileSync('./setting.json'));

const formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})

async function twiterdl(id) {
	try {
		const url = 'https://ssstwitter.com';
		const response = await axios.get(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36'
			}
		});

		const $ = cheerio.load(response.data);
		const form = $('form.pure-form.pure-g.hide-after-request');
		const includeVals = form.attr('include-vals');
		const ttMatch = includeVals.match(/tt:'([^']+)'/);
		const tsMatch = includeVals.match(/ts:(\d+)/);

		if (!ttMatch || !tsMatch) throw new Error('Cannot find tt or ts values.');

		const tt = ttMatch[1];
		const ts = tsMatch[1];

		const postData = new URLSearchParams({
			tt: tt,
			ts: ts,
			source: 'form',
			id: id,
			locale: 'en'
		});

		const postResponse = await axios.post(url, postData.toString(), {
			headers: {
				'HX-Request': 'true',
				'HX-Target': 'target',
				'HX-Current-URL': 'https://ssstwitter.com/en',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
				'Referer': 'https://ssstwitter.com/result_normal'
			}
		});

		const $result = cheerio.load(postResponse.data);
		const downloads = [];
		$result('.result_overlay a.download_link').each((i, element) => {
			const text = $(element).text().trim();
			const url = $(element).attr('href');
			if (url) {
				downloads.push({
					text,
					url
				});
			}
		});

		const data = {
			title: $result('.result_overlay h2').text().trim(),
			downloads: downloads
		};

		return {
			status: true,
			data
		};
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function mediafireDl(url) {
	try {
		const res = await fetch("https://translate.google.com/website?sl=id&tl=de&hl=id&client=webapp&u=" + url);
		const $ = cheerio.load(await res.text());
		const link = $('a#downloadButton').attr('href');
		const [nama, mime, size] = [
			link.split('/').pop().trim(),
			link.split('.').pop().trim(),
			$('a#downloadButton').text().replace(/Download|\(|\)|\n|\s+/g, '').trim()
		];
		const sizeB = parseFloat(size) * (/MB$/.test(size) ? 1000 : 1)
		return [{
			nama,
			mime,
			size,
			sizeB,
			link
		}];
	} catch (error) {
		console.error(error);
		throw new Error("Error Gan");
	}
}

async function stickerSearch(querry) {
	const link = await axios.get(`https://getstickerpack.com/stickers?query=${querry}`);
	const $ = cheerio.load(link.data)
	let sticker1 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(1) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(1) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(1) > a > div > span.username').text().trim()
	}
	let sticker2 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(2) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(2) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(2) > a > div > span.username').text().trim()
	}
	let sticker3 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(3) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(3) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(3) > a > div > span.username').text().trim()
	}
	let sticker4 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(4) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(4) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(4) > a > div > span.username').text().trim()
	}
	let sticker5 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(5) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(5) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(5) > a > div > span.username').text().trim()
	}
	let sticker6 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(6) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(6) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(6) > a > div > span.username').text().trim()
	}
	let sticker7 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(7) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(7) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(7) > a > div > span.username').text().trim()
	}
	let sticker8 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(8) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(8) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(8) > a > div > span.username').text().trim()
	}
	let sticker9 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(9) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(9) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(9) > a > div > span.username').text().trim()
	}
	let sticker10 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(10) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(10) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(10) > a > div > span.username').text().trim()
	}
	let sticker11 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(11) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(11) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(11) > a > div > span.username').text().trim()
	}
	let sticker12 = {
		sticker: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(12) > a > div > img').attr('src'),
		nama: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(12) > a > div > span.title').text().trim(),
		creator: $('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(12) > a > div > span.username').text().trim()
	}
	let stickerlop = [
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(1) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(2) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(3) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(4) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(5) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(6) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(7) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(8) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(9) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(10) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(11) > a > div > img').attr('src'),
		$('#stickerPacks').find('div > div:nth-child(3) > div:nth-child(12) > a > div > img').attr('src')
	]
	let data = {
		sticker: stickerlop,
		sticker1,
		sticker2,
		sticker3,
		sticker4,
		sticker5,
		sticker6,
		sticker7,
		sticker8,
		sticker9,
		sticker10,
		sticker11,
		sticker12
	}
	return data
}

async function snapsave(vid_url) {
	try {
		const data = {
			url: vid_url
		};
		const searchParams = new URLSearchParams();
		searchParams.append('url', data.url);
		const response = await fetch('https://facebook-video-downloader.fly.dev/app/main.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: searchParams.toString(),
		});
		const responseData = await response.json();
		return responseData;
	} catch (e) {
		return null;
	}
}

async function text2img(prompt) {
	const nganuApi = "https://ai-api.magicstudio.com/api/ai-art-generator";

	const body = `prompt=${encodeURIComponent(prompt)}`;

	try {
		const nganu = await fetch(nganuApi, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		});

		if (nganu.ok) {
			const imageBuffer = await nganu.buffer();
			return imageBuffer;
		} else {
			const nganuError = await nganu.text();
			throw new Error(`Gagal mengambil gambar. Kode status: ${nganu.status}, Error: ${nganuError}`);
		}
	} catch (error) {
		throw error;
	}
}

async function snapsavev2(url) {
	try {
		const {
			data
		} = await axios("https://fdownloader.net/id", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
			},
			data: new URLSearchParams(
				Object.entries({
					recaptchaToken: "",
					q: url,
					t: "media",
					lang: "en",
				})
			),
		});
		const $ = cheerio.load(data);
		const script = $("body").find("script").text().trim();
		const k_token = script.split("k_token = ")[1].split(";")[0];
		const k_exp = script.split("k_exp = ")[1].split(";")[0];
		const {
			data: apiData
		} = await axios("https://v3.fdownloader.net/api/ajaxSearch?lang=en", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
			},
			data: new URLSearchParams(
				Object.entries({
					k_exp,
					k_token,
					q: url,
					lang: "en",
					web: "fdownloader.net",
					v: "v2",
					w: "",
				})
			),
		});
		const $api = cheerio.load(apiData.data);
		const result = [];
		const duration = $api('div.clearfix > p').text().trim();
		$api('div.tab__content')
			.find('tbody > tr')
			.each((index, element) => {
				const quality = $api(element).find('td.video-quality').text();
				const videoUrl = $api(element).find('td > a').attr('href');
				if (quality && videoUrl) {
					result.push({
						quality,
						url: videoUrl,
					});
				}
			});
		return {
			duration,
			result,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function youtubedlv2(url) {
	const response = await fetch('https://yt5s.com/en32', {
		method: 'GET',
		headers: {
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
			cookie: '__cflb=04dToSoFRg9oqH9pYF2En9gKJK4fe8D9TcYtUD6tYu; _ga=GA1.2.1350132744.1641709803; _gid=GA1.2.1492233267.1641709803; _gat_gtag_UA_122831834_4=1',
		}
	});
	const html = await response.text();
	const urlAjax = (/k_url_search="(.*?)"/.exec(html) || ['', ''])[1];
	const urlConvert = (/k_url_convert="(.*?)"/.exec(html) || ['', ''])[1];
	const params = {
		q: url,
		vt: 'home'
	};
	const ajaxResponse = await fetch(urlAjax, {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'origin': 'https://yt5s.com',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
			'cookie': '__cflb=04dToSoFRg9oqH9pYF2En9gKJK4fe8D9TcYtUD6tYu; _ga=GA1.2.1350132744.1641709803; _gid=GA1.2.1492233267.1641709803; _gat_gtag_UA_122831834_4=1',
		},
		body: new URLSearchParams(Object.entries(params))
	});
	const json = await ajaxResponse.json();
	if (!json.links) return {
		status: false,
		statusText: json.mess,
	}
	const video = {}; // slice -5 to limit quality max 720p
	((Object.values(json.links.mp4)).slice(-5)).forEach(({
		k,
		size
	}) => {
		video[k] = {
			quality: k,
			fileSizeH: size,
			fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
			download: convertv2.bind(null, urlConvert, json.vid, 'mp4', k, json.token, parseInt(json.timeExpires), json.fn)
		};
	});
	const audio = {};
	Object.values(json.links.mp3).forEach(({
		key,
		size
	}) => {
		audio[key] = {
			quality: key,
			fileSizeH: size,
			fileSize: parseFloat(size) * (/MB$/.test(size) ? 1000 : 1),
			download: convertv2.bind(null, urlConvert, json.vid, 'mp3', key.replace(/kbps/i, ''), json.token, parseInt(json.timeExpires), json.fn)
		};
	});
	const res = {
		status: true,
		statusText: json.mess,
		id: json.vid,
		title: json.title,
		thumbnail: `https://i.ytimg.com/vi/${json.vid}/0.jpg`,
		video,
		audio
	};
	return res;
}

async function convertv2(url, v_id, ftype, fquality, token, timeExpire, fname) {
	try {
		const params = {
			v_id,
			ftype,
			fquality,
			token,
			timeExpire,
			client: 'yt5s.com'
		};

		const resServer = await fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				origin: 'https://yt5s.com',
				referer: 'https://yt5s.com/',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
				'X-Requested-Key': 'de0cfuirtgf67a'
			},
			body: new URLSearchParams(params)
		});

		const resServerJson = await resServer.json();
		const server = resServerJson.c_server;

		if (!server && ftype === 'mp3') {
			return server || resServerJson.d_url || '';
		}

		const payload = {
			v_id,
			ftype,
			fquality,
			fname,
			token,
			timeExpire
		};

		const results = await fetch(`${server}/api/json/convert`, {
			method: 'POST',
			body: new URLSearchParams(payload)
		});

		const resultsJson = await results.json();
		if (resultsJson.statusCode === 200) {
			return resultsJson.result;
		} else {
			console.log(resultsJson);
		}
	} catch (error) {
		console.error(error);
	}
}

async function jadwalSholat(kode_daerah) {
	try {
		const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/daily.php?id=' + kode_daerah);
		const html = response.data;
		const $ = cheerio.load(html);
		let daerah = $('h1').text().trim();
		let bulan = $('h2').text().trim();
		const row = $('tr.table_light, tr.table_dark').find('td');
		const tanggal = $(row[0]).text().trim();
		const imsyak = $(row[1]).text().trim();
		const shubuh = $(row[2]).text().trim();
		const terbit = $(row[3]).text().trim();
		const dhuha = $(row[4]).text().trim();
		const dzuhur = $(row[5]).text().trim();
		const ashr = $(row[6]).text().trim();
		const maghrib = $(row[7]).text().trim();
		const isya = $(row[8]).text().trim();
		return {
			bulan,
			tanggal,
			imsyak,
			shubuh,
			terbit,
			dhuha,
			dzuhur,
			ashr,
			maghrib,
			isya
		};
	} catch (error) {
		console.error('Error scraping:', error);
		return {
			status: 'error',
			error: error.message
		};
	}
}

async function findKodeDaerah(nama_daerah) {
	try {
		const response = await axios.get('https://jadwalsholat.org/jadwal-sholat/monthly.php');
		const html = response.data;
		const $ = cheerio.load(html);
		const options = $('select[name="kota"] option');
		const kodeDaerah = {};
		options.each((index, element) => {
			const kode = $(element).attr('value');
			const nama = $(element).text().trim();
			kodeDaerah[nama.toLowerCase()] = kode;
		});
		const lowercaseRegion = nama_daerah.toLowerCase();
		if (kodeDaerah.hasOwnProperty(lowercaseRegion)) {
			return {
				status: 'ok',
				creator: 'SatganzDevs',
				kode_daerah: kodeDaerah[lowercaseRegion]
			};
		} else {
			return {
				status: 'error',
				message: 'Region not found'
			};
		}
	} catch (error) {
		console.error('Error scraping:', error);
		return {
			status: 'error',
			error: error.message
		};
	}
}

async function downloadCapcut(Url) {
	try {
		const token = Url.match(/\d+/)[0];
		const response = await fetch(`https://ssscapcut.com/api/download/${token}`, {
			method: "GET",
			headers: {
				"Accept": "/",
				"User-Agent": "Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36",
				"X-Requested-With": "acr.browser.barebones",
				"Sec-Fetch-Site": "same-origin",
				"Sec-Fetch-Mode": "cors",
				"Sec-Fetch-Dest": "empty",
				"Referer": "https://ssscapcut.com/",
				"Accept-Encoding": "gzip, deflate",
				"Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
				"Cookie": "sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515"
			}
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function searchTemplates(query) {
  try {
    const response = await axios.post(
      'https://edit-api-sg.capcut.com/lv/v1/cc_web/replicate/search_templates',
      {
        'sdk_version': '86.0.0',
        'count': 20,
        'cursor': '0',
        'enter_from': 'workspace',
        'query': query,
        'scene': 1,
        'search_version': 2,
        'cc_web_version': 0
      },
      {
        headers: {
          'loc': 'va',
          'lan': 'id-ID',
          'pf': '7',
          'appvr': '5.8.0',
          'sign-ver': '1',
          'app-sdk-version': '48.0.0',
          'sign': 'd262d8431000a3f4af3d6c7fd95e265e',
          'device-time': '1731548575',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
          'Referer': 'https://www.capcut.com/id-id/templates'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error occurred while fetching templates:', error);
    throw new Error('Failed to fetch templates');
  }
}

async function detailTemplates(link) {
	try {
		const response = await axios.get(link);
		const html = response.data
		const $ = cheerio.load(html);
		const elements = $("main#main div.ct-container-full article");

		return elements.map((index, element) => ({
			id: $(element).attr("id"),
			time: $("main#main").find("time.ct-meta-element-date").text().trim(),
			template: $(element).find(".wp-block-buttons .wp-block-button a").attr("data-template-id"),
			link: $(element).find("a.wp-block-button__link").attr("href"),
			imageSrc: $(element).find("video").attr("poster"),
			title: $(element).find("h2").text().trim(),
			videoSrc: $(element).find("video source").attr("src"),
			description: $(element).find(".entry-content p").text().trim()
		})).get();
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function GoogleImage(query) {
	const response = await fetch(`https://www.google.com/search?q=${query}&tbm=isch`, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
			'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
		},
	});

	const data = await response.text();

	const $ = cheerio.load(data);
	const pattern =
		/\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
	const matches = $.html().matchAll(pattern);
	const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
	return [...matches]
		.map(({
			groups
		}) => decodeUrl(groups?.url))
		.filter((v) => /.*\.jpe?g|png$/gi.test(v));
}

async function GDriveDl(url) {
	let id, res = {
		"error": true
	}
	if (!(url && url.match(/drive\.google/i))) return res
	try {
		id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
		if (!id) throw 'ID Not Found'
		res = await axios(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
			method: 'post',
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'content-length': 0,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'origin': 'https://drive.google.com',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true'
			}
		})
		let {
			fileName,
			sizeBytes,
			downloadUrl
		} = JSON.parse((await res.data).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return {
			downloadUrl,
			fileName,
			fileSize: formatSize(sizeBytes),
			mimetype: data.headers.get('content-type')
		}
	} catch (e) {
		console.log(e)
		return res
	}
}

async function capcutdl(url) {
	return new Promise(async (resolve, reject) => {
		axios
			.get("https://ssscap.net/api/download/get-url?url=" + url, {
				headers: {
					cookie: "sign=94b3b2331a3515b3a031f161e6ce27a7; device-time=1693144685653",
				},
			})
			.then((res) => {
				let tes = res.data.url;
				const parsedUrl = new URL(tes);
				let id = parsedUrl.searchParams.get("template_id");

				axios("https://ssscap.net/api/download/" + id, {
					headers: {
						cookie: "sign=4b0366645cd40cbe10af9aa18331a488; device-time=1693145535913",
					},
				}).then((yanz) => {
					resolve(yanz.data);
				});
			});
	});
};

async function scsearch(query) {
	let base = `https://m.soundcloud.com`;
	let res = await axios.get(`${base}/search?q=${encodeURIComponent(query)}`, {
		headers: {
			"User-Agent": "Mozilla/5.0 (compatible; evc-batch/2.0)"
		},
	});
	let $ = cheerio.load(res.data);
	let result = [];
	$("div > ul > li > div").each(function(a, b) {
		let title = $(b).find("a").attr("aria-label").trim();
		let link = base + $(b).find("a").attr("href").trim();
		let thumb = $(b)
			.find("a > div > div > div > picture > img")
			.attr("src")
			.trim();
		let artist = $(b).find("a > div > div > div").eq(1).text();
		let views = $(b).find("a > div > div > div > div > div").eq(0).text();
		let timestamp = $(b).find("a > div > div > div > div > div").eq(1).text();
		let release = $(b).find("a > div > div > div > div > div").eq(2).text();
		result.push({
			title,
			url: link,
			thumb,
			artist,
			views,
			release,
			timestamp
		});
	});
	return {
		status: res.status,
		creator: "vreden",
		result
	};
}

async function igdown(q) {
	try {
		const response = await axios.post(
			'https://igdown.app/api/ajaxSearch',
			`k_exp=1724325144&k_token=06b9efc03e25111e755086c03c3a77a5c1dc3a83b56a30ccbb083b08e016a96a&q=${q}&t=media&lang=id&v=v2`, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Accept': '*/*',
					'X-Requested-With': 'XMLHttpRequest',
					'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36',
					'Referer': 'https://igdown.app/id'
				}
			}
		);
		const html = response.data.data;
		const $ = cheerio.load(html);
		const results = [];

		// Proses setiap elemen <li> dalam <ul> dengan class 'download-box'
		$('.download-box li').each((index, element) => {
			const thumb = $(element).find('.download-items__btn').find('a').attr('href')
			const type = $(element).find('.download-items__btn').eq(1).find('a').attr('title') ? 'video' : 'image';
			const link = $(element).find('.download-items__btn').eq(1).find('a').attr('title') ? $(element).find('.download-items__btn').eq(1).find('a').attr('href') : $(element).find('.download-items__btn').find('a').attr('href');

			// Tentukan apakah ini video atau bukan berdasarkan title
			//const type = title.toLowerCase().includes('video') ? 'Video' : 'Thumbnail';

			// Masukkan hasil ke dalam objek
			const result = {
				url: link,
				thumb: thumb,
				type: type
			};

			// Tambahkan objek ke dalam array hasil
			results.push(result);
		});
		const result = {
			data: results
		};
		return result;
	} catch (error) {
		console.error("Error fetching Instagram media:", error);
		return {
			error: "Failed to fetch media"
		};
	}
}

async function convertAngka(number) {
	return number.toLocaleString('en-US', {
		maximumFractionDigits: 2,
		notation: 'compact',
		compactDisplay: 'short'
	});
}

async function CarbonifyV1(input) {
	let Blobs = await fetch("https://carbonara.solopov.dev/api/cook", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"code": input
			})
		})
		.then(response => response.blob())
	let arrayBuffer = await Blobs.arrayBuffer();
	let buffer = Buffer.from(arrayBuffer);
	return buffer
}

async function CarbonifyV2(input) {
	let Blobs = await fetch("https://carbon-api.vercel.app/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"code": input
			})
		})
		.then(response => response.blob())
	let arrayBuffer = await Blobs.arrayBuffer();
	let buffer = Buffer.from(arrayBuffer);
	return buffer
}

async function listModels() {
	try {
		const url = 'https://api.prodia.com/v1/sd/models';
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'X-Prodia-Key': 'dc80a8a4-0b98-4d54-b3e4-b7c797bc2527'
			}
		};

		const res = await fetch(url, options)
		const respon = await res.json()
		return respon
	} catch (error) {
		return error
	}
}

async function listSampler() {
	try {
		const url = 'https://api.prodia.com/v1/sd/samplers';
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'X-Prodia-Key': 'dc80a8a4-0b98-4d54-b3e4-b7c797bc2527'
			}
		};

		const res = await fetch(url, options)
		const respon = await res.json()
		return respon
	} catch (error) {
		return error
	}
}

async function getModels() {
	try {
		const response = await fetch('https://docs.prodia.com/reference/transform');
		const html = await response.text();
		const jsonRegex = /{&quot;[^{}]*}/g;
		const allJSON = html.match(jsonRegex)?.map(match => JSON.parse(match.replace(/&quot;/g, '"'))) || [];
		const data = allJSON.filter(obj => obj.enum !== undefined);
		return data;
	} catch (error) {
		throw new Error('Error fetching or filtering JSON:', error);
	}
}

async function transfrom(params) {
	try {
		const url = 'https://api.prodia.com/v1/sdxl/transform';
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				'X-Prodia-Key': 'dc80a8a4-0b98-4d54-b3e4-b7c797bc2527'
			},
			body: JSON.stringify(params)
		};

		const res = await fetch(url, options)
		const respon = await res.json()
		return respon
	} catch (error) {
		return error
	}
}

async function getJobs(id) {
	try {
		const url = 'https://api.prodia.com/v1/job/' + id
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'X-Prodia-Key': 'dc80a8a4-0b98-4d54-b3e4-b7c797bc2527'
			}
		};

		const res = await fetch(url, options)
		const respon = await res.json()
		return respon
	} catch (error) {
		return error
	}
}

async function faceSwap(params) {
	try {
		const url = 'https://api.prodia.com/v1/faceswap';
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				'X-Prodia-Key': 'dc80a8a4-0b98-4d54-b3e4-b7c797bc2527'
			},
			body: JSON.stringify(params)
		};

		const res = await fetch(url, options)
		const respon = await res.json()
		return respon
	} catch (error) {
		return error
	}
}

async function txt2img(params) {
	try {
		const url = 'https://api.prodia.com/v1/sd/generate';
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				'X-Prodia-Key': '5113d4e5-6574-4115-bdd0-e02b5d7cfb87'
			},
			body: JSON.stringify(params)
		};

		const res = await fetch(url, options)
		const respon = await res.json()
		return respon
	} catch (error) {
		return error
	}
}

async function GPTwordle(prompt) {
	try {
		const response = await fetch('https://wewordle.org/gptapi/v1/web/turbo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148',
			},
			body: JSON.stringify({
				messages: [{
						content: "kamu adalah asisten AI, Kamu menggunakan bahasa Indonesia, kamu bernama Qioo, kamu sangat ramah, menggunakan bahasa gaul, lebih tidak baku dan penuh emoji",
						role: "assistant"
					},
					{
						content: prompt,
						role: "user"
					}
				]
			}),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

async function QiooBotika(text, username) {
	const payload = {
		app: {
			id: "bcwjrfhsu2t1722301148379",
			time: Date.now(),
			data: {
				sender: {
					id: username
				},
				message: [{
					id: Date.now(),
					time: Date.now(),
					type: "text",
					value: text
				}]
			}
		}
	};

	const webhookUrl = 'https://webhook.botika.online/webhook/';
	const headers = {
		"Content-Type": "application/json",
		"Authorization": "Bearer s9561k-znra-c37c54x8qxao0vox-nwm9g4tnrm-dp3brfv8"
	};

	try {
		const {
			data,
			status
		} = await axios.post(webhookUrl, payload, {
			headers
		});

		if (status === 200) {
			if (data.app && data.app.data && data.app.data.message) {
				const responseMessages = data.app.data.message.map(message => message.value);
				let replyMessage = responseMessages.join('\n');

				if (/(<BR>|<br>)/i.test(replyMessage)) {
					replyMessage = replyMessage.replace(/<BR>|<br>/gi, '\n').replace(/```/g, '\n');
					return replyMessage.split('\n').map(message => `\n\n${message}\n`).join('');
				} else {
					return replyMessage;
				}
			}
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

async function searchSpotifyTracks(query) {
	const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
	const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
	const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

	const getToken = async () => {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			timeout: 60000, // 60 seconds
			body: new URLSearchParams({
				grant_type: 'client_credentials'
			}),
			headers: {
				Authorization: `Basic ${auth}`
			},
		});
		return (await response.json()).access_token;
	};

	const accessToken = await getToken();
	const offset = 10;
	const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
	const response = await fetch(searchUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
	});
	const data = await response.json();
	return data.tracks.items;
}

async function ephoto(url, texk) {
	let form = new FormData
	let gT = await axios.get(url, {
		headers: {
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
		}
	})
	let $ = cheerio.load(gT.data)
	let text = texk
	let token = $("input[name=token]").val()
	let build_server = $("input[name=build_server]").val()
	let build_server_id = $("input[name=build_server_id]").val()
	form.append("text[]", text)
	form.append("token", token)
	form.append("build_server", build_server)
	form.append("build_server_id", build_server_id)
	let res = await axios({
		url: url,
		method: "POST",
		data: form,
		headers: {
			Accept: "*/*",
			"Accept-Language": "en-US,en;q=0.9",
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
			cookie: gT.headers["set-cookie"]?.join("; "),
			...form.getHeaders()
		}
	})
	let $$ = cheerio.load(res.data)
	let json = JSON.parse($$("input[name=form_value_input]").val())
	json["text[]"] = json.text
	delete json.text
	let {
		data
	} = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
		headers: {
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
			cookie: gT.headers["set-cookie"].join("; ")
		}
	})
	return build_server + data.image
}

async function ssweb(url = "", full = false, type = "desktop") {
	type = type.toLowerCase();
	if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
	let form = new URLSearchParams();
	form.append("url", url);
	form.append("device", type);
	if (!!full) form.append("full", "on");
	form.append("cacheLimit", 0);
	let res = await axios({
		url: "https://www.screenshotmachine.com/capture.php",
		method: "post",
		data: form
	});
	let cookies = res.headers["set-cookie"];
	let buffer = await axios({
		url: "https://www.screenshotmachine.com/" + res.data.link,
		headers: {
			"cookie": cookies.join("")
		},
		responseType: "arraybuffer"
	});
	return Buffer.from(buffer.data);
}

function clean(string) {
	return string.replace(/{/g, '').replace(/}/g, '').replace(/"/g, '')
}

async function tiktokSearchVideo(query) {
	return new Promise(async (resolve, reject) => {
		axios("https://tikwm.com/api/feed/search", {
			headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://www.tikwm.com/'
            },
			data: {
				keywords: query,
				count: 12,
				cursor: 0,
				web: 1,
				hd: 1,
			},
			method: "POST",
		}).then((res) => {
			resolve(res.data.data);
		});
	});
}

async function jarak(dari, ke) {
	let html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
	let $ = cheerio.load(html),
		obj = {}
	let img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
	obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
	obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
	return obj
}
async function diff(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stablediffusionapi/lyrielv16", {
			headers: {
				Authorization: "Bearer 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"
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	)
	const result = await response.blob();
	let arrayBuffer = await result.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer, 'base64')
	return buffer
}
async function remini2(urlPath) {
	const data = new FormData();
	data.append('image_url', urlPath);
	data.append('scale', '2');

	const url = 'https://ai-picture-upscaler.p.rapidapi.com/upscaler/v2/';
	const options = {
		method: 'POST',
		headers: {
			'x-rapidapi-key': 'd9e028d85emshea6b0e8b786d07dp162e0bjsn6880ba6706ca',
			'x-rapidapi-host': 'ai-picture-upscaler.p.rapidapi.com',
			...data.getHeaders(),
		},
		body: data
	};
	try {
		const response = await fetch(url, options);
		const reslt = await response.text();
		const result = JSON.parse(reslt)
		return result
	} catch (error) {
		console.error(error);
	}
}
async function processing(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["enhance", "recolor", "dehaze"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit({
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function(err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function(chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	})
}

async function sdxlAnime(prompt) {
	try {
		return await new Promise(async (resolve, reject) => {
			if (!prompt) return reject("failed reading undefined prompt!");
			axios.post("https://aiimagegenerator.io/api/model/predict-peach", {
				prompt,
				negativePrompt: "nsfw, nude, uncensored, cleavage, nipples",
				key: "Soft-Anime",
				width: 512,
				height: 768,
				quantity: 1,
				size: "512x768"
			}).then(res => {
				const data = res.data;
				if (data.code !== 0) return reject(data.message);
				if (data.data.safetyState === "RISKY") return reject("nsfw image was generated, you try create other image again!")
				if (!data.data?.url) return reject("failed generating image!")
				return resolve({
					status: true,
					data: data.data
				})
			}).catch(reject)
		})
	} catch (e) {
		return {
			status: false,
			message: e
		}
	}
}

async function sdxlEmoji(prompt) {
	try {
		return await new Promise(async (resolve, reject) => {
			if (!prompt) return reject("failed reading undefined prompt!");
			axios.post("https://aiimagegenerator.io/api/model/predict-peach", {
				prompt,
				negativePrompt: "nsfw, nude, uncensored, cleavage, nipples",
				key: "3D-Emoji",
				width: 1024,
				height: 1024,
				quantity: 1,
				size: "512x768"
			}).then(res => {
				const data = res.data;
				if (data.code !== 0) return reject(data.message);
				if (data.data.safetyState === "RISKY") return reject("nsfw image was generated, you try create other image again!")
				if (!data.data?.url) return reject("failed generating image!")
				return resolve({
					status: true,
					data: data.data
				})
			}).catch(reject)
		})
	} catch (e) {
		return {
			status: false,
			message: e
		}
	}
}

async function sdxlWaifu(prompt) {
	try {
		return await new Promise(async (resolve, reject) => {
			if (!prompt) return reject("failed reading undefined prompt!");
			axios.post("https://aiimagegenerator.io/api/model/predict-peach", {
				prompt,
				negativePrompt: "nsfw, nude, uncensored, cleavage, nipples",
				key: "Waifu",
				width: 512,
				height: 768,
				quantity: 1,
				size: "512x768"
			}).then(res => {
				const data = res.data;
				if (data.code !== 0) return reject(data.message);
				if (data.data.safetyState === "RISKY") return reject("nsfw image was generated, you try create other image again!")
				if (!data.data?.url) return reject("failed generating image!")
				console.log(data)
				return resolve({
					status: true,
					data: data.data
				})
			}).catch(reject)
		})
	} catch (e) {
		return {
			status: false,
			message: e
		}
	}
}

async function Replicate(imageUrl, prompt, ApiKey) {
	try {
		// POST request to Replicate to start the image restoration generation process
		let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Token " + ApiKey,
			},
			body: JSON.stringify({
				version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
				input: {
					image: imageUrl,
					prompt: prompt
				},
			}),
		});
		let jsonStartResponse = await startResponse.json();
		console.log(jsonStartResponse)
		let endpointUrl = jsonStartResponse.urls.get;
		const originalImage = jsonStartResponse.input.image;
		const roomId = jsonStartResponse.id;

		// GET request to get the status of the image restoration process & return the result when it's ready
		let generatedImage;
		while (!generatedImage) {
			// Loop in 1s intervals until the alt text is ready
			let finalResponse = await fetch(endpointUrl, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Token " + ApiKey,
				},
			});
			let jsonFinalResponse = await finalResponse.json();
			if (jsonFinalResponse.status === "succeeded") {
				generatedImage = jsonFinalResponse.output[1];
			} else if (jsonFinalResponse.status === "failed") {
				break;
			} else {
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}
		if (generatedImage) {
			return {
				original: originalImage,
				generated: generatedImage,
				id: roomId
			};
		} else {
			console.log("Failed to restore image");
		}
	} catch (error) {
		// Log error message if something went wrong
		console.log("Failed to restore image", error);
	}
}

async function pasteGG(input) {
	try {
		const res = await fetch("https://api.paste.gg/v1/pastes", {
			method: "POST",
			body: JSON.stringify({
				files: [{
					content: {
						format: "text",
						value: input,
					},
				}],
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const json = await res.json();
		return `https://paste.gg/p/anonymous/${json.result.id}`;
	} catch (error) {
		console.error('Error:', error.message);
		// Handle errors as needed
	}
}

async function createPaste(title = '', content) {
	const data = new URLSearchParams({
		api_dev_key: "gCbnBvjHI9ZyjOw_yAR7WmgBrTHMvbzx",
		api_paste_name: title,
		api_paste_code: content,
		api_paste_format: "text",
		api_paste_expire_date: "N",
		api_option: "paste"
	});

	try {
		const response = await axios.post("https://pastebin.com/api/api_post.php", data, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		});

		const result = response.data;
		const rawUrl = result.replace(/^(https:\/\/pastebin\.com\/)([a-zA-Z0-9]+)$/, "$1raw/$2");
		if (result) {
			return {
				status: 0,
				original: result,
				raw: rawUrl
			};
		} else {
			return {
				status: 1,
				original: null,
				raw: null
			};
		}
	} catch (error) {
		console.error("Error:", error);
		return {
			status: 1,
			original: null,
			raw: null
		};
	}
}

async function spotifydl(url) {
	try {
		const response = await axios.get('https://spotifymate.com/en', {
			headers: {
				cookie: 'session_data=o8079end5j9oslm5a7bou84rqc;',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
			},
		});

		const $ = cheerio.load(response.data);
		const hiddenInput = $('form#get_video input[type="hidden"]');
		const formData = new FormData();
		formData.append('url', url);
		formData.append(hiddenInput.attr('name') || '', hiddenInput.attr('value') || '');

		const postResponse = await axios.post('https://spotifymate.com/action', formData, {
			headers: {
				origin: 'https://spotifymate.com/en',
				...formData.getHeaders(),
				cookie: 'session_data=o8079end5j9oslm5a7bou84rqc;',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
			},
		});

		if (postResponse.statusText !== 'OK') {
			return {
				status: false,
				msg: 'Fail Fetching.'
			};
		}

		const $post = cheerio.load(postResponse.data);
		const result = {
			title: $post('.dlvideos').find('h3[itemprop="name"]').text().trim(),
			author: $post('.dlvideos').find('.spotifymate-downloader-middle > p > span').text().trim(),
			thumb: $post('.dlvideos').find('img').attr('src') || '',
			music: $post('.dlvideos').find('.spotifymate-downloader-right #none').eq(0).find('a').attr('href') ||
				$post('.dlvideos').find('.spotifymate-downloader-right #pop').eq(0).find('a').attr('href') || ''
		};
		if (result.music === '') {
			return {
				status: false,
				msg: 'No results found.'
			};
		}
		return {
			status: true,
			result
		}
	} catch (e) {
		console.error(e)
		return {
			status: false,
			msg: e.message
		}
	}
}

async function checkBandwidth() {
	let ind = 0;
	let out = 0;
	for (let i of await require("node-os-utils").netstat.stats()) {
		ind += parseInt(i.inputBytes);
		out += parseInt(i.outputBytes);
	}
	return {
		download: formatSize(ind),
		upload: formatSize(out),
	};
}

async function upscale(buffer, size = 2, anime = false) {
	try {
		return await new Promise((resolve, reject) => {
			if (!buffer) return reject("undefined buffer input!");
			if (!Buffer.isBuffer(buffer)) return reject("invalid buffer input");
			if (!/(2|4|6|8|16)/.test(size.toString())) return reject("invalid upscale size!");

			Jimp.read(Buffer.from(buffer))
				.then(image => {
					const {
						width,
						height
					} = image.bitmap;
					let newWidth = width * size;
					let newHeight = height * size;
					const form = new FormData();
					form.append("name", "upscale-" + Date.now());
					form.append("imageName", "upscale-" + Date.now());
					form.append("desiredHeight", newHeight.toString());
					form.append("desiredWidth", newWidth.toString());
					form.append("outputFormat", "png");
					form.append("compressionLevel", "none");
					form.append("anime", anime.toString());
					form.append("image_file", buffer, {
						filename: "upscale-" + Date.now() + ".png",
						contentType: 'image/png',
					});
					axios.post("https://api.upscalepics.com/upscale-to-size", form, {
							headers: {
								...form.getHeaders(),
								origin: "https://upscalepics.com",
								referer: "https://upscalepics.com"
							}
						})
						.then(res => {
							const data = res.data;
							if (data.error) return reject("something error from upscaler api!");
							resolve(data.bgRemoved);
						})
						.catch(reject);
				})
				.catch(reject);
		});
	} catch (e) {
		return {
			status: false,
			message: e
		};
	}
}

async function upscalev2(imageBuffer, scale) {
  try {
    const { ext, mime } = await fromBuffer(imageBuffer) || { ext: 'jpg', mime: 'image/jpeg' };
    
    const blob = new Blob([imageBuffer], { type: mime });
    
    const data = new FormData();
    data.append('image', blob, `image.${ext}`);
    data.append('scale', String(scale));
    
    const response = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36${Date.now()}`,
        Referer: 'https://pixelcut.app/'
      }
    });
    
    const result = await response.json();
    
    return result.result_url;
  } catch (error) {
    console.error('Error during upscaling:', error);
    return null;
  }
}

async function upscalev3(imageBuffer) {
  try {
    const response = await fetch("https://lexica.qewertyy.dev/upscale", {
      body: JSON.stringify({
        image_data: Buffer.from(imageBuffer, "base64"),
        format: "binary"
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

async function upscalev4(imageBuffer) {
  try {
    const { ext, mime } = await fromBuffer(imageBuffer) || { ext: 'jpg', mime: 'image/jpeg' };

    const blob = new Blob([imageBuffer], { type: mime });

    const data = new FormData();
    data.append('image', blob, `image.${ext}`);

    const response = await fetch('https://pixgen.pro:8002/api/utils/upload_image', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36${Date.now()}`,
        Referer: 'https://pixgen.pro/'
      }
    });

    const result = await response.json();

    return result.image_url;
  } catch (error) {
    console.error('Error during image upload:', error);
    return null;
  }
}

async function cococlip(imageUrl) {
	const API_URL = "https://cococlip.ai/api/v1";
	const HEADERS = {
		"User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
		Referer: "https://cococlip.ai/features/image-to-prompt"
	};
	const TIMEOUT = 12e4;
	const POLL_INTERVAL = 2e3;
	try {
		const response1 = await fetch(`${API_URL}/imagetoprompt/imageclip?image=${encodeURIComponent(imageUrl)}`, {
			method: "GET",
			headers: HEADERS
		});
		const {
			id: promptId
		} = await response1.json();
		if (!promptId) throw new Error("Failed to retrieve promptId");
		const startTime = Date.now();
		while (Date.now() - startTime < TIMEOUT) {
			const response2 = await fetch(`${API_URL}/checkqueue?promptId=${promptId}`, {
				method: "GET",
				headers: HEADERS
			});
			const {
				nums
			} = await response2.json();
			if (nums === 0) {
				const response3 = await fetch(`${API_URL}/imagetoprompt/imageclippoll?promptId=${promptId}`, {
					method: "GET",
					headers: HEADERS
				});
				const {
					prompt
				} = await response3.json();
				if (prompt) return prompt;
			}
			await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
		}
		throw new Error("Polling timed out for final result");
	} catch (error) {
		console.error("Error in cococlip:", error);
		throw error;
	}
}

const uploadFileToGitHub = async (FILE_PATH, fileName) => {
	const GITHUB_TOKEN = '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';
	const REPO = 'database';
	const BRANCH = 'main';
	const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
	const url = `https://api.github.com/repos/Mr-mail/${REPO}/contents/${fileName}`;

	try {
		const getResponse = await axios.get(url, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
				'Content-Type': 'application/json',
			},
		});

		const sha = getResponse.data.sha;

		const updateData = {
			message: `Update ${fileName}`,
			content: Buffer.from(fileContent).toString('base64'),
			sha: sha,
			branch: BRANCH,
		};

		const response = await axios.put(url, updateData, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
				'Content-Type': 'application/json',
			},
		});

		return response.data
	} catch (error) {
		if (error.response && error.response.status === 404) {
			const createData = {
				message: `Add ${fileName}`,
				content: Buffer.from(fileContent).toString('base64'),
				branch: BRANCH,
			};

			const response = await axios.put(url, createData, {
				headers: {
					Authorization: `token ${GITHUB_TOKEN}`,
					'Content-Type': 'application/json',
				},
			});

			return response.data
		} else {
			console.error('Error:', error.response ? error.response.data : error.message);
			return "error gan :("
		}
	}
};

async function scrapKusonime(t) {
	return new Promise((i, e) => {
		const n = t;
		axios.get(`https://kusonime.com/?s=${n}&post_type=post`)
			.then(({
				data: t
			}) => {
				const e = cheerio.load(t);
				let n = [];
				e("div.content > h2 > a")
					.get()
					.map((t) => {
						n.push(e(t).attr("href"));
					}),
					axios.get(n[0]).then(({
						data: t
					}) => {
						const e = cheerio.load(t),
							n = e('div[class="post-thumb"] > h1').text(),
							a = e('div[class="post-thumb"] > img').attr("src"),
							s = e("div.info > p:nth-child(1)").text().split(":")[1].trim(),
							d = e("div.info > p:nth-child(2)").text().split(":")[1].trim(),
							r = e("div.info > p:nth-child(3)").text().split(":")[1].trim(),
							o = e("div.info > p:nth-child(4)").text().split(":")[1].trim(),
							l = e("div.info > p:nth-child(5)").text().split(":")[1].trim(),
							h = e("div.info > p:nth-child(6)").text().split(":")[1].trim(),
							c = e("div.info > p:nth-child(7)").text().split(":")[1].trim(),
							p = e("div.info > p:nth-child(8)").text().split(":")[1].trim(),
							m = e("div.info > p:nth-child(9)").text().split(":")[1].trim(),
							u = e("div.info > p:nth-child(10)").text().split(":")[1].trim(),
							v = e("div.kategoz > span").text(),
							f = e("div.lexot > p:nth-child(3)").text();
						let g = [];
						e('div[class="venser"]')
							.find('div[class="lexot"]')
							.children('div[class="dlbod"]')
							.children('div[class="smokeddl"]')
							.first()
							.children('div[class="smokeurl"]')
							.each((t, i) => {
								const n = [],
									a = e(i).children("strong").text();
								e(i)
									.children("a")
									.each((t, i) => {
										const a = e(i).attr("href"),
											s = e(i).text();
										n.push({
											url: a,
											name: s
										});
									}),
									g.push({
										reso: a,
										list: n
									});
							}),
							i({
								status: !0,
								title: n,
								title_jp: s,
								view: v,
								thumb: a,
								genre: d,
								season: r,
								producers: o,
								type: l,
								status_anime: h,
								total_episode: c,
								score: p,
								duration: m,
								released: u,
								description: f,
								result: g,
							});
					});
			})
			.catch(e);
	});
}
async function createUser(email, username, password, admin = false) {
	const response = await axios.post(`${setting.ptero.links}/api/application/users`, {
		email,
		username,
		first_name: username,
		last_name: username,
		language: "en",
		root_admin: admin,
		password
	}, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${setting.ptero.pltc}`
		}
	});
	return response.data;
}

async function createServer(name, userId, startup_cmd, memo, cpu, disk) {
	const response = await axios.post(`${setting.ptero.links}/api/application/servers`, {
		name,
		description: "Created On " + date,
		user: userId,
		egg: parseInt(setting.ptero.eggs),
		docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
		startup: startup_cmd,
		environment: {
			INST: "npm",
			USER_UPLOAD: "0",
			AUTO_UPDATE: "0",
			CMD_RUN: "npm start"
		},
		limits: {
			memory: memo,
			swap: 0,
			disk,
			io: 500,
			cpu
		},
		feature_limits: {
			databases: 5,
			backups: 5,
			allocations: 5
		},
		deploy: {
			locations: [parseInt(setting.ptero.location)],
			dedicated_ip: false,
			port_range: []
		}
	}, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${setting.ptero.pltc}`
		}
	});
	return response.data;
}

async function getEggStartupCommand() {
	const response = await axios.get(`${setting.ptero.links}/api/application/nests/${setting.ptero.nets}/eggs/${setting.ptero.eggs}`, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${setting.ptero.pltc}`
		}
	});
	return response.data;
}

async function manageServer(action, srv) {
	if (!srv) throw new Error('Input *ID* from server');

	try {
		const response = await axios.post(`${setting.ptero.links}/api/client/servers/${srv}/power`, {
			signal: action
		}, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${setting.ptero.pltc}`,
			}
		});

		return `Sukses ${action.toUpperCase()} Server`;
	} catch (error) {
		if (error.response && error.response.data.errors) {
			throw new Error(JSON.stringify(error.response.data.errors[0], null, 2));
		}
		throw new Error('Terjadi kesalahan: ' + util.format(error));
	}
}
async function deleteServer(srv) {
	try {
		let response = await fetch(setting.ptero.links + "/api/application/servers/" + srv, {
			method: "DELETE",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + setting.ptero.pltc,
			}
		});
		return response.ok ? {
			success: true
		} : await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

async function deleteUser(usr) {
	try {
		let response = await fetch(setting.ptero.links + "/api/application/users/" + usr, {
			method: "DELETE",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + setting.ptero.pltc,
			}
		});
		return response.ok ? {
			success: true
		} : await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

async function ml(id, zoneId) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '1',
              itemId: '2',
              catalogId: '57',
              paymentId: '352',
              gameId: id,
              zoneId: zoneId,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve(response.data.data.gameDetail)
        })
        .catch((err) => {
          reject(err)
        })
    })
}

async function ff(gameId) {
    try {
      const response = await axios.post('https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store', {
        productId: 3,
        itemId: 353,
        product_ref: "REG",
        product_ref_denom: "REG",
        catalogId: 376,
        paymentId: 1252,
        gameId: gameId
      }, {
        headers: {
          'Accept-Language': 'id',
          'x-device': '27004487-d5fb-4206-8c50-cdeac00ef6ed',
          'Ciam-Type': 'FR',
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });
  
      return response.data.data.gameDetail.userName;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
module.exports = {
	tools: {
		clean,
		ssweb,
		ephoto,
		CarbonifyV1,
		CarbonifyV2,
		convertAngka,
		pasteGG,
		createPaste,
		checkBandwidth,
		uploadFileToGitHub
	},
	internet: {
		jadwalSholat,
		scsearch,
		searchSpotifyTracks,
		tiktokSearchVideo,
		jarak,
		scrapKusonime,
		stickerSearch,
		GoogleImage,
		findKodeDaerah
	},
	downloader: {
		GDriveDl,
		snapsave,
		capcutdl,
		twiterdl,
		igdown,
		downloadCapcut,
		searchTemplates,
		convertv2,
		youtubedlv2,
		snapsavev2,
		spotifydl,
		mediafireDl,
		detailTemplates
	},
	imageAi: {
		remini2,
		processing,
		faceSwap,
		txt2img,
		diff,
		getJobs,
		transfrom,
		getModels,
		listSampler,
		listModels,
		Replicate,
		sdxlWaifu,
		sdxlEmoji,
		sdxlAnime,
		text2img,
		upscale,
		upscalev2,
		upscalev3,
		upscalev4
	},
	ai: {
		GPTwordle,
		QiooBotika,
		cococlip
	},
	panel: {
		createUser,
		createServer,
		getEggStartupCommand,
		manageServer,
		deleteServer,
		deleteUser
	},
	stalk: {
	    ml,
	    ff
	}
};