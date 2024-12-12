import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "个人知识库",
  description: "Just-blog",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
