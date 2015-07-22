var Engine = function(){
	this.canvas = null;
	this.ctx = null;

	this.setCanvas = function(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		return this;
	}

	this.getContext = function(){

		return this.ctx;
	}

	this.drawVertex = function(x, y, z){
        this.ctx.beginPath(); 
        this.ctx.arc(x, y, 2/*size*/, 0, Math.PI*2, true);
        this.ctx.stroke(); 	
	}
};