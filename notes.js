var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

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
        //callBack();        
        main.init();
    };    
    //notesImage.src = "http://172.18.139.142/notes.png";      
    notesImage.src = "https://notendur.hi.is/~rsr5/notes.png";

}
preload();

    
function debug(ctx, text)
{            
    ctx.fillStyle = "white";
    ctx.fillRect(150,150,400,400);
    ctx.fillStyle = "black";
    ctx.fillText(text,200,200);    
}