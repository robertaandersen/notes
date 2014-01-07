var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Construct a "sprite" from the given `image`
//
function Sprite(descr) {    
    for (var property in descr) {
        this[property] = descr[property];
    }
}
//Sprite.prototype.image = new Image();
Sprite.prototype.draw = function (ctx, noteX, noteY,duration) {
        
    this.spriteWidth = 36;
    
    var sx = this.getSpriteX(duration);
    var sy = this.spriteWidth + 11;
    var swidth = this.spriteWidth; 
    var sheight = this.spriteWidth; 
    var x = noteX;
    var y = noteY;
    var width = this.spriteWidth; 
    var height = this.spriteWidth;                     
    ctx.drawImage(this.image,sx,sy,swidth,sheight,x,y,width,height);
    //ctx.drawImage(this.image, 100,100);            
};

Sprite.prototype.getSpriteX = function(duration){        
    switch(duration)
    {
        //wholenote
        case 1:
          return 0;          
        //halfnote
        case 2:
          return this.spriteWidth;        
        //halfnote
        case 4:
          return this.spriteWidth * 2;
        //eigth etc..
        case 8:
          return this.spriteWidth * 3;
        case 16:
          return this.spriteWidth * 4;
        case 32:
          return this.spriteWidth * 5;
        case 128:
          return this.spriteWidth * 6;
    }
};

