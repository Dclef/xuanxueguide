import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "初阶",
        icon: "lightbulb",
        prefix: "初阶/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "进阶",
        icon: "lightbulb",
        prefix: "进阶/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },

  { text: "玄学原文", link: "https://dclef.icu/xuanxuedocs"},
  { text: "在线排版", link: "https://dclef.icu/paiban" }


]);
