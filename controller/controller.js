const modal= require("../models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const secretKey="donnn"
const postmodal=require("../models/post")
const CsvParser= require("json2csv").Parser
const csvto= require("csvtojson")


async function signUp(req,res){
    try{
    const value= await bcrypt.hash((req.body.Password),10)
    const data={
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Email:req.body.Email,
        Password:value,
        role:req.body.role
    }

    const result= await modal.findOne({where:{Email:req.body.Email}})
    if(!result)
    {
       const result1= await modal.create(data)
        await modal.update({isregister:true},{where:{Email:req.body.Email}})
    //    console.log(result1)
        res.status(200).json({
            statuscode:200,
            message:"data is inserted"
        })
    } else
    {
        res.json({ message:"user exit"})
    }
    }catch(err)
    {
        res.json({message:err.message})
    }
}

async function Login(req,res){
    const result= await modal.findOne({where:{Email:req.body.Email,isregister:true}})
    if(result)
    {
        const result1= await bcrypt.compare(req.body.Password,result.Password)
        console.log(result1)
        if(result1)
        { 
            token=jwt.sign({id:result.id,Email:result.Email},secretKey,{expiresIn:"2h"})
            res.status(200).json({
                message:"Login successfully",
                data:token
            })
        }
        else
            res.json({ message:"password is incorrect" })
    }else{
        res.json({
            message:"user is not registered"
        })
    }
}

async function getuser(req,res)
{
    try{
    const result= await modal.findAll()
    res.status(200).send(result)
    }catch(err)
    {
        res.send(err)

    }
}

async function getUserById(req,res)
{
    try{
    const result= await modal.findOne({
        where:{
            id:req.params.id
        }
    })
    res.status(200).send(result)
}catch(err)
{
    res.send(err)
}
}

async function UpdateById(req,res){
    const data={
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Password:req.body.Password
    }
    try{
     const result= await modal.update(data,{
        where:{
            id:req.params.id
        }
     })
     console.log(result)
     res.status(200).send("data updated")
    }catch(err)
    {
        res.status(200).send(err)
    }
}

async function deleteById(req,res)
{
    try{
    const result= await modal.destroy({where:{
        id:req.params.id
    }})
    res.status(200).send("user deleted")
}
catch(err)
{
    res.send(err)
}
}

// async function update(req,res){
//     try{
//     const result= await modal.findOne({where:{Email:req.body.Email,isregister:true}})
//     if(result){
//     const result1=await bcrypt.compare(req.body.Password,result.Password)
//     if(result1)
//     {
//          await result.update({Password:await bcrypt.hash(req.body.NewPassword,10)},{where:{Email:req.body.Email}})
//          res.json({ message:"Password update successfully"})
//     }else
//     res.json({message:"password is incorrect"})
//   }
// }catch(err)
// {
//     res.json({message:err.message});
// }
// }

// async function deleete(req,res){
//   const result= await modal.findAll({Email:req.body.Email,isregister:true})
//   if(result){
//   await modal.destroy({where:{id:req.id}})
// res.json({
//     message:"user data deleted successfully"
// })}
// else 
// res.json({message:"user not exit"})
// }

// async function addPost(req,res)
// {
//   try{
//     const data={
//         discription:req.body.discription,
//         userId:req.id
//     }
//     await postmodal.create(data)
//     res.status(200).send({message:"post created"})
//   }catch(err)
//   {
//    res.status(400).send(err)

//   }
// }

async function exportUser(req,res){
    try{
    const users=[];
    const userData= await modal.findAll()


    userData.forEach((user)=>{
        const {id,FirstName,LastName,Email,Password,role}=user
       users.push({id,FirstName,LastName,Email,Password,role})
    });

    const titlefield= ["id","FirstName","LastName","Email","Password","role"]
    const csvParser= new CsvParser({titlefield})
    const csvData= csvParser.parse(users);

    res.setHeader("content-Type","text/csv");
    res.setHeader("content-Disposition","attachment:filename=userData.csv")

    res.status(200).end(csvData)
}catch(err)
{
    res.send({
       status:400,
       success:false,
       msg:err.message
    })
}
}

async function importUser(req,res){
    try{
        const userData=[];
       const result= await csvto()
       .fromFile(req.file.path)
       if(result)
       {
        for(var x=0;x<result.length;x++){
            userData.push({
                id:result[x].id,
                FirstName:result[x].FirstName,
                LastName:result[x].LastName,
                Email:result[x].Email,
                role:result[x].role,
                Password:result[x].Password
            })
        }
        await modal.bulkCreate(userData)
        res.status(200).send("data inserted")
       }
       
    
    }catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}


module.exports=
{signUp,
 Login,
getuser,
getUserById,UpdateById,deleteById,
exportUser,importUser}
