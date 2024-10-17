const fs = require("fs").promises;
const path = require("path");
const date = new Date;
const TimeDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}  ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`

const HandelEventes =async (req,res,next)=>{
  const Data = `${TimeDate} ${req.hostname} ${req.method} ${req.url} ${req.headers.origin}\n`
  await fs.appendFile(path.join(__dirname,"Logs","Events.txt"),Data);
  next()
}

const HandelErrors =async (err,req,res,next)=>{
    const Data = `${TimeDate} ${req.hostname} ${req.method} ${req.url} ${req.headers.origin} ${err.message}\n`
    await fs.appendFile(path.join(__dirname,"Logs","Errors.txt"),Data);
    next()
}
module.exports ={HandelEventes,HandelErrors}