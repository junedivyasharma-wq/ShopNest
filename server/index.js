import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
});

import connectDb from "./config/db.js";
import {app} from "./app.js";

app.get("/",(req,res)=>{
    res.send("Shopnest backend is working fine");
})

connectDb()
.then(()=>{
    const PORT=process.env.PORT || 5000;
    app.listen(PORT,()=>{
        console.log(`App is listening on Port : ${PORT}`);
    })
})
.catch((error)=>{
    throw new Error("MongoDb connection ERROR !!",error);
})
