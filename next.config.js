const { default: image } = require("next/image");

module.exports = {
  i18n:{"locales": ["es" ,"en"],
  "defaultLocale": "es",
  },
  images: {
    domains: ["gokubi.com", "i.imgur.com", "shotkit.com", "www.jeancoutu.com", "164.92.76.51" , "trabajarporelmundo.org", "icbritanico.edu.ar","www.idiomasumh.es" ],
    formats: [ 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}


