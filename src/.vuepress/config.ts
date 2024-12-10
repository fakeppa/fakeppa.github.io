import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/README",

  lang: "zh-CN",
  title: "fakeppa",
  description: "Just-blog",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
