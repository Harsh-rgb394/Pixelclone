const express=require("express")
const multer=require("multer")
const axios=require("axios")
// const fs=require("fs")




const router=express.Router();
// const API_KEY=process.env.API_KEY;
// console.log(API_KEY);

// multer for uploading or acccepting the image
const upload=multer({storage:multer.memoryStorage()}) 
// its for storing or using multer storage 

router.post("/searchbyimage",upload.single("image"),async(req,res)=>{  
    try {
        

        // const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const base64 = req.file.buffer.toString("base64");


        const response=await axios.post(
            "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
            { inputs: base64},
            {
              headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
        )


        console.log(response.data[0].generated_text);
        const info =response.data[0].generated_text;

        res.json({info,success:true})

       
        
    
    } catch (error) {
        console.log(error)
    }
}) 



router.post("/searchbyurl",async(req,res)=>{
    const {imageurl}=req.body;
    try {
       
        const response=await axios.post(
            "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
            { inputs: imageurl },
            {
              headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
        )


        console.log(response.data[0].generated_text);
        const info =response.data[0].generated_text;
        res.json({info,success:true})

        
    } catch (error) {
        console.log(error);
        
    }
})


router.post("/searchbybase",async(req,res)=>{
  const {base64}=req.body;
  try {
    const cleanedBase64 = base64.replace(/^data:image\/\w+;base64,/, "");

    const response=await axios.post(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      { inputs: cleanedBase64 },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
  )


  console.log(response.data[0].generated_text);
  const info =response.data[0].generated_text;
  res.json({info,success:true})
  } catch (error) {
    console.log(error);
  }
})


module.exports=router;