class obsLine{
	constructor(){
		this.start = new Array(1);
		this.start[0] = new Array(2);
		this.end = new Array(1);
		this.end[0] = new Array(2);
		this.mConst = new Array(1);
		this.cConst = new Array(1);
		this.numLines = 0;

		this.initialized = 0;
	}

	parseIn(startPoint, endPoint){
		if(!this.initialized){
			if(startPoint[0] < endPoint[0]){
				this.start[0][0] = startPoint[0];
				this.start[0][1] = startPoint[1];
				this.end[0][0] = endPoint[0];
				this.end[0][1] = endPoint[1];
			}else{
				this.start[0][0] = endPoint[0];
				this.start[0][1] = endPoint[1];
				this.end[0][0] = startPoint[0];
				this.end[0][1] = startPoint[1];
			}
			this.mConst[0] = (this.end[0][1] - this.start[0][1]) / (this.end[0][0] - this.start[0][0]);
			this.cConst[0] = this.end[0][1] - (this.mConst[0] * this.end[0][0]);
			this.numLines++;
			this.initialized = 1;
		}else{
			if(startPoint[0] < endPoint[0]){
				this.start.push([startPoint[0], startPoint[1]]);
				this.end.push([endPoint[0], endPoint[1]]);
			}else{
				this.start.push([endPoint[0], endPoint[1]]);
				this.end.push([startPoint[0], startPoint[1]]);
			}
			this.mConst.push((this.end[this.end.length-1][1] - this.start[this.start.length-1][1])
								/ (this.end[this.end.length-1][0] - this.start[this.start.length-1][0]));
			this.cConst.push(this.end[this.end.length-1][1] - (this.mConst[this.end.length-1] * this.end[this.end.length-1][0]));
			this.numLines++;

		}
	}

	parseOut(index){
		return [this.mConst[index], this.cConst[index], this.start[index][0], this.end[index][0], this.start[index][1], this.end[index][1]];
	}

	draw(){
		for(var i = 0; i < this.numLines; i++){
			line(this.start[i][0], this.start[i][1], this.end[i][0], this.end[i][1]);
		}
	}
}