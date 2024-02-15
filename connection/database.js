const Sequelize=require("sequelize");
const sequelize=new Sequelize("employees","root","password",{
    dialect:"mysql",
    host:"localhost"
})

module.exports=sequelize;