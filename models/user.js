const {DataTypes}= require("sequelize")

const sequelize=require("../connection/database")
const bcrypt=require("bcrypt")

const User= sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        unique:true,    
    },
    FirstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    LastName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:
    {
      type:DataTypes.ENUM,
      values: ['user','admin',],
      defaultValue:"user",
    },
    isregister:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
},
)
// User.beforeCreate(async (User) => {
//     console.log(User.Password)
//     User.Password = await bcrypt.hash(User.Password, 10);
//   });


module.exports=User;