const express=require("express");
const app=express();
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let posts=[{
    id:uuidv4(),
    username:"Aman",
    info:"I love coding.."

},
{
    id:uuidv4(),
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
   let id=uuidv4();
    let {username,info}=req.body;
    posts.push({id,username,info});
    res.redirect("/posts");
   
 })
 app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render("show",{post});
 });
 app.get("/posts/:id/edit",(req,res)=>{
   let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
   res.render("edit",{post});
 })
app.patch("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post=posts.find((p)=>p.id===id);
   let newcontent=req.body.info;
   post.info=newcontent;
   res.redirect("/posts");

})
app.delete("/posts/:id",(req,res)=>{
   let {id}=req.params;
   posts=posts.filter((p)=>p.id!=id);
   res.redirect("/posts");


})
app.listen(3000,()=>{
    console.log("listenning.....");
})


