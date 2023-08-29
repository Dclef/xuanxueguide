import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "指南",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    }

  ],

  "/玄学原文/命/": [
    {
      text: "命",
      icon: "laptop-code",
      children: [
        {
          text: "八字",
          icon: "laptop-code",
          collapsible: true,
          prefix: "八字/",
          children: [
            {
              text: "李虚中命书",
              icon: "laptop-code",
              link: "李虚中命书/" //唐 也称鬼谷遗文
            },
            {
              text: "玉照定真经",
              icon: "laptop-code",
              link: "玉照定真经/"//唐末 宋初
            },

            {
              text: "子平真诠",
              icon: "laptop-code",
              link: "子平真诠/" //明末编撰 第一本八字论命模型 也称渊海子平 南宋
            },
        
            {
              text: "三命通会",
              icon: "laptop-code",
              link: "三命通会/" //明
            },
            {
              text: "神锋通考",
              icon: "laptop-code",
              link: "神锋通考/" //明末 清初
            },
            {
              text: "滴天髓",
              icon: "laptop-code",
              link: "滴天髓/" //明末 清初
            },
            {
              text: "穷通宝典",
              icon: "laptop-code",
              link: "穷通宝典/" //明末 清初
            },
             {
              text: "命理约言",
              icon: "laptop-code",
              link: "命理约言/" //清
            },
          {
              text: "八字基础知识",
              icon: "laptop-code",
              link: "八字基础知识/" //现代
            },
          ]
        }
      ]
    },

  ],


});
