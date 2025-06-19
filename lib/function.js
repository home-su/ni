const { getTime } = require("./myfunc")
const fs = require("fs")

function kapital(str) {
	return str
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Mengubah huruf pertama setiap kata menjadi kapital
		.join(' ');
}

function hitungmundur(tanggal, bulan, tahun) {
	let from = new Date(`${bulan} ${tanggal}, ${tahun} 00:00:00`).getTime();
	let now = Date.now();
	let distance = from - now;
	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);
	return days + ' Hari ' + hours + ' Jam ' + minutes + ' Menit '
}

const isEmoji = (emo) => {
	let emoji_ranges = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	let regexEmoji = new RegExp(emoji_ranges, 'gi');
	return emo.match(regexEmoji)
}

async function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)]
}

function addFunc(namaFile, text) {
    const funcBaru = `${text}`;

    return new Promise((resolve, reject) => {
        fs.readFile(namaFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Terjadi kesalahan saat membaca file:', err);
                return reject({
                    status: false,
                    message: err.message
                });
            }

            const posisiAwalFunc = data.indexOf("const waktuHabis = (jawaban) => {");
            if (posisiAwalFunc !== -1) {
                const kodeBaruLengkap = data.slice(0, posisiAwalFunc) + '\n' + funcBaru + '\n' + data.slice(posisiAwalFunc);
                fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
                    if (err) {
                        console.error('Terjadi kesalahan saat menulis file:', err);
                        return reject({
                            status: false,
                            message: err.message
                        });
                    }
                    resolve({
                        status: true,
                        message: "Berhasil menambahkan func baru!"
                    });
                });
            } else {
                resolve({
                    status: false,
                    message: "Func tidak ditemukan"
                });
            }
        });
    });
}

function addCase(namaFile, text) {
    const caseBaru = `${text}`;

    return new Promise((resolve, reject) => {
        fs.readFile(namaFile, 'utf8', (err, data) => {
            if (err) {
                console.error('Terjadi kesalahan saat membaca file:', err);
                return reject({
                    status: false,
                    message: err.message
                });
            }

            const posisiAwalCase = data.indexOf("case 'gimage':");
            if (posisiAwalCase !== -1) {
                const kodeBaruLengkap = data.slice(0, posisiAwalCase) + '\n' + caseBaru + '\n' + data.slice(posisiAwalCase);
                fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
                    if (err) {
                        console.error('Terjadi kesalahan saat menulis file:', err);
                        return reject({
                            status: false,
                            message: err.message
                        });
                    }
                    resolve({
                        status: true,
                        message: "Berhasil menambahkan case baru!"
                    });
                });
            } else {
                resolve({
                    status: false,
                    message: "Case gimage tidak ditemukan"
                });
            }
        });
    });
}

function dellCase(filePath, caseNameToRemove) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				console.error('Terjadi kesalahan:', err);
				return reject({
					status: false,
					message: err.message
				});
			}

			const regex = new RegExp(`case\\s+'${caseNameToRemove}':[\\s\\S]*?break`, 'g');
			if (!regex.test(data)) {
				return resolve({
					status: false,
					message: "case tidak ditemukan"
				});
			}

			const modifiedData = data.replace(regex, '');

			fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
				if (err) {
					console.error('Terjadi kesalahan saat menulis file:', err);
					return reject({
						status: false,
						message: err.message
					});
				}

				resolve({
					status: true,
					message: `Teks dari case '${caseNameToRemove}' telah dihapus dari file.`
				});
			});
		});
	});
}

const getCase = (cases) => {
    const data = fs.readFileSync("./vreden.js").toString();
    const caseMatch = data.split('case \'' + cases + '\'');

    if (caseMatch.length > 1) {
        return "case" + `'${cases}'` + caseMatch[1].split("break")[0] + "break";
    }
    
    return "Case tidak ditemukan!"
};

