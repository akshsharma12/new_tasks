const express=require("express")
const router=express.Router();
const {signUp,Login,update,deleete,addPost,getuser,getUserById,UpdateById,deleteById
,exportUser,importUser}=require("../controller/controller")
// const passport=require("passport")
const {verifyToken,author,isverify, upload}=require("../middleware/middleware");
// const passport = require("passport");

// router.post("/user",signUp)
// router.post("/login",passport.authenticate('local',{successRedirect:"/",failureFlash:true}))
// router.post("/login",Login)
// router.post("/update",isverify,update)
// router.post("/update",update)
// router.post("/delete",verifyToken,author("admin"),deleete)
// router.post("/post",verifyToken,addPost)

router.post("/user",signUp)
router.post("/user/login",Login)
router.get("/user",getuser)
router.get("/user/:id",getUserById),
router.put("/user/:id",UpdateById)
router.delete("/user/:id",deleteById)

router.get("/export",exportUser)
router.post("/import",upload,importUser)

module.exports=router;