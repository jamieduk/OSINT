// server.js
// Author: J~Net
// Purpose: OSINT Quick Launcher server

const express=require("express");
const path=require("path");
const multer=require("multer");
const bodyParser=require("body-parser");
const axios=require("axios");
const fs=require("fs");

const app=express();

// Upload folder setup
const uploadFolder=path.join(__dirname,"public","uploads");
if(!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Serve uploads with correct headers for public access
app.use('/uploads', express.static(uploadFolder,{
    setHeaders:(res,filePath)=>{
        const ext=filePath.split('.').pop().toLowerCase();
        const types={jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',gif:'image/gif',bmp:'image/bmp',tiff:'image/tiff',webp:'image/webp'};
        if(types[ext]) res.setHeader('Content-Type',types[ext]);
    }
}));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,uploadFolder),
    filename:(req,file,cb)=>{
        const ext=path.extname(file.originalname);
        cb(null,Date.now()+ext);
    }
});
const upload=multer({storage});

const config={
    PORT:8910,
    SOCIALSEARCHER_API_KEY:'',
    EPIEOS_API_KEY:''
};

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.json({limit:"5mb"}));
app.use(bodyParser.urlencoded({extended:true}));

// SocialSearcher proxy
app.get("/api/socialsearch",async(req,res)=>{
    try{
        const q=req.query.q||"";
        const key=config.SOCIALSEARCHER_API_KEY||process.env.SOCIALSEARCHER_API_KEY;
        if(!key) return res.status(400).json({error:"no_api_key"});
        const url=`https://api.social-searcher.com/v2/search?q=${encodeURIComponent(q)}&key=${key}`;
        const r=await axios.get(url);
        res.json(r.data);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// Reverse lookup placeholder
app.get("/api/reverse",async(req,res)=>{
    return res.status(400).json({error:"not_configured"});
});

// Image upload endpoint
app.post("/upload-image",upload.single("photo"),(req,res)=>{
    try{
        if(!req.file) return res.status(400).json({error:"no_image"});
        const fileUrl=`/uploads/${req.file.filename}`;
        res.json({url:fileUrl});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

app.listen(config.PORT,()=>console.log("Server running on port "+config.PORT));

