const express= require("express")
const app= express();
const path=require("path")
const tempelatepath=path.join(__dirname,"./tempelates")
const cons=require("consolidate")
const sequelize= require("./connection/database")
const user=require("./models/user")
const bodyparser=require("body-parser")
const router=require("./routes/route")
const cors=require("cors")

const passport=require("passport")
const session=require("express-session");

const swaggerUI= require("swagger-ui-express");
const swaggerDocument= require("./swagger.json")
require("./connection/passport")(passport)
const port=5000;
// initializepassport(passport)

app.use(session({
    secret:"hello",
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize())
app.use(passport.session())




app.use(express.json())
app.engine("html",cons.swig)
app.set("view engine","html")
app.set("views",tempelatepath)
app.use(express.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.resolve(__dirname,"files")))
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument))
app.use(router)
app.use(cors())


app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/sign",(req,res)=>{
    res.render("sign")
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/update",(req,res)=>{
    res.render("update")
})
app.get("/delete",(req,res)=>{
    res.render("delete")
})

sequelize.sync(
    {FORCE:true,
    alter:true})
.then(()=>{
    console.log("All successful")
})
.catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log(`port connected ${port}`)
})