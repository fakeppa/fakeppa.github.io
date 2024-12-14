import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "intro",
    {
      text: "项目",
      icon: "bullseye",
      prefix: "article/01_项目/",
      link: "article/01_项目/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "领域",
      icon: "mountain",
      prefix: "article/02_领域/",
      link: "article/02_领域/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "资源",
      icon: "infinity",
      prefix: "article/03_资源/",
      link: "article/03_资源/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "归档",
      icon: "yin-yang",
      prefix: "article/04_归档/",
      link: "article/04_归档/",
      children: "structure",
      collapsible: true,
    },
  ],
});
