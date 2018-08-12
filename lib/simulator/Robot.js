'use strict';
import {Behavior} from '../behavior'; // behavior.js file includes an extension from Blueshell
import {getRandomInt} from '../utils';
let behavior = new Behavior();
var player = "";

export class Robot {

	constructor() {	
		// Clear any error msg before reloading game
		window.reportView.clear();
		// Condition for Large or Normal Grid
		//this.chkbox = document.getElementById('chkbox');	
		if(document.getElementById("chkbox").checked)
		{			
			this.x = getRandomInt(0, 7); // 0-7 for the 7x7 canvas; this must be changed (#1)
			this.y = getRandomInt(0, 7);
		}
		if(!document.getElementById("chkbox").checked)
		{// if chkbox.unchecked use these params
			this.x = getRandomInt(0, 4); // 0-4 for the 5x5 canvas; this must be changed (#1)
			this.y = getRandomInt(0, 4);
		}					
		// this.color = 'blue';
		this.f = ['north', 'east', 'south', 'west'][getRandomInt(0, 3)];  // 0-3 for 4 directions
		this.player = window.currentPlayer;
		console.log(`Robot positioned at ${this.x}, ${this.y}, ${this.f}`);
	}

	step(event) {
		behavior.handleEvent(this, event);
	}

	
	/* --------------------------------------------------- */
	/*         the following are command functions
	/* --------------------------------------------------- */
	
	// Place SETS the coordinates for passing and/or sends error me
	place(cmd) { /* "place" command is CREATED from within the "command[]" array in InputView.js, 
	this element makes the call from InputView.js to Robot.js via: window.robot.place(params)--HERE!-- and includes a "cmd" param */
		var newPos = cmd.split(","); // get x y f from the command in inputView.js
		if (newPos.length < 3) {
			window.simulator.printErrors("incorrect position / direction");
		} else {
			var newX = parseInt(newPos[0].trim()),
				newY = parseInt(newPos[1].trim()),
				newF = newPos[2].trim().toLowerCase();

			if (window.canvasView.validateBound(newX, "maxX") &&
				window.canvasView.validateBound(newY, "maxY") &&
				window.canvasView.validateFacing(newF)) {
				this.x = newX;
				this.y = newY;
				this.f = newF;
			}
		}
	}

	move() {
		switch (this.f) {
		case "north": {
			let newY = this.y + 1;
			if (window.canvasView.validateBound(newY, "maxY")) {
				this.y = newY;
			}
			break;
		}
		case "south": {
			let newY = this.y - 1;
			if (window.canvasView.validateBound(newY, "maxY")) {
				this.y = newY;
			}
			break;
		}
		case "east": {
			let newX = this.x + 1;
			if (window.canvasView.validateBound(newX, "maxX")) {
				this.x = newX;
			}
			break;
		}
		case "west": {
			let newX = this.x - 1;
			if (window.canvasView.validateBound(newX, "maxX")) {
				this.x = newX;
			}
			break;
		}
		default:
			break;
		}
	}
	
	left() {
		this.rotate(false); // get the next from this.robotFacing array in anti-clockwise direction
	}

	right() {
		this.rotate(true); // get the next from this.robotFacing array in clockwise direction
	}

	rotate(clockwise) {   // e.g. of on-the-fly boolean variable declaration. Just use a word, then apply "true" or "false" in the parameter of the rotate function
		var originalFacing = this.f,
			originalFacingIndex = window.canvasView.robotFacing.indexOf(originalFacing),
			newFacingIndex,
			totalFacing = window.canvasView.robotFacing.length;

		if (clockwise) {
			if (originalFacingIndex === (totalFacing - 1)) {
				newFacingIndex = 0;
			} else {
				newFacingIndex = originalFacingIndex + 1;
			}
		} else {
			if (originalFacingIndex === 0) {
				newFacingIndex = totalFacing - 1;
			} else {
				newFacingIndex = originalFacingIndex - 1;
			}
		}
		this.f = window.canvasView.robotFacing[newFacingIndex];
	}
}
