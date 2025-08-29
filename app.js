const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let posts=[{
    id:"1a",
    username:"Aman",
    info:"I love coding.."

},
{
    id:"2a",
    username:"Amar",
    info:"Hardwork will never fail"
}
];
 app.get("/posts",(req,res)=>{
    res.render("index",{posts});
 });

 app.get("/posts/new",(req,res)=>{
    res.render("new");
 })
 app.post("/posts",(req,res)=>{
    let {username,info}=req.body;
    posts.push({username,info});
    res.redirect("/posts");
   
 })
 app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render("show",{post});
 })

app.listen(3000,()=>{
    console.log("listenning.....");
})


