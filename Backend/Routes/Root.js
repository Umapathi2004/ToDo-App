const express = require("express")
const router = express.Router();
const fs = require("fs").promises
const path = require("path")
const Data = {
    Elements:require("../Data.json"),
    SetElements:function(Data){  
        this.Elements = Data?Data:this.Elements;
    }
}

router.route("/")
    .get((req,res)=>{
        Data.Elements.length?
        res.status(200).json(Data.Elements):
        res.status(404).json({"message":"Emty Dataset..."})  
    })
    .post(async (req,res)=>{
        const id = Data.Elements.length?Data.Elements[Data.Elements.length-1].id+1:1;
        const name = req.body.name;
        const age = req.body.age;
        const city = req.body.city;
        console.log(name,age,city)
        if(name && age && city){
            const result = [...Data.Elements,{"id":id,"name":name,"age":age,"city":city}]; 
            Data.SetElements(result);
            await fs.writeFile(path.join(__dirname,"..","Data.json"),JSON.stringify(result))
            res.status(200).json(result);
        }
        else{
             console.log("Enter Valide Inputs...")
        }
    })
    .put(async (req,res)=>{
        const id = req.body.id;
        const name = req.body.name;
        const age = req.body.age;
        const city = req.body.city;
        if(id && name && age && city){
            const result = Data.Elements.map((Data)=>Data.id==id?{...Data,name,age,city}:Data);
            Data.SetElements(result);
            await fs.writeFile(path.join(__dirname,"..","Data.json"),JSON.stringify(result))
            res.status(200).json(result);
        }
        else{
            console.log("Enter Valide Inputs...")
        } 
    })
    .delete(async (req,res)=>{
        const id = req.body.id;
        console.log(id);
        if(id){ 
        const result = Data.Elements.filter((Data)=>Data.id!=id)
        Data.SetElements(result);
        await fs.writeFile(path.join(__dirname,"..","Data.json"),JSON.stringify(result))
        res.status(200).json(result);  
        }
        else{
            console.log("Enter Valide Inputs...")
        }
    })

module.exports = router; 