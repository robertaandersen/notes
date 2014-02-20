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
    Page.prototype._notes = [];
    Page.prototype.getBar = function(int){
      return this._bars[int];  
    };
    Page.prototype.addBar = function(staffType){        
                
        var barLength = (this.rMargin - this.lMargin)/4;
        var defstaff = new Staff(); 
        var b = new Bar({
            staff : new Staff(),
            top : this.topMargin,        
            barHeight : defstaff.height,
            parentPageRMargin : this.rMargin,
            parentPageLMargin : this.lMargin,
            barNo : this._bars.length + 1
        });
        this._bars.push(b);    
        this.updateBars();        
    }; 
    Page.prototype.addNote = function (bar, note){            
        this._notes.push({
            noteX : bar.cx,
            noteY : bar.staff.getY(note),
            duration : 4,
            drawn : 0,
            parentBar : bar         
        });        
        this.alignNotes(bar);      
    };    
    Page.prototype.alignNotes = function(bar){        
        var margin = 8; 
        var len = bar.getBarLength() - (margin * 2);                
        var spaceBtwNotes = len/(this._notes.length);                  
        
        for(var j = 0; j < this._notes.length; j++)
        {
            var fNote = this._notes[j].parentBar.cx + margin; 
            this._notes[j].noteX = fNote + (spaceBtwNotes * j);
        }
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
            this._bars[i].updateStaff();                   
        }                
    };
    
    Page.prototype.render = function(){    
        //Erase
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.stroke();
        //Draw

        for(var i = 0; i < this._bars.length; i++)
        {    
            var bar = this._bars[i];
            var f = false;            
            if(bar.firstInLine || i === 0) f = true;                                  
            if(i == this._bars.length -1) f = "last";
            
            bar.drawBar(bar.cx, bar.cy, bar.barLength, bar.barHeight, f);
            bar.staff.drawStaff(bar.cx, bar.cy);            
        }    
        this.drawNotes();
    };
    Page.prototype.drawNotes = function(){                
        for(var i = 0; i< this._notes.length; i++)
        {
            var n = this._notes[i];
            var y = n.noteY;            
            var x = n.noteX;            
            notes.draw(ctx,x,y + n.drawn *10,n.duration);    
            //debug
            n.drawn++;            
        }                    
    };