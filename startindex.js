import bodyParser from "body-parser"
import express from "express";

const app = express();
const port =3000;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
let date = new Date();
let day = date.getDay();
let datatype = "its weekday";
let advise ="time to work hard";
if(day==0 || day ==6){
 datatype = "Its weekend ";
advise =" time to have fun";
}
res.render("startindex.ejs",{datatype:datatype, advise:advise});
}

);


app.listen(port,()=>{

})
