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