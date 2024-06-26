import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import sveltePreprocess from "svelte-preprocess";
import process from "process";
import builtins from "builtin-modules";
import fs from "fs";

const prod = process.argv[2] === "production";

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

fs.copyFileSync("manifest.json", "dist/manifest.json");
fs.copyFileSync("versions.json", "dist/versions.json");

const context = await esbuild.context({
  plugins: [
    esbuildSvelte({
      compilerOptions: { css: "injected" },
      preprocess: sveltePreprocess(),
    }),
  ],
  entryPoints: ["main.ts", "styles.css"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins,
  ],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outdir: "dist",
});

if (prod) {
  await context.rebuild();
  process.exit(0);
} else {
  await context.watch();
}