const totalFitur = () => {
	var mytext = fs.readFileSync("./vreden.js").toString()
	var numUpper = (mytext.match(/case '/g) || []).length;
	return numUpper
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

/*function pangkat(idrole) {
	var levelRole = global.db.data.users[idrole].rank
	var role = {
		rank: 'Bronze I',
		name: 'Bronze',
		id: 1
	}
	if (levelRole <= 1000) {
		role = {
			rank: 'Bronze I',
			name: 'Bronze',
			id: 1
		}
	} else if (levelRole <= 1100) {
		role = {
			rank: 'Bronze II',
			name: 'Bronze',
			id: 2
		}
	} else if (levelRole <= 1200) {
		role = {
			rank: 'Bronze III',
			name: 'Bronze',
			id: 3
		}
	} else if (levelRole <= 1300) {
		role = {
			rank: 'Silver I',
			name: 'Silver',
			id: 1
		}
	} else if (levelRole <= 1400) {
		role = {
			rank: 'Silver II',
			name: 'Silver',
			id: 2
		}
	} else if (levelRole <= 1500) {
		role = {
			rank: 'Silver III',
			name: 'Silver',
			id: 3
		}
	} else if (levelRole <= 1600) {
		role = {
			rank: 'Gold I',
			name: 'Gold',
			id: 1
		}
	} else if (levelRole <= 1725) {
		role = {
			rank: 'Gold II',
			name: 'Gold',
			id: 2
		}
	} else if (levelRole <= 1850) {
		role = {
			rank: 'Gold III',
			name: 'Gold',
			id: 3
		}
	} else if (levelRole <= 1975) {
		role = {
			rank: 'Gold IV',
			name: 'Gold',
			id: 4
		}
	} else if (levelRole <= 2100) {
		role = {
			rank: 'Platinum I',
			name: 'Platinum',
			id: 1
		}
	} else if (levelRole <= 2225) {
		role = {
			rank: 'Platinum II',
			name: 'Platinum',
			id: 2
		}
	} else if (levelRole <= 2350) {
		role = {
			rank: 'Platinum III',
			name: 'Platinum',
			id: 3
		}
	} else if (levelRole <= 2475) {
		role = {
			rank: 'Platinum IV',
			name: 'Platinum',
			id: 4
		}
	} else if (levelRole <= 2600) {
		role = {
			rank: 'Diamond I',
			name: 'Diamond',
			id: 1
		}
	} else if (levelRole <= 2750) {
		role = {
			rank: 'Diamond II',
			name: 'Diamond',
			id: 2
		}
	} else if (levelRole <= 2900) {
		role = {
			rank: 'Diamond III',
			name: 'Diamond',
			id: 3
		}
	} else if (levelRole <= 3050) {
		role = {
			rank: 'Diamond IV',
			name: 'Diamond',
			id: 4
		}
	} else if (levelRole <= 3200) {
		role = {
			rank: 'Heroic',
			name: 'Heroic',
			id: 0
		}
	} else if (levelRole <= 3500) {
		role = {
			rank: 'Heroic ✩',
			name: 'Heroic',
			id: 1
		}
	} else if (levelRole <= 4000) {
		role = {
			rank: 'Heroic ✩✩',
			name: 'Heroic',
			id: 2
		}
	} else if (levelRole <= 4350) {
		role = {
			rank: 'Heroic ✩✩✩',
			name: 'Heroic',
			id: 3
		}
	} else if (levelRole <= 5050) {
		role = {
			rank: 'Master ✯',
			name: 'Master',
			id: 1
		}
	} else if (levelRole <= 6400) {
		role = {
			rank: 'Master ✯✯',
			name: 'Master',
			id: 2
		}
	} else if (levelRole <= 8500) {
		role = {
			rank: 'Master ✯✯✯',
			name: 'Master',
			id: 3
		}
	} else if (levelRole <= 10150) {
		role = {
			rank: 'GrandMaster',
			name: 'GrandMaster',
			id: 0
		}
	} else if (levelRole <= 17700) {
		role = {
			rank: 'GrandMaster ✩',
			name: 'GrandMaster',
			id: 1
		}
	} else if (levelRole <= 19100) {
		role = {
			rank: 'GrandMaster ✩✩',
			name: 'GrandMaster',
			id: 2
		}
	} else if (levelRole <= 10800) {
		role = {
			rank: 'GrandMaster ✩✩✩',
			name: 'GrandMaster',
			id: 3
		}
	} else if (levelRole <= 99999999999999999999999999999) {
		role = {
			rank: 'GrandMaster ✩✩✩✩',
			name: 'GrandMaster',
			id: 4
		}
	}
	return role
}*/
function pangkat(idrole) {
  var levelRole = global.db.data.users[idrole].rank
  var role = {
    rank: 'Bronze I',
    name: 'Bronze',
    id: 1
  }

  if (levelRole <= 1000) {
    role = { rank: 'Bronze I', name: 'Bronze', id: 1 }
  } else if (levelRole <= 11000) {
    role = { rank: 'Bronze II', name: 'Bronze', id: 2 }
  } else if (levelRole <= 21000) {
    role = { rank: 'Bronze III', name: 'Bronze', id: 3 }
  } else if (levelRole <= 31000) {
    role = { rank: 'Silver I', name: 'Silver', id: 1 }
  } else if (levelRole <= 41000) {
    role = { rank: 'Silver II', name: 'Silver', id: 2 }
  } else if (levelRole <= 51000) {
    role = { rank: 'Silver III', name: 'Silver', id: 3 }
  } else if (levelRole <= 61000) {
    role = { rank: 'Gold I', name: 'Gold', id: 1 }
  } else if (levelRole <= 71000) {
    role = { rank: 'Gold II', name: 'Gold', id: 2 }
  } else if (levelRole <= 81000) {
    role = { rank: 'Gold III', name: 'Gold', id: 3 }
  } else if (levelRole <= 91000) {
    role = { rank: 'Gold IV', name: 'Gold', id: 4 }
  } else if (levelRole <= 101000) {
    role = { rank: 'Platinum I', name: 'Platinum', id: 1 }
  } else if (levelRole <= 111000) {
    role = { rank: 'Platinum II', name: 'Platinum', id: 2 }
  } else if (levelRole <= 121000) {
    role = { rank: 'Platinum III', name: 'Platinum', id: 3 }
  } else if (levelRole <= 131000) {
    role = { rank: 'Platinum IV', name: 'Platinum', id: 4 }
  } else if (levelRole <= 141000) {
    role = { rank: 'Diamond I', name: 'Diamond', id: 1 }
  } else if (levelRole <= 151000) {
    role = { rank: 'Diamond II', name: 'Diamond', id: 2 }
  } else if (levelRole <= 161000) {
    role = { rank: 'Diamond III', name: 'Diamond', id: 3 }
  } else if (levelRole <= 171000) {
    role = { rank: 'Diamond IV', name: 'Diamond', id: 4 }
  } else if (levelRole <= 181000) {
    role = { rank: 'Heroic I', name: 'Heroic', id: 1 }
  } else if (levelRole <= 191000) {
    role = { rank: 'Heroic II', name: 'Heroic', id: 2 }
  } else if (levelRole <= 201000) {
    role = { rank: 'Heroic III', name: 'Heroic', id: 3 }
  } else if (levelRole <= 211000) {
    role = { rank: 'Master I', name: 'Master', id: 1 }
  } else if (levelRole <= 221000) {
    role = { rank: 'Master II', name: 'Master', id: 2 }
  } else if (levelRole <= 231000) {
    role = { rank: 'Master III', name: 'Master', id: 3 }
  } else if (levelRole <= 241000) {
    role = { rank: 'GrandMaster I', name: 'GrandMaster', id: 1 }
  } else if (levelRole <= 251000) {
    role = { rank: 'GrandMaster II', name: 'GrandMaster', id: 2 }
  } else if (levelRole <= 261000) {
    role = { rank: 'GrandMaster III', name: 'GrandMaster', id: 3 }
  } else if (levelRole <= 271000) {
    role = { rank: 'GrandMaster IV', name: 'GrandMaster', id: 4 }
  } else if (levelRole <= 281000) {
    role = { rank: 'GrandMaster V', name: 'GrandMaster', id: 5 }
  } else if (levelRole <= 291000) {
    role = { rank: 'Epic I', name: 'Epic', id: 1 }
  } else if (levelRole <= 301000) {
    role = { rank: 'Epic II', name: 'Epic', id: 2 }
  } else if (levelRole <= 311000) {
    role = { rank: 'Epic III', name: 'Epic', id: 3 }
  } else if (levelRole <= 321000) {
    role = { rank: 'Epic IV', name: 'Epic', id: 4 }
  } else if (levelRole <= 331000) {
    role = { rank: 'Epic V', name: 'Epic', id: 5 }
  } else if (levelRole <= 341000) {
    role = { rank: 'Legend I', name: 'Legend', id: 1 }
  } else if (levelRole <= 351000) {
    role = { rank: 'Legend II', name: 'Legend', id: 2 }
  } else if (levelRole <= 361000) {
    role = { rank: 'Legend III', name: 'Legend', id: 3 }
  } else if (levelRole <= 371000) {
    role = { rank: 'Legend IV', name: 'Legend', id: 4 }
  } else if (levelRole <= 381000) {
    role = { rank: 'Legend V', name: 'Legend', id: 5 }
  } else if (levelRole <= 391000) {
    role = { rank: 'Romawi I', name: 'Romawi', id: 1 }
  } else if (levelRole <= 401000) {
    role = { rank: 'Romawi II', name: 'Romawi', id: 2 }
  } else if (levelRole <= 411000) {
    role = { rank: 'Romawi III', name: 'Romawi', id: 3 }
  } else if (levelRole <= 421000) {
    role = { rank: 'Romawi IV', name: 'Romawi', id: 4 }
  } else if (levelRole <= 431000) {
    role = { rank: 'Romawi V', name: 'Romawi', id: 5 }
  } else if (levelRole <= 441000) {
    role = { rank: 'Romawi VI', name: 'Romawi', id: 6 }
  } else if (levelRole <= 451000) {
    role = { rank: 'Romawi VII', name: 'Romawi', id: 7 }
  } else if (levelRole <= 461000) {
    role = { rank: 'Honor I', name: 'Honor', id: 1 }
  } else if (levelRole <= 471000) {
    role = { rank: 'Honor II', name: 'Honor', id: 2 }
  } else if (levelRole <= 481000) {
    role = { rank: 'Honor III', name: 'Honor', id: 3 }
  } else if (levelRole <= 491000) {
    role = { rank: 'Honor IV', name: 'Honor', id: 4 }
  } else if (levelRole <= 501000) {
    role = { rank: 'Honor V', name: 'Honor', id: 5 }
  } else if (levelRole <= 511000) {
    role = { rank: 'Honor VI', name: 'Honor', id: 6 }
  } else if (levelRole <= 521000) {
    role = { rank: 'Honor VII', name: 'Honor', id: 7 }
  } else if (levelRole <= 531000) {
    role = { rank: 'Honor VIII', name: 'Honor', id: 8 }
  } else if (levelRole <= 541000) {
    role = { rank: 'Honor IX', name: 'Honor', id: 9 }
  } else if (levelRole <= 551000) {
    role = { rank: 'Honor X', name: 'Honor', id: 10 }
  } else {
    let bintang = Math.floor((levelRole - 551000) / 10000) + 1
    if (bintang > 10) bintang = 10
    role = { rank: `Immortality ${toRoman(bintang)}`, name: 'Immortality', id: bintang }
  }

  return role
}
function toRoman(num) {
  const roman = ['','I','II','III','IV','V','VI','VII','VIII','IX','X']
  return roman[num] || num
}

module.exports = {
    pickRandom,
    isEmoji,
    hitungmundur,
    kapital,
    randomNomor,
    totalFitur,
    getCase,
    dellCase,
    addCase,
    addFunc,
    pangkat
}