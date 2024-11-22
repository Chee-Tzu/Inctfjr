var express= require('express');
var app=express();
app.use(express.static("./views"));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const port=1234;
app.set('view engine','ejs');

var pokemons = ['Snorlax', 'Fearow','Scizor','Vulpix','Squirtle'];
app.get('/change',(req,res)=>{
    var random=Math.floor(Math.random()*pokemons.length);
    var pokemon= pokemons[random];
    console.log(pokemon)
    res.cookie('pokemon',btoa(pokemon));
    res.redirect('/');
})
app.get('/',(req,res)=>{
    var nice='ths is cool';
    if (!req.cookies.pokemon){
        res.cookie('pokemon',btoa('fearow'))    ;
    }
    var pokemon= atob(req.cookies.pokemon) || btoa('fearow');
    res.render("main",{pokemon:pokemon.toLowerCase(),mm:nice});
})
app.get('/secret',(req,res)=>{
    if (atob(req.cookies.pokemon)==="pikachu"){
        msg='inctfj{P1K4CHU_11K35_C00K135}';
    }else{
        msg="YOU ARE NOT PIKACHU!!"
    }
    res.render("secret",{msg:msg})
})
app.listen(port,()=>{console.log(`startedddd!! http://localhost:${port}`)})
