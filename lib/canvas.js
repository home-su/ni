const {
	createCanvas,
	loadImage
} = require('canvas');

async function invoice(data, payment) {
	try {
		const image = await loadImage('./media/invoice.jpg');
		const newLogo = await loadImage('./media/logo.png');
		const payLogo = await loadImage(payment.logo);

		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		const logoX = 130
		const logoY = 60
		const logoWidth = 150
		const logoHeight = 150
		ctx.drawImage(newLogo, logoX, logoY, logoWidth, logoHeight);

		const payX = 130
		const payY = 400
		const payWidth = 150
		const payHeight = 150
		ctx.drawImage(payLogo, payX, payY, payWidth, payHeight);

		ctx.font = 'italic bold 35px Arial';
		ctx.fillStyle = '#FFD700';
		ctx.fillText("DETAIL PESANAN", 660, 283)
		ctx.fillText("PRODUCT :", 460, 395)
		ctx.fillText("TUJUAN :", 460, 435)
		ctx.fillText("NICKNAME :", 460, 475)
		ctx.fillText("NOMINAL :", 460, 515)
		ctx.fillText("SN :", 460, 555)

		ctx.font = 'bold 25px Arial';
		ctx.fillStyle = '#ffffff'
		ctx.textAlign = 'left'
		ctx.fillText("Status Pesanan", 950, 112)
		ctx.fillText("Invoice Number", 690, 112)
		ctx.fillText("Tanggal Pesan", 440, 112)
		ctx.fillText("Pembelian Anda", 90, 340)

		ctx.font = 'italic bold 25px Arial';
		ctx.fillStyle = '#ffffff'
		ctx.textAlign = 'center'
		ctx.fillText(data.purchaseDate, 540, 150)
		ctx.fillText(data.invoiceNumber, 800, 150)
		ctx.fillText(payment.status, 1060, 150)
		ctx.fillText(payment.status, 200, 380)

		ctx.font = 'bold 25px Arial';
		ctx.fillText("Terimakasih telah", 200, 590)
		ctx.fillText("mempercayai store", 200, 620)
		ctx.fillText("kami", 200, 650)

		ctx.textAlign = 'left'
		ctx.font = 'bold 30px Arial';
		ctx.fillText(data.product, 720, 393)
		ctx.fillText(data.target, 720, 433)
		ctx.fillText(data.nickname, 720, 473)
		ctx.fillText(data.nominal, 720, 513)
		ctx.fillText(data.serial, 720, 553)

		ctx.font = 'bold 35px Arial';
		ctx.fillStyle = '#ffffff';
		ctx.textAlign = 'center'
		ctx.fillText(data.store, 830, 650)

		const buffer = canvas.toBuffer('image/png');
		return {
			status: true,
			buffer: buffer
		}
	} catch (error) {
		return {
			status: false,
			message: error
		}
	}
}

/*const data = {
  purchaseDate: '16 Nov 2024',
  invoiceNumber: 'CVX-6YM8',
  product: '10 Diamond FF',
  target: '1234567',
  nickname: 'JuzzzLongtz',
  nominal: 'Rp 55rb',
  serial: 'YEBY5AVOWFW',
  store: 'PT JAWA PIRADE'
};

const payment = {
  status: 'FAILED',
  logo: './media/bayar-failed.png'
};

invoice(data, payment);

*/

async function QRIS(data) {
	try {
		const image = await loadImage('./media/qr.jpg');
		const qr = await loadImage(data.path);
		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		const qrX = 188
		const qrY = 215
		const qrWidth = 910
		const qrHeight = 910
		ctx.drawImage(qr, qrX, qrY, qrWidth, qrHeight);

		ctx.font = 'bold 100px Arial';
		ctx.fillStyle = '#ffffff'
		ctx.textAlign = 'center'
		ctx.fillText(data.nominal, 640, 180)

		ctx.font = 'bold 20px Arial';
		ctx.fillText("Expired At: " + data.expired, 360, 1150)

		ctx.textAlign = 'right'
		ctx.fillText(data.store, 1100, 1150)

		const buffer = canvas.toBuffer('image/png');
		return {
			status: true,
			buffer: buffer
		}
	} catch (error) {
		return {
			status: false,
			message: error
		}
	}
}

async function QRIS2(data) {
    try {
        const image = await loadImage('./media/qr2.jpg');
        const qr = await loadImage(data.path);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const qrX = 240;
        const qrY = 750;
        const qrWidth = 1700;
        const qrHeight = 1700;
        const radius = 100;

        ctx.beginPath();
        ctx.moveTo(qrX + radius, qrY);
        ctx.lineTo(qrX + qrWidth - radius, qrY);
        ctx.arcTo(qrX + qrWidth, qrY, qrX + qrWidth, qrY + qrHeight, radius);
        ctx.lineTo(qrX + qrWidth, qrY + qrHeight - radius);
        ctx.arcTo(qrX + qrWidth, qrY + qrHeight, qrX + qrWidth - radius, qrY + qrHeight, radius);
        ctx.lineTo(qrX + radius, qrY + qrHeight);
        ctx.arcTo(qrX, qrY + qrHeight, qrX, qrY + qrHeight - radius, radius);
        ctx.lineTo(qrX, qrY + radius);
        ctx.arcTo(qrX, qrY, qrX + radius, qrY, radius);
        ctx.closePath();

        ctx.save();
        ctx.clip();
        ctx.drawImage(qr, qrX, qrY, qrWidth, qrHeight);
        ctx.restore();
        
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'left'
        ctx.fillText("Expired At: " + data.expired, 50, 3204)
        
        ctx.font = 'bold 120px Arial';
        ctx.fillText(data.nominal, 50, 3084)
        
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'right'
        ctx.fillText(data.store, 3204, 3204)

        const buffer = canvas.toBuffer('image/png');
        return {
            status: true,
            buffer: buffer
        }
    } catch (error) {
        return {
            status: false,
            message: error
        };
    }
}

/*let data = {
    path: "./tmp/tes.jpg",
    nominal: "Rp 10.000",
    expired: "2024-12-08 16:46",
    store: "PT JAWA PIRADE"
}

QRIS(data)
QRIS2(data)
*/

async function struk(data) {
	try {
		const image = await loadImage('./media/struk.jpg');
		const logo = await loadImage('./media/logo.png');
		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		const logoX = 320
		const logoY = 120
		const logoWidth = 100
		const logoHeight = 100
		ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = '#000000'
		ctx.textAlign = 'center'
		ctx.fillText("Transaksi " + data.status, 365, 240)

		ctx.fillStyle = '#808080'
		ctx.font = '27px Arial';
		ctx.textAlign = 'left'
		ctx.fillText("Tanggal", 120, 320)
		ctx.fillText("Serial Number", 120, 380)
		ctx.fillText("Status", 120, 460)
		ctx.fillText("Invoice ID", 120, 515)
		ctx.fillText("Refund ID", 120, 565)
		ctx.fillText("Code", 120, 615)
		ctx.fillText("Product", 120, 665)
		ctx.fillText("Tujuan", 120, 715)
		ctx.fillText("Keterangan", 120, 765)
		ctx.fillText("Nominal", 120, 885)
		ctx.fillText("Pajak Dan Admin", 120, 955)

		ctx.font = 'bold 30px Arial';
		ctx.fillStyle = '#000000'
		ctx.fillText("TOTAL", 120, 1090)

		ctx.font = '27px Arial';
		ctx.textAlign = 'right'
		ctx.fillText(data.tanggal, 610, 320)
		ctx.fillText(data.serial, 610, 380)
		ctx.fillText(data.status, 610, 460)
		ctx.fillText(data.id, 610, 515)
		ctx.fillText(data.reff_id, 610, 565)
		ctx.fillText(data.code, 610, 615)
		ctx.fillText(data.product, 610, 665)
		ctx.fillText(data.tujuan, 610, 715)
		ctx.fillText(data.note, 610, 765)
		ctx.fillText(data.nominal, 610, 885)
		ctx.fillText(data.admin, 610, 955)

		ctx.font = 'bold 40px Arial';
		ctx.fillStyle = '#1E90FF'
		ctx.fillText(data.total, 610, 1090)

		ctx.font = 'bold 20px Arial';
		ctx.fillStyle = '#000000'
		ctx.textAlign = 'center'
		ctx.globalAlpha = 0.2
		ctx.fillText("Copyright © 2024 • " + data.store, 365, 1220)

		const buffer = canvas.toBuffer('image/png');
		return {
			status: true,
			buffer: buffer
		}
	} catch (error) {
		return {
			status: false,
			message: error
		}
	}
}

/*
let data = {
    tanggal: "2024-06-28 23:07",
    serial: "YEBY5AVOWFW",
    status: "Berhasil ",
    id: "464246621",
    reff_id: "574215674",
    code: "FF10",
    product: "10 Diamond FF",
    tujuan: "12345678",
    note: "-",
    nominal: "Rp 10.000",
    admin: "Rp 2.000",
    total: "Rp 12.000",
    store: "PT JAWA PIRADE"
    
}
struk(data)
*/

async function tagihan(data) {
    try {
        const image = await loadImage('./media/tagihan.jpg');
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#000000'
        ctx.textAlign = 'left'
        ctx.fillText("DETAIL TAGIHAN", 100, 93)

        ctx.font = '30px Arial';
        ctx.globalAlpha = 0.5
        ctx.fillText("Nama Pelanggan", 250, 200)
        ctx.fillText("Tarif / Layanan", 250, 400)
        ctx.fillText("Jumlah Tagihan", 750, 400)
        ctx.fillText("Periode", 250, 600)

        ctx.font = '40px Arial';
        ctx.fillText("Total Tagihan", 150, 955)
        ctx.fillText("Biaya Admin", 150, 1040)
        ctx.fillText("Denda", 150, 1125)
     
        ctx.font = '50px Arial';
        ctx.globalAlpha = 1
        ctx.fillText("Total Bayar", 150, 815)
     
        ctx.font = '40px Arial';
        ctx.fillText(data.name, 250, 250)
        ctx.fillText(data.layanan, 250, 450)
        ctx.fillText(data.lembar, 750, 450)
        ctx.fillText(data.periode, 250, 650)

        ctx.font = '50px Arial';
        ctx.textAlign = 'right'
        ctx.fillText(data.nominal, 975, 957)
        ctx.fillText(data.admin, 975, 1042)
        ctx.fillText(data.denda, 975, 1127)
     
        ctx.font = '50px Arial';
        ctx.fillStyle = '#FF0000'
        ctx.fillText(data.total, 975, 817)
     
        const buffer = canvas.toBuffer('image/png');
        return {
			status: true,
			buffer: buffer
		}
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

/*
let data = {
    name: "YAHYA ALI",
    layanan: "450 kWh",
    lembar: 1,
    periode: "30 November 2024",
    nominal: "Rp 10.000",
    admin: "Rp 1.000",
    denda: "Rp 500",
    total: "Rp 11.500"
}
tagihan(data)
*/

module.exports = {
	struk,
	QRIS,
	QRIS2,
	invoice,
	tagihan
}