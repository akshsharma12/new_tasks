const model=require("../models/user")
const jwt=require("jsonwebtoken")
const secretKey="donnn";
const multer= require("multer")

async function verifyToken(req,res,next){
    try{
const header= req.headers['authorization']
if(typeof header != "undefined")
{
    const b=header.split(" ")
    const token=b[1];
    req.token=token
    const result= jwt.verify(req.token,secretKey)
    const us=await model.findOne({where:{id:result.id,Email:result.Email}})
    if(us)
    {
        req.id=result.id;
        next();
    }
}
    }catch(err)
    {
      res.json({ message:err.message})
    }}

    

    function author(role){
        return async(req,res,next)=>{
        const result= await model.findOne({where:{id:req.id}})
          if(result.role!=role)
          res.json("you don't have permission")
        else
        next();
        }
    }

    function isverify(req,res,next){
        if(req.isAuthenticated())
        {
        next()
        }
    else
    res.redirect("/login")

    }

    const upload= multer({
        storage:multer.diskStorage({
           destination:function(req,res,cb){
            cb(null,"files")
           },
           filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".csv")
           }
        })
    }).single("file")

module.exports={verifyToken,author,isverify,upload};