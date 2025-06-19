const fetch = require('node-fetch')

let handler = async (m, { text, prefix, command }) => {
  if (!text) return m.warning(`*• Example:* ${prefix + command} package_name`)
  let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`);
  let { objects } = await res.json();
  if (!objects.length) m.warning(`*Gak ada npm itu ngabb ☹️*`)
  let txt = objects.map(({ package: pkg }) => {
    return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`;
  }).join`\n\n`;
  m.reply(txt);
};
handler.help = ["npmsearch", "npm"].map((a) => a + " *[package name]*");
handler.tags = ["tools"];
handler.command = ["npmjs","npmsearch"]

module.exports = handler;
