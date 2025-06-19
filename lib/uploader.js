let axios = require('axios')
let BodyForm = require('form-data')
let { fromBuffer } = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')


async function pomfCDN(path) {
    try {
        const fileStream = fs.readFileSync(path);
        const formData = new BodyForm();
        const { ext, mime } = (await fromBuffer(fileStream)) || {};
        formData.append("fileToUpload", fileStream, "file." + ext);
        formData.append("reqtype", "fileupload");
        const response = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: formData,
            headers: {
              ...formData.getHeaders(),
            }
        });
        return await response.text();
    } catch (error) {
        console.log("Error at catbox uploader in lib/uploader.js:", error)
        return "Terjadi kesalahan"
    }
}
async function Pixhost(media) {
            try {
                const service = new ImageUploadService('pixhost.to');
                const { directLink } = await service.uploadFromBinary(media, 'biyu-offc.png');
                return directLink;
            } catch (e) {
                console.error('Pixhost:', e.message);
                return null;
            }
        }
        async function supaCDN(buffer) {
            try {
                const form = new FormData();
                form.append('file', buffer, 'upload.jpg');
                const res = await axios.post('https://i.supa.codes/api/upload', form, {
                    headers: form.getHeaders()
                });
                return res.data?.link || null;
            } catch (e) {
                console.error('Supa:', e.message);
                return null;
            }
        }

        async function freeImage(buffer) {
            try {
                const form = new FormData();
                form.append('source', buffer, 'file');
                const res = await axios.post('https://freeimage.host/api/1/upload', form, {
                    params: { key: '6d207e02198a847aa98d0a2a901485a5' },
                    headers: form.getHeaders()
                });
                return res.data.image.url;
            } catch (e) {
                console.error('FreeImage:', e.message);
                return null;
            }
        }
        
async function tmpFiles(filePath) {
    const formData = new BodyForm();
    const fileStream = fs.readFileSync(filePath)
    const { ext, mime } = (await fromBuffer(fileStream)) || {};
    formData.append('file', fileStream, "file." + ext);

    try {
        const response = await axios.post('https://tmpfiles.org/api/v1/upload', formData, {
            headers: formData.getHeaders(),
        });

        return response.data.data.url.replace("tmpfiles.org", "tmpfiles.org/dl")
    } catch (error) {
        console.error('Error uploading image:', error);
        return "Terjadi kesalahan"
    }
}
function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}



async function UploadFileUgu (input) {
	return new Promise (async (resolve, reject) => {
			const form = new BodyForm();
			form.append("files[]", fs.createReadStream(input))
			await axios({
				url: "https://uguu.se/upload.php",
				method: "POST",
				headers: {
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
					...form.getHeaders()
				},
				data: form
			}).then((data) => {
				resolve(data.data.files[0])
			}).catch((err) => reject(err))
	})
}

async function webp2mp4File(url) {
const res = await axios('https://ezgif.com/webp-to-mp4?url=' + url)
const $ = cheerio.load(res.data)      
        const file = $('input[name="file"]').attr('value')
        const data = {
          file: file,
          convert: 'Convert WebP to MP4!',
        }
  const res2 = await axios({
          method: 'post',
          url: 'https://ezgif.com/webp-to-mp4/' + data.file,
          data: new URLSearchParams(Object.entries(data)) 
         
         })  
  const $2 = cheerio.load(res2.data)  
  const link = $2('div#output > p.outfile > video > source').attr('src')
  return "https:" + link
}

module.exports = { pomfCDN, tmpFiles, TelegraPh, UploadFileUgu, webp2mp4File }
