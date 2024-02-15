const Sequelize=require("sequelize")
const sequelize=require("../connection/database")
const post= sequelize.define("post",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        unique:true,
        allowNull:true,
        autoIncrement:true,
    },
    discription:{
        type:Sequelize.STRING,
    },
})
const user= require("../models/user")
post.belongsTo(user,{foreignKey:"userId"})
module.exports=post