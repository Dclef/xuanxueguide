import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "指南",
    icon: "/assets/image/book.svg",
    prefix: "/guide/",
    children: [
      {
        text: "初阶",
        prefix: "begin/",
        children:
          [
            "001_ming_history",
            "002_yinyang_history",
            "003_ming_history",
            "004_shensha_orgin",
            "005_nayin_orgin",
            "006_ziping_orgin",
            "007_xingqing_jibing_orgin",
            "008_liuqin_orgin",
            "009_geju_orgin",
            "010_songming_zongjie",
            "011_mingqing_zongjie",
            "012_moden_zongjie",
          ]
      },
      {
        text: "进阶",
        prefix: "high/",
        children:
          [
            "ray",
            "paiban",
            "shishen",
            "geju"
          ]
      },
    ],
  },

  { text: "玄学原文", icon: "/assets/image/yinyang.svg", link: "https://dclef.icu/xuanxuedocs" },
  { text: "在线排版", icon: "/assets/image/yinyang.svg", link: "https://dclef.icu/paiban" },
  { text: "赞助", icon: "/assets/image/comments-dollar.svg", link: "/support.md" },
  { text: "TG群", icon: "/assets/image/telegram.svg", link: "https://t.me/xuanxuedocs" }


]);
