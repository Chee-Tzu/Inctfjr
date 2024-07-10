var express=require('express');
var app=express();
var { exec } = require('child_process');
var bodyParser = require('body-parser');

app.use(express.static("./views"));


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("main",{result:"main page"})
});
app.get('/search',(req,res)=>{
    res.render('search.ejs');
})
 
app.post('/search', (req, res) => {
    const place = req.body.place;
    var list=['ls', 'cat' ,'js','ejs','css','json'];
    function check(place,list){
        for (let i=0;i<list.length;i++){
            if (place.includes(list[i])){
                return true;
            }
        }
        return false;
    }
    if (check(place,list)){
        res.send('No hacking!!');
        return
    }else{
        exec(`cat views/characters/${place}`, (error, stdout, stderr) => {
            if (error) {
                res.status(500).send('No such place found!');
                return;
            }
            const result = stdout || stderr;
            res.send(result);
        });
    }

});

app.listen(4321,()=>{console.log("startedddd!! at http://localhost:4321")})

