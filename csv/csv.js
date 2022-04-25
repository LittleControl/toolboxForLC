const fs = require("fs")
const readline = require("readline")
const os = require("os")
const path = require("path")

function isDir(path) {
  try {
    var stat = fs.lstatSync(path)
    return stat.isDirectory()
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false
  }
}

async function processLineByLine(dir) {
  const files = await getAllFiles(dir)
  for (let i = 0; i < files.length; i++) {
    if (isDir(path.join(dir, files[i]))) continue
    const readFileStream = fs.createReadStream(path.join(dir, files[i]))
    const writeFileStream = fs.createWriteStream(
      path.join(dir, "_new" + files[i])
    )

    const rl = readline.createInterface({
      input: readFileStream,
      crlfDelay: Infinity,
    })
    let postLine = ""
    for await (const line of rl) {
      if (line.charAt(0) == '"') {
        if (postLine !== "") {
          writeFileStream.write(postLine + os.EOL)
          postLine = ""
        }
      }
      postLine += line.replaceAll("\\", "/")
    }
    if (postLine !== "") {
      writeFileStream.write(postLine + os.EOL)
      postLine = ""
    }
  }
}

async function getAllFiles(dir) {
  const files = await fs.promises.readdir(dir)
  return files
  // return ["temp.csv"]
}

processLineByLine(
  "D:/Work/AboutData/_OB杂项/_一站式数据导入/一站式表数据/OSS_REQSHT"
  // "."
)
