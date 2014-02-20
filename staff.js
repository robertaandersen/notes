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
        var idx = _notes.indexOf("c4");
        this.pitches = [];
        this.pitches[_notes[idx]] = this.cy - noteY;         
        var count = 0; 
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
        count = 0;           
        for(var jj = idx + 1; jj >= 0; jj--)
        {
            var _note = _notes[jj] +"";            
            var _y = this.cy + (count * noteY);
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