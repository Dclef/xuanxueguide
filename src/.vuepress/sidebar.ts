import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "指南",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    }

  ],
  "/玄学原文/八字": [
    {
      text: "八字",
      icon: "laptop-code",
      children: [
        {
          text: "八字基础知识",
          icon: "laptop-code",
          prefix: "八字基础知识/",
          link: "八字基础知识/"
        },
        {
          text: "渊海子平",
          icon: "laptop-code",
          prefix: "渊海子平/",
          link: "渊海子平/"
        },
      ]
    },
  ],
  "/玄学原文/梅花易数": [
    {
      text: "梅花易数",
      icon: "laptop-code",
      children: [
        {
          text: "梅花易数",
          icon: "laptop-code",
          prefix: "梅花易数/",
          link: "梅花易数/"
        },
        {
          text: "渊海子平",
          icon: "laptop-code",
          prefix: "渊海子平/",
          link: "渊海子平/"
        },
      ]
    },
  ],
  "/玄学原文/八字/八字基础知识": "structure",
  "/玄学原文/八字/渊海子平": "structure",
});
