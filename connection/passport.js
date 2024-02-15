const passport=require("passport")
const LocalStrategy= require("passport-local").Strategy
const modal=require("../models/user")
const bcrypt= require("bcrypt")
function initialize(){
passport.use(new LocalStrategy({usernameField:"Email",passwordField:"Password"},async(Email,Password,done)=>{
    try{
        const user= await modal.findOne({where:{Email:Email}})
         
         if(!user)
          return done(null,false,{message:"no user with this email"})
        else{
            const result= await bcrypt.compare(Password,user.Password)
            console.log(result)
            if(result)
            return done(null,user)
            else
            return done(null,false,{message:"Password is incorrect"})
        }
     }catch(err){
         return done(err)
     }
}))
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    modal.findOne({where:{id:id}}).then(function(user) { done(null, user);});
});
}
module.exports=initialize;
