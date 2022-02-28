#!/usr/bin/env node

const path = require("path");
const zipper = require("zip-local");

async function main() {
  try {
    const args = process.argv.splice(2);

    const distPath = path.join(process.cwd(), args[0] || "/dist");
    const savePath = path.join(process.cwd(), args[1] || "/dist.zip");

    zipper.sync.zip(distPath).compress().save(savePath);

    console.log(
      `----------------\n\n压缩完成！路径：${savePath}\n\n----------------`
    );
  } catch (e) {
    console.error(e);
  }
}

main();
