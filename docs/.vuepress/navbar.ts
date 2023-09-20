import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "指南",
    icon: "book",
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
            "007_xingqing_jibing",
            "008_liuqin",
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
            "paiban"
          ]
      },
    ],
  },

  { text: "玄学原文", icon: "yin-yang", link: "https://dclef.icu/xuanxuedocs" },
  { text: "在线排版", icon: "yin-yang", link: "https://dclef.icu/paiban" },
  { text: "赞助", icon: "comments-dollar", link: "/support.md" },
  { text: "TG群", icon: "paper-plane", link: "https://t.me/xuanxueguide" }


]);
