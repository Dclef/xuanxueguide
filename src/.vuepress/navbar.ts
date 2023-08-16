import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "基础",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "进阶",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  
  {
    text: "玄学原文",
    icon: "lightbulb",
    prefix: "/玄学原文/",
    children: [
      {
         text: "八字", icon: "ellipsis", link: "八字/" ,
      },
      {
         text: "梅花易数", icon: "ellipsis", link: "梅花易数/" ,
      }
    ],
  },
  {text:"在线排版",link:"https://dclef.icu/xuanxue"}

  
]);
