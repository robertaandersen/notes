var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



function main(){
        
    var p = new Page();    
    p.addBar();
    p.addBar();
    p.addBar();
    p.addBar();
    p.addNote(p.getBar(0), "c4");
    p.addNote(p.getBar(0), "d4");
    p.addNote(p.getBar(0), "e4");
    p.addNote(p.getBar(0), "f4");    
    p.addNote(p.getBar(1), "c4");
    p.addNote(p.getBar(2), "h3");
    p.render();    
}


    
function debug(ctx, text)
{            
    ctx.fillStyle = "white";
    ctx.fillRect(150,150,400,400);
    ctx.fillStyle = "black";
    ctx.fillText(text,200,200);    
}
// =============
// PRELOAD STUFF
// =============
var notes;
function preload(callBack){    
    var notesImage = new Image();
    notesImage.onload = function(){
        notes = new Sprite({
            image : notesImage    
        });            
        callBack();        
    };    
    //notesImage.src = "http://172.18.139.142/notes.png";      
    notesImage.src = "https://notendur.hi.is/~rsr5/notes.png";
}
preload(main);