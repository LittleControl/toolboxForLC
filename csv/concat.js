/*
  字段拼接
  province: 省分编码
  table_schema: 中心库
  province_flag: 是否分省 boolean
  file 文件地址 string
*/

const fs = require("fs")
const readline = require("readline")
const os = require("os")
const path = require("path")

async function processLineByLine(
  province,
  table_schema,
  perfix,
  province_flag,
  file
) {
  const readFileStream = fs.createReadStream(file)
  const writeFileStream = fs.createWriteStream("./out.txt")

  const rl = readline.createInterface({
    input: readFileStream,
    crlfDelay: Infinity,
  })

  if (province_flag) {
    for await (const line of rl) {
      writeFileStream.write(
        `create view zq_user_${province}.${perfix}_${line}
         as select * from ${table_schema}.${line}
         where province_code = ${province};${os.EOL}
         `
      )
    }
  } else {
    for await (const line of rl) {
      writeFileStream.write(
        `create view zq_user_${province}.${perfix}_${line}
         as select * from ${table_schema}.${line};${os.EOL}`
      )
    }
  }
  rl.close()
}

processLineByLine(50, "clzx_gem", "gem", false, "./table.txt")
