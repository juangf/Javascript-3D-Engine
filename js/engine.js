var Poligon = function(vertexs){
	this.vertexs = vertexs ? vertexs : [];

	/**
	 * [getVertexs description]
	 * @return {[type]} [description]
	 */
	this.getVertexs = function(){
		return this.vertexs;
	}

	/**
	 * [addVertex description]
	 * @param {[type]} vertex [description]
	 */
	this.addVertex = function(vertex){
		this.vertexs.push(vertex);

		return this;
	}
}

var Engine = function(){
	this.canvas = null;
	this.ctx = null;

	/**
	 * [setCanvas description]
	 * @param {[type]} canvas [description]
	 */
	this.setCanvas = function(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		return this;
	}

	/**
	 * [getContext description]
	 * @return {[type]} [description]
	 */
	this.getContext = function(){

		return this.ctx;
	}

	/**
	 * [projection description]
	 * @param  {[type]} coord [description]
	 * @param  {[type]} z     [description]
	 * @return {[type]}       [description]
	 */
	this.projection = function(coord, z){
        return (coord*500)/(z+500);
        //return coord;
    }

    /**
     * [drawVertex description]
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     * @param  {[type]} z [description]
     * @return {[type]}   [description]
     */
	this.drawVertex = function(x, y, z){
        this.ctx.beginPath(); 
        this.ctx.arc(x, y, 2/*size*/, 0, Math.PI*2, true);
        this.ctx.stroke();

        return this;
	}

    /**
     * Draw Poligon from a list of vertexs
     * @param  {[type]} vertexs [description]
     * @return {[type]}         [description]
     */
	this.drawPoligon = function(poligon){
		var vertexs = poligon.getVertexs();

		this.ctx.beginPath();

        this.ctx.moveTo(
			this.projection(
				vertexs[0].elements[0],/* x */
				vertexs[0].elements[2]/* z */
			),
			this.projection(
				vertexs[0].elements[1], /* y */
				vertexs[0].elements[2] /* z */
			)
        );	
        
        for(var i=1; i<vertexs.length; i++) {
            this.ctx.lineTo(
            	this.projection(
					vertexs[i].elements[0],/* x */
					vertexs[i].elements[2]/* z */
            	),
            	this.projection(
					vertexs[i].elements[1], /* y */
					vertexs[i].elements[2] /* z */
            	)
            );														
        }
    
    	this.ctx.lineTo(
			this.projection(
				vertexs[0].elements[0],/* x */
				vertexs[0].elements[2]/* z */
			),
			this.projection(
				vertexs[0].elements[1], /* y */
				vertexs[0].elements[2] /* z */
			)
    	);

    	this.ctx.closePath();
        this.ctx.stroke();

    	return this;
	}
};