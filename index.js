#!/usr/bin/env node

const path = require("path");
const fsPromises = require("fs/promises");
const zipper = require("zip-local");

async function readConfig(pathname) {
  const prorc = path.join(process.cwd(), pathname);
  const data = await fsPromises.readFile(prorc);
  return JSON.parse(data.toString("utf-8"));
}

async function main() {
  try {
    const args = process.argv.splice(2);

    if (args.length === 0) return;

    let inner;
    let outer;
    if (args.length === 1) {
      const opts = await readConfig(args[0]);
      inner = opts?.dist || "/dist";
      outer = opts?.output || "/dist.zip";
    } else if (args.length > 1) {
      inner = args[0] || "/dist";
      outer = args[1] || "/dist.zip";
    }

    const distPath = path.join(process.cwd(), inner);
    const savePath = path.join(process.cwd(), outer);

    zipper.sync.zip(distPath).compress().save(savePath);

    console.log(
      `----------------\n\n压缩完成！路径：${savePath}\n\n----------------`
    );
  } catch (e) {
    console.error(e);
  }
}

main();
