const { default: image } = require("next/image");

module.exports = {
  i18n:{"locales": ["es" ,"en"],
  "defaultLocale": "es",
  },
  images: {
    domains: ["gokubi.com", "i.imgur.com"],
    formats: [ 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
}


