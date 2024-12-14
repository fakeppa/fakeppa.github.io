import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    "intro",
    {
      text: "项目",
      icon: "laptop-code",
      prefix: "article/01_项目/",
      link: "article/01_项目/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "领域",
      icon: "book",
      prefix: "article/02_领域/",
      link: "article/02_领域/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "资源",
      icon: "laptop-code",
      prefix: "article/03_资源/",
      link: "article/03_资源/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "归档",
      icon: "laptop-code",
      prefix: "article/04_归档/",
      link: "article/04_归档/",
      children: "structure",
      collapsible: true,
    },
  ],
});
