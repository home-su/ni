const cooldown = new Set()

/**

 * Cek apakah pengguna dalam cooldown.

 * @param {String} sender 

 * @returns {Boolean}

 */

const isCooldown = (sender) => {

    return cooldown.has(sender)

}

/**

 * Tambahkan pengguna ke dalam cooldown.

 * @param {String} sender 

 */

const addCooldown = (sender) => {

    cooldown.add(sender)

    setTimeout(() => {

        cooldown.delete(sender)

    }, 5000) // 5 detik cooldown

}

module.exports = {

    isCooldown,

    addCooldown

}