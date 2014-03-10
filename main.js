var main = {
    // "Frame Time" is a (potentially high-precision) frame-clock for animations
    _frameTime_ms : null,
    _frameTimeDelta_ms : null,
};

main.init = function(){
        
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
    //this._requestNextIteration();
};