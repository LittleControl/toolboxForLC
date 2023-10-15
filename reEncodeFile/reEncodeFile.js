// 批量更改文件编码
const fs = require("fs");
const iconv = require("iconv-lite");

// 获取命令行参数
const args = process.argv.slice(2);

// 源文件夹路径
// const sourceFolder = args[0] ?? "./";

const sourceFolder = "/Users/knowsky/Clouds/toolboxForLC/reEncodeFile/src";

// 目标文件夹路径
// const targetFolder = args[1] ?? "./res";

const targetFolder = "/Users/knowsky/Clouds/toolboxForLC/reEncodeFile/res";

// 源编码和目标编码
const sourceEncoding = "utf-8"; // 原始文件编码
const targetEncoding = "gbk"; // 目标文件编码

// 获取源文件夹中的文件列表
const files = fs.readdirSync(sourceFolder);

// 遍历文件并逐个更改编码
files.forEach((file) => {
  const sourceFilePath = `${sourceFolder}/${file}`;
  const targetFilePath = `${targetFolder}/${file}`;

  // 读取源文件内容
  const contentBuffer = fs.readFileSync(sourceFilePath);

  // 更改编码
  const convertedContent = iconv.decode(contentBuffer, sourceEncoding);

  // 将更改后的内容写入目标文件
  fs.writeFileSync(
    targetFilePath,
    iconv.encode(convertedContent, targetEncoding)
  );
});

console.log("文件编码更改完成！");
