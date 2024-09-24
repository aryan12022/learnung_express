import 'dotenv/config'
import express from 'express';

import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";


const app = express(); 
const port = process.env.PORT || 3000;
app.use(
   morgan(morganFormat, {
     stream: {
       write: (message) => {
         const logObject = {
           method: message.split(" ")[0],
           url: message.split(" ")[1],
           status: message.split(" ")[2],
           responseTime: message.split(" ")[3],
         };
         logger.info(JSON.stringify(logObject));
       },
     },
   })
 );
app.use(express.json())
 let teadata=[]
 let idea=1
 app.post('/teas',(req,res)=>{
   logger.info("a post req is made to make a new tea")
    const {name , price}=req.body
    const newid={id:idea++,name,price};
    teadata.push(newid);
    res.status(200).send(newid)
 })
 app.get('/teas',(req,res)=>{
    res.status(200).send(teadata)
 })

 app.get('/teas/:id',(req,res)=>{
   const tea=teadata.find(t=>t.id===parseInt(req.params.id))
   if(!tea){
    res.status(404).send("not found")
   }
res.status(200).send(tea)
   
 })
 // update tea
 app.put('/teas/:id',(req,res)=>{
   const tea = teadata.find(t=>t.id ===parseInt(req.params.id))
   if(!tea){
      return res.status(404).send("tea not found")
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
 })
 app.delete('/teas/:id',(req,res)=>{
   const index = teadata.findIndex(t=>t.id ===parseInt(req.params.id))
   if(index==-1){
      return res.status(404).send("tea not found")
    }
  teadata.splice(index,1)
  return res.status(200).send('tea deleted')
 })


 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
