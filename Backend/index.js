const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const Operation = require("./CorsOperation")
const Logs = require("./Logs")
const Root = require("./Routes/Root.js")
app.use(bodyParser.json()) 
app.use(cors(Operation));
app.use(Logs.HandelEventes); 
app.use("/",Root); 

app.all("*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"Root","404.html"));
})

app.use(Logs.HandelErrors);
app.listen(port,()=>console.log(`This Server was running on http://localhost:${port}`));