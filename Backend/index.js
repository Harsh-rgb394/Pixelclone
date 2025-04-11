const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true,limit:'50mb'}));


app.get("/",(req,res)=>{
    res.send("Hello from server")
})

app.use("/api",require("./routes/ApiRoute"))
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})   
