import express from 'express';
const app = express(); 
const port = 3000;
app.use(express.json())
 let teadata=[]
 let idea=1
 app.post('/teas',(req,res)=>{
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
