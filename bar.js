  
    var Bar = function(descr){
        for(var parameter in descr){
            this[parameter] = descr[parameter];   
        }
    };
    
    //Bar.prototype.staff = null;
    Bar.prototype.top = null;
    Bar.prototype.barHeight = null;
    //Bar.prototype._notes = [];
    Bar.prototype.getBarLength = function(){        
        return (this.parentPageRMargin - this.parentPageLMargin)/4;        
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
        if(firstInLine) this.drawBar(this.parentPageLMargin, this.cy, 0, this.barHeight, false);
        if(firstInLine == "last"){
                for(var j = 2; j > 0; j--){
                    this.drawBar(this.cx + this.barLength - j, this.cy, 0, this.barHeight);
                }
                this.drawBar(this.cx + this.barLength - 5, this.cy, 0, this.barHeight);                
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