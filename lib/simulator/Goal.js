'use strict';

import {getRandomInt} from '../utils.js';

export class Goal {
	constructor() {				
		// this.chkbox = document.getElementById('chkbox');	
		if(document.getElementById("chkbox").checked)
		{// 8x8 canvas
			this.x = getRandomInt(0, 7);
			this.y = getRandomInt(0, 7);
		}
		if(!document.getElementById("chkbox").checked)
		{ // 5x5 canvas
			this.x = getRandomInt(0, 4);
			this.y = getRandomInt(0, 4);
		}
		console.log(`Goal positioned at ${this.x}, ${this.y}`);
	}
}
