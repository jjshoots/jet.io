class sun{
	constructor(lineNumber, width, height){
		this.originX = mouseX;
		this.originY = mouseY;
		this.rayNumber = lineNumber;

		this.screenWidth = width;
		this.screenHeight = height;

		this.screenEdges = [
			[0, 0, screenWidth, 0],
			[0, screenHeight, screenWidth, screenHeight],
			[0, 0, 0, screenHeight],
			[screenWidth, screenHeight, screenWidth, screenHeight]
		];
		this.screenGradients = [0, 0, Number.NaN, Number.NaN];
		this.screenC = [0, screenHeight, Number.NaN, Number.NaN];
		this.screenX = [Number.NaN, Number.NaN, 0, screenWidth];

		this.intercepts = new Array(this.rayNumber);
		for(var i = 0; i < this.rayNumber; i++){
			this.intercepts[i] = new Array(2);
		}

		this.angles = new Array(this.rayNumber);
		this.gradients = new Array(this.rayNumber);
		for(var i = 0; i < this.rayNumber; i++){
			this.angles[i] = i * (2 * Math.PI / this.rayNumber);
			if(this.angles[i] === 0.5 * Math.PI || this.angles[i] === 1.5 * Math.PI){
				this.gradients[i] = Number.NaN;
			}else{
				this.gradients[i] = tan(this.angles[i]);
			}
		}
		console.log(this.angles);

		this.C = new Array(this.rayNumber);
	}

	update(){
		this.originX = mouseX;
		this.originY = mouseY;
	}

	findC(){
		for(var i = 0; i < this.rayNumber; i++){
			if(!isNaN(this.gradients[i])){
				this.C[i] = this.originY - this.gradients[i] * this.originX;
			}else{
				this.C[i] = Number.NaN;
			}
		}
	}

	interceptScreenEdges(){
		for(var i = 2; i < 4; i++){
			for(var j = 0; j < this.rayNumber; j++){
				if(!isNaN(this.gradients[j])){


					var interceptX = this.screenX[i];
					var interceptY = this.gradients[j] * interceptX + this.C[j];

					if((this.angles[j] < 0.5 * Math.PI || this.angles[j] > 1.5 * Math.PI) && 1){
						if(interceptX > this.originX){
							this.intercepts[j][1] = interceptX;
							this.intercepts[j][2] = interceptY;
						}
					}else
					if((this.angles[j] > 0.5 * Math.PI || this.angles[j] < 1.5 * Math.PI) && 1){
						if(interceptX < this.originX){
							this.intercepts[j][1] = interceptX;
							this.intercepts[j][2] = interceptY;
						}
					}
				}
			}
		}

		for(var i = 0; i < 2; i++){
			for(var j = 0; j < this.rayNumber; j++){
				if(!isNaN(this.gradients[j])){

					var interceptX = (this.C[j] - this.screenC[i]) / (this.screenGradients[i] - this.gradients[j]);
					var interceptY = this.screenC[i];

					if(this.angles[j] < 0.5 * Math.PI || this.angles[j] > 1.5 * Math.PI){
						if(interceptX > this.originX){
							if(interceptX < this.intercepts[j][1]){
								this.intercepts[j][1] = interceptX;
								this.intercepts[j][2] = interceptY;
							}
						}
					}else
					if(this.angles[j] > 0.5 * Math.PI || this.angles[j] < 1.5 * Math.PI){
						if(interceptX < this.originX){
							if(interceptX > this.intercepts[j][1]){
								this.intercepts[j][1] = interceptX;
								this.intercepts[j][2] = interceptY;
							}
						}
					}
				}else{
					if(this.angles[j] < Math.PI){
						this.intercepts[j][1] = this.originX;
						this.intercepts[j][2] = 0;
					}else
					if(this.angles[j] > Math.PI){
						this.intercepts[j][1] = this.originX;
						this.intercepts[j][2] = this.screenHeight;
					}
				}
			}
		}
	}

	cast(){
		for(var i = 0; i < this.rayNumber; i++){
			var a = this.originX;
			var b = this.originY;
			var c = this.intercepts[i][1];
			var d = this.intercepts[i][2];
			line(a, b, c, d);
		}
	}
}