import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // hostname: "https://dclef.icu",

  author: {
    name: "dclef",
    url: "https://dclef.icu",
  },
  fullscreen: true,
  iconAssets: "fontawesome",
  logo: "/logo.svg",

  repo: "dclef/xuanxueguide",

  docsDir: "src",
  
  // navbar
  navbar,

  // sidebar
  sidebar,

  footer:"GPL Licensed ",
  displayFooter: true,
  
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  
  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "Dclef/xuanxueguide",
      repoId: "R_kgDOKH40cA",
      category: "Announcements",
      categoryId: "DIC_kwDOKH40cM4CYqBc",
    },
    components:{
      rootComponents: {
        notice: [
          {
            path: "/",
            title: "群",
            content:
              "随缘",
            actions: [
              {
                text: "赞助",
                link: "support.md",
              },
            ],
          },
        ]
      }
    },
    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

  },
});
