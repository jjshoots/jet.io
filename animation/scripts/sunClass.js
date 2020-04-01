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
		this.angles[0] = 2 * Math.PI / this.rayNumber;
		this.gradients[0] = tan(this.angles[0]);
		for(var i = 1; i < this.rayNumber; i++){
			this.angles[i] = this.angles[i-1] + this.angles[0];
			if(this.angles[i] === 0.5 * Math.PI || this.angles[i] === 1.5 * Math.PI){
				this.gradients[i] = Number.NaN;
			}else{
				this.gradients[i] = tan(this.angles[i]);
			}
		}
		// console.log(this.angles);

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
							this.intercepts[j][0] = interceptX;
							this.intercepts[j][1] = interceptY;
						}
					}else
					if((this.angles[j] > 0.5 * Math.PI || this.angles[j] < 1.5 * Math.PI) && 1){
						if(interceptX < this.originX){
							this.intercepts[j][0] = interceptX;
							this.intercepts[j][1] = interceptY;
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
							if(interceptX < this.intercepts[j][0]){
								this.intercepts[j][0] = interceptX;
								this.intercepts[j][1] = interceptY;
							}
						}
					}else
					if(this.angles[j] > 0.5 * Math.PI || this.angles[j] < 1.5 * Math.PI){
						if(interceptX < this.originX){
							if(interceptX > this.intercepts[j][0]){
								this.intercepts[j][0] = interceptX;
								this.intercepts[j][1] = interceptY;
							}
						}
					}
				}else{
					if(this.angles[j] < Math.PI){
						this.intercepts[j][0] = this.originX;
						this.intercepts[j][1] = this.screenHeight;
					}else
					if(this.angles[j] > Math.PI){
						this.intercepts[j][0] = this.originX;
						this.intercepts[j][1] = 0;
					}
				}
			}
		}
	}

	findIntercept(lineConst){
		for(var j = 0; j < this.rayNumber; j++){
			if(!isNaN(this.gradients[j])){
				if(isFinite(lineConst[0])){
					var interceptX = (this.C[j] - lineConst[1]) / (lineConst[0] - this.gradients[j]);
					var interceptY = this.gradients[j] * interceptX + this.C[j];

					if(this.angles[j] < 0.5 * Math.PI || this.angles[j] > 1.5 * Math.PI){
						if(interceptX > this.originX){
							var dist = interceptX - lineConst[2]; 
							if(0 <= dist && dist < lineConst[3] - lineConst[2]){
								if(interceptX < this.intercepts[j][0]){
									this.intercepts[j][0] = interceptX;
									this.intercepts[j][1] = interceptY;
								}
							}
						}
					}else
					if(this.angles[j] > 0.5 * Math.PI || this.angles[j] < 1.5 * Math.PI){
						if(interceptX < this.originX){
							var dist = interceptX - lineConst[2]; 
							if(0 <= dist && dist < lineConst[3] - lineConst[2]){
								if(interceptX > this.intercepts[j][0]){
									this.intercepts[j][0] = interceptX;
									this.intercepts[j][1] = interceptY;
								}
							}
						}
					}
				}else{
					var interceptX = lineConst[2];
					var interceptY = this.gradients[j] * interceptX + this.C[j];
					if(this.angles[j] < 0.5 * Math.PI || this.angles[j] > 1.5 * Math.PI){
						if(interceptX > this.originX){
							var dist = abs(interceptY - lineConst[4]) + abs(interceptY - lineConst[5]); 
							if(dist === abs(lineConst[4] - lineConst[5])){
								if(interceptX < this.intercepts[j][0]){
									this.intercepts[j][0] = interceptX;
									this.intercepts[j][1] = interceptY;
								}
							}
						}
					}else
					if(this.angles[j] > 0.5 * Math.PI || this.angles[j] < 1.5 * Math.PI){
						if(interceptX < this.originX){
							var dist = abs(interceptY - lineConst[4]) + abs(interceptY - lineConst[5]); 
							if(dist === abs(lineConst[4] - lineConst[5])){
								if(interceptX > this.intercepts[j][0]){
									this.intercepts[j][0] = interceptX;
									this.intercepts[j][1] = interceptY;
								}
							}
						}
					}
				}
			}else{
				if(this.angles[j] < Math.PI){
					var interceptX = this.originX;
					var interceptY = lineConst[0] * interceptX + lineConst[1];
					var dist = interceptX - lineConst[2]; 
					if(0 <= dist && dist < lineConst[3] - lineConst[2]){
						if(this.originY < interceptY && interceptY < this.intercepts[j][1]){
							this.intercepts[j][0] = interceptX;
							this.intercepts[j][1] = interceptY;
						}
					}
				}else
				if(this.angles[j] > Math.PI){
					var interceptX = this.originX;
					var interceptY = lineConst[0] * interceptX + lineConst[1];
					var dist = interceptX - lineConst[2]; 
					if(0 <= dist && dist < lineConst[3] - lineConst[2]){
						if(this.originY > interceptY && interceptY > this.intercepts[j][1]){
							this.intercepts[j][0] = interceptX;
							this.intercepts[j][1] = interceptY;
						}
					}
				}
			}
		}
	}

	cast(){
		for(var i = 0; i < this.rayNumber; i++){
			line(this.originX, this.originY, this.intercepts[i][0], this.intercepts[i][1]);
		}
	}
}