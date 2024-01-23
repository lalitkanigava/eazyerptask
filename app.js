const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const sequelize = require("./db/connection")
const authRouter = require("./route/auth")
const userRouter = require("./route/user")
const notFoundMiddleware = require("./middleware/notfound")
const customErrorHandlerMiddleware = require("./middleware/errorHandler")

app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)

app.use(notFoundMiddleware)
app.use(customErrorHandlerMiddleware)

const start = async () => {
    try{
      await sequelize.authenticate();
      app.listen(port, ()=>{
        console.log("app running on port")
      })
    }catch(err){
         console.log(err)           
    }

}

start()