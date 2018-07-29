'use strict';

import {getRandomInt} from '../utils.js';

export class Goal {

	constructor() {		
		// if chkbox.checked use these params		
		this.chkbox = document.getElementById('chkbox');	
		if(document.getElementById("chkbox").checked)
		{			
		this.x = getRandomInt(0, 7); // 0-6 for the 7x7 canvas; this must be changed (#1)
		this.y = getRandomInt(0, 7);
		}
		if(!document.getElementById("chkbox").checked)
		{	
		// if chkbox.unchecked use these params
		this.x = getRandomInt(0, 4); // 0-4 for the 5x5 canvas; this must be changed (#1)
		this.y = getRandomInt(0, 4);
		}
/* 		this.x = getRandomInt(0, 4);
		this.y = getRandomInt(0, 4); */
		console.log(`Goal positioned at ${this.x}, ${this.y}`);
	}

}
