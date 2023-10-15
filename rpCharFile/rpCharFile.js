// 替换特殊字符

const fs = require("fs");
const readline = require("readline");
const os = require("os");
const path = require("path");

// 获取命令行换行字符
const args = process.argv.slice(2);

// 默认特殊字符
let specCharCode = [
  String.fromCharCode("1"),
  String.fromCharCode("10"),
  String.fromCharCode("13"),
];

// 添加自定义特殊字符
args.forEach((value) => specCharCode.push(String.fromCharCode(value)));

// 此处填入文件路径
processLineByLine("./tmp.txt");

async function processLineByLine(file) {
  const readFileStream = fs.createReadStream(file);
  const writeFileStream = fs.createWriteStream("./out.txt");

  const rl = readline.createInterface({
    input: readFileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let tmpLine = `${line}`;
    for (let i = 0; i < specCharCode.length; i++) {
      tmpLine = tmpLine.replaceAll(specCharCode[i], "");
    }
    writeFileStream.write(`${tmpLine}${os.EOL}`);
  }

  rl.close();
}
