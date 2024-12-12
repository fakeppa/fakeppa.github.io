import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "问己",
  description: "",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
