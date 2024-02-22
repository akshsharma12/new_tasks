const swaggerAutogen= require("swagger-autogen")

const option={
     defination:{
        openapi:"3.0.1",
        info:{
            title:"crud_operation",
            version:"1.0.0",
            description:"A simple express crud_operation Api"
        },
                host:"http://localhost:5000",
                basePath:"/"
     }
}
const outputFile="./swagger.json";
const endpointsFiles=["./routes/route.js"];
swaggerAutogen(outputFile,endpointsFiles,option)