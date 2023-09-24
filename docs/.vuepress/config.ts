import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import { pwaPlugin } from "vuepress-plugin-pwa2";
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default defineUserConfig({
  head:[
    ['script', {async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-MTZ658KRPR'}],
    [
      'script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MTZ658KRPR');
      `
    ],
  ],
  base: "/",
  lang: "zh-CN",
  title: "玄学指南",
  description: "入门级",
  theme,
  shouldPrefetch: false,
  plugins: [
  
    copyrightPlugin({
      global: true,
      triggerWords: 150,
      author: "dclef",
      license: "GPL-3.0"
    }),
    searchProPlugin({
      indexContent: true
    }),
   
    pwaPlugin({
      manifest: {
        name: "玄学指南",
        short_name: "xuanxuegudie",
        description: "入门级指南",
        icons: [
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