function main(){
    /*************************************************************************/
    var Page = function(descr){
        for(var parameter in descr){
            this[parameter] = descr[parameter];   
        }
        this.init();
    };
    
    Page.prototype.init = function(){              
        this.rMargin = 0 ? this.rMargin : (canvas.width - this.lMargin);                
    };
    
    
    Page.prototype.lMargin = 5;
    Page.prototype.rMargin = 0;
    Page.prototype.staffSpace = 55;
    Page.prototype.topMargin = 75;
    Page.prototype._bars = [];
    Page.prototype.getBar = function(){
      return this._bars[0];  
    };
    
    Page.prototype.updateBars = function(){            
        
        var barIdx = 0;
        var lineIdx = 0; 
        for(var i = 0; i < this._bars.length; i++)
        {                
            var bar = this._bars[i];
            bar.firstInLine = false;
            bar.barLength = bar.getBarLength();                        
            var cx = this.lMargin + (bar.barLength * barIdx++);         
            if( cx >=  this.rMargin)
            {            
                lineIdx++;    
                barIdx = 0;
                cx = this.lMargin;
                bar.firstInLine = true;
            }                
            bar.cx = cx;        
            bar.cy = this.topMargin + (this.staffSpace * lineIdx);   
            bar.updateStaff();            
        }    
    };
    
    Page.prototype.render = function(){    
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,100,200);
        ctx.stroke();
        for(var i = 0; i < this._bars.length; i++)
        {    
            var bar = this._bars[i];
            var f = false;            
            if(bar.firstInLine || i === 0) f = true;                                  
            if(i == this._bars.length -1) f = "last";
            
            bar.drawBar(bar.cx, bar.cy, bar.barLength, bar.barHeight, f);
            bar.staff.drawStaff();
            bar.drawNotes();          
        }    
    };
    /*************************************************************************/
    
    var Staff = function(descr){
        for(var parameter in descr){
            this[parameter] = descr[parameter];   
        }
        this.markStaff();
    };
    
    Staff.prototype.cy = 75; 
    Staff.prototype.cx = 5; 
    Staff.prototype.staffLength = 0; 
    Staff.prototype.spacing = 7;
    Staff.prototype.height = 7*4;
    Staff.prototype.pitches = [];
    Staff.prototype.drawStaff = function(){
        
        for(var i = 0; i < 5; i++){
            var sp = i * this.spacing;         
            ctx.beginPath();
            ctx.moveTo(this.cx, this.cy + sp);
            ctx.lineTo(this.cx + this.staffLength, this.cy + sp);                        
            ctx.stroke();    
        }        
    };
    
    Staff.prototype.markStaff = function(){
        var pitch = ["c","d","e","f","g","a","h"];
        var _notes = [];
        for(var i=0; i<=9; i++){
            for(var j = 0; j < pitch.length; j++){
                _notes.push(pitch[j] + i);          
            }
        }                
        var noteY = this.spacing/2;
        var idx = _notes.indexOf("d4");
        this.pitches = [];
        this.pitches[_notes[idx]] = this.cy; 
        var count = 1; 
        for(var jj = idx+1; jj < _notes.length; jj++)
        {
            var _note = _notes[jj] +"";            
            var _y = this.cy - (count * noteY);
            this.pitches.push(
                {
                    _note : _note,
                    pitchY : _y
                });
            count++;            
        }                                                
    };
    
    Staff.prototype.getY = function(note){
        for(var obj in this.pitches)
        {
            var idx = this.pitches[obj];
            if(idx._note == note) return idx.pitchY;            
        }
        return false; 
    };
    /*************************************************************************/
    
    var Bar = function(descr){
        for(var parameter in descr){
            this[parameter] = descr[parameter];   
        }
    };
    Bar.prototype.parentPage = null;
    Bar.prototype.staff = null;
    Bar.prototype.top = null;
    Bar.prototype.barHeight = null;
    Bar.prototype._notes = new Array();
    Bar.prototype.getBarLength = function(){
     
        return (this.parentPage.rMargin - this.parentPage.lMargin)/4;        
    };
     
    Bar.prototype.addNote = function(note){                
        this._notes.push({
            noteX : null,
            noteY : this.staff.getY(note),
            duration : 4,
            drawn : 0            
        });        
        this.alignNotes();
    };
    Bar.prototype.alignNotes = function(){
        var margin = 8; 
        var len = this.getBarLength() - (margin * 2);                
        var sp = len/(this._notes.length);                  
        var fNote = this.cx + margin;        
        for(var j = 0; j < this._notes.length; j++)
        {
            this._notes[j].noteX = fNote + (sp * j);
        }
        
    };
    Bar.prototype.updateStaff = function(){
        this.staff.staffLength = this.barLength; 
        this.staff.cy = this.cy; 
        this.staff.cx = this.cx;         
    };
    
    Bar.prototype.drawBar = function(cx, cy, barLength, barHeight, firstInLine){        
        ctx.beginPath();
        ctx.moveTo(cx + barLength, cy);
        ctx.lineTo(cx + barLength, cy + barHeight);
        ctx.stroke();        
        
        if(firstInLine) this.drawBar(this.parentPage.lMargin, this.cy, 0, this.barHeight, false);
        if(firstInLine == "last"){
                for(var j = 2; j > 0; j--){
                    this.drawBar(this.cx + this.barLength - j, this.cy, 0, this.barHeight);
                }
                this.drawBar(this.cx + this.barLength - 5, this.cy, 0, this.barHeight);                
            } 
    };               
    Bar.prototype.drawNotes = function(){
        for(var i = 0; i< this._notes.length; i++)
        {
            var n = this._notes[i];
            var y = n.noteY;            
            var x = n.noteX;            
            notes.draw(ctx,x,y + n.drawn *10,n.duration);    
            //debug
            n.drawn++;
            console.dir(n.drawn);
        }                    
    };
    /*************************************************************************/
/*    function addStaff(Page, top){
        Page._staff.push(new Staff({
            parentPage : p,
            sy : top
    }));
    }
  */  
    function addBar(Page, staff){        
    
//        staff ? staff : staff = new Staff();     
        var barLength = (Page.rMargin - Page.lMargin)/4;        
        var b = new Bar({
            staff : staff,
            top : Page.topMargin,        
            barHeight : staff.height,
            parentPage : Page,
            barNo : Page._bars.length + 1
        });
        Page._bars.push(b);    
        Page.updateBars();
    }
    var p = new Page();
    //var staff = new Staff();
    addBar(p,new Staff());
    addBar(p,new Staff());
    addBar(p,new Staff());
    addBar(p,new Staff());
    addBar(p,new Staff());     
    p._bars[0].addNote("g4");
    p._bars[0].addNote("a4");
    p._bars[0].addNote("h4");
    p._bars[0].addNote("h4");
    p._bars[3].addNote("h4");
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