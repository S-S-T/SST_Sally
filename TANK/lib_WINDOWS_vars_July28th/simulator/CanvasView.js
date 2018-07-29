'use strict';

export class CanvasView {
	constructor() {
 		this.canvas = document.getElementById("c");
		this.context = this.canvas.getContext("2d");
	};
	
	// Load Large Grid 
	chkboxProcessor(checkboxElem) {
	  if (checkboxElem.checked) {			
		this.processLargeSize();	
	  } 
	  else{
	    // Unchecked = Original vars for SmallBoard
		location.reload();
	  }
	}	
	
	// Add 2nd player
	addPlayer2(addRobotsElem) {
	  if (addRobotsElem) {	
/* 		if(document.getElementById('chk3Robots').checked)
		{
		    document.getElementById('chk3Robots').checked = false;  
		} */
	}
    	window.simulator.restart(); 
	    this.processSize();
	}
	
	// Add 3rd player
	addPlayer3(addRobotsElem) {
	  if (addRobotsElem) {	
/* 		if(document.getElementById('chk2Robots').checked)
		{
		    document.getElementById('chk2Robots').checked = false;  
		} */
	}
    	window.simulator.restart(); 
	    this.processSize();
	}	
	
	processLargeSize() {
	    // LARGE GRID DIMENSIONS	
		this.robot = window.robot;
	   	this.chkbox = document.getElementById('chkbox').checked;	
		this.canvas = document.getElementById("c");
		this.context = this.canvas.getContext("2d");	
   		this.maxX = 8; // x total
		this.maxY = 8; // y total
		this.squareSize = 100; // all grids are equal wd/ht
		this.xStart = 50; // axis x starts from 50px
		this.yStart = 50; // axis y starts from 50px
		this.xEnd = this.xStart + this.squareSize * this.maxX; // axis x starts from 50px
		this.yEnd = this.yStart + this.squareSize * this.maxY; // axis y starts from 50px
		this.canvas.width = 859;
		this.canvas.height = 879;		
		this.robotFacing = ['north', 'east', 'south', 'west']; // clockwise
		this.robotSize = 25; // is the arrow size actually
		this.renderRobot();
	}
	
	processSize() {	
	    // ORIGINAL DIMENSIONS	--- make sure we don't inherit Large dims and robot
		this.robot = window.robot;
		this.canvas = document.getElementById("c");
		this.context = this.canvas.getContext("2d");		
  	    this.maxX = 5; // x total
		this.maxY = 5; // y total
		this.squareSize = 100; // all grids are equal width and height
		this.xStart = 50; // axis x starts from 50px
		this.yStart = 50; // axis y starts from 50px
		this.xEnd = this.xStart + this.squareSize * this.maxX; // axis x starts from 50px
		this.yEnd = this.yStart + this.squareSize * this.maxY; // axis y starts from 50px	
		this.canvas.width = 555;
		this.canvas.height = 580;	
		this.robotFacing = ['north', 'east', 'south', 'west']; // clockwise
		this.robotSize = 25; // is the arrow size actually */	
		this.renderRobot();		
	}
	
	render() {
		this.context.beginPath();		
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // TODO: Magic dimensions from index.ejs
		this.renderCanvas();
     	this.chkbox = document.getElementById('chkbox');	
		if(document.getElementById("chkbox").checked)
		{	
			this.renderGoal(robot);
		} 		
		this.renderRobot();
		this.renderGoal(robot)	
	}

	stepAi() {
		var robot = window.simulator.getCurrentRobot();
		robot.step(this.buildEvent(robot, window.goal));
	}

	atGoal(robot, goal) {
		return (robot.x === goal.x && robot.y === goal.y);
	}

	wallInFront(robot) {
		switch (robot.f) {
		case "north": {
			return robot.y === this.maxY - 1;
		}
		case "south": {
			return robot.y === 0;
		}
		case "east": {
			return robot.x === this.maxX - 1;
		}
		case "west": {
			return robot.x === 0;
		}
		default:
			console.log(`Invalid orientation ${robot.f}`);
			return false;
		}
	}

	buildEvent(robot, goal) {
		return {
			// Note distance to goal is actually the square of the distance to goal
			distanceToGoal: Math.pow(robot.x - goal.x, 2) + Math.pow(robot.y - goal.y, 2),
			atGoal: this.atGoal(robot, goal),
			wallInFront: this.wallInFront(robot),
		};
	}

	renderCanvas() {			
		if(!document.getElementById("chkbox").checked)
		{	
			this.processSize();	
		} 
		if(document.getElementById("chkbox").checked)
		{	
			this.processLargeSize();	
		}
 		
		this.context.strokeStyle = "#000";

		for (var x = 0; x < (this.maxX + 1); x++) { // draw 6 lines
			var currentAxisX = this.xStart + x * this.squareSize;
			this.context.moveTo(currentAxisX, this.yStart);
			this.context.lineTo(currentAxisX, this.yEnd);
			this.context.strokeText(x, currentAxisX + 50, this.yEnd + 20); // mark x index
		}

		for (var y = 0; y < (this.maxY + 1); y++) {
			var currentAxisY = this.yStart + y * this.squareSize;
			this.context.moveTo(this.xStart, currentAxisY);
			this.context.lineTo(this.xEnd, currentAxisY);
			this.context.strokeText((this.maxY - 1 - y), this.xStart - 20, currentAxisY + 50); // mark y index
		}

		this.context.stroke();
	}

	validateBound(input, toCheckAxis) {
		if (isNaN(input)) {
			window.simulator.printErrors("Please enter a numeric coordinates!");
			return false;
		} else if (input < 0 || input > (this[toCheckAxis] - 1)) {
			window.simulator.printErrors("Coordinates out of range!");
			return false;
		} else {
			return true;
		}
	}

	validateFacing(face) {
		if (this.robotFacing.indexOf(face.toLowerCase()) < 0) {
			window.simulator.printErrors("Wrong facing!");
			return false;
		} else {
			return true;
		}
	}

	renderRobot() {	
		// Single Robot
		if((!document.getElementById("chk2Robots").checked) && (!document.getElementById("chk3Robots").checked))
		{	
			var robot = window.robot,
			robotAxisX = (robot.x + 1) * 100, // the center of the destination grid horizontally
			robotAxisY = (this.maxY - robot.y) * 100; // the center of the destination grid vertically
		} 
		// Second Player
		if(document.getElementById("chk2Robots").checked)
		{	// Array of 'Bots
			var robot = window.robot,
			robotAxisX = (robot.x + 1) * 100, // the center of the destination grid horizontally
			robotAxisY = (this.maxY - robot.y) * 100; // the center of the destination grid vertically					
		}
		// Third Player
		if(document.getElementById("chk3Robots").checked)
		{
			var robot = window.robot,
			robotAxisX = (robot.x + 1) * 100, // the center of the destination grid horizontally
			robotAxisY = (this.maxY - robot.y) * 100; // the center of the destination grid vertically		
		}	
		var path = new Path2D();
		switch (robot.f) {
		case "north":
			path.moveTo(robotAxisX, robotAxisY - this.robotSize);
			path.lineTo(robotAxisX - this.robotSize, robotAxisY);
			path.lineTo(robotAxisX + this.robotSize, robotAxisY);
			break;
		case "south":
			path.moveTo(robotAxisX, robotAxisY + this.robotSize);
			path.lineTo(robotAxisX - this.robotSize, robotAxisY);
			path.lineTo(robotAxisX + this.robotSize, robotAxisY);
			break;
		case "east":
			path.moveTo(robotAxisX + this.robotSize, robotAxisY);
			path.lineTo(robotAxisX, robotAxisY - this.robotSize);
			path.lineTo(robotAxisX, robotAxisY + this.robotSize);
			break;
		case "west":
			path.moveTo(robotAxisX - this.robotSize, robotAxisY);
			path.lineTo(robotAxisX, robotAxisY - this.robotSize);
			path.lineTo(robotAxisX, robotAxisY + this.robotSize);
			break;
		default:
			break;
		}
		path.closePath();
		this.context.fillStyle = robot.color;
		this.context.stroke(path);
		this.context.fill(path);
		window.robot = robot; // set Window var to this array index		
		window.reportView.renderReport();
	}
	
	renderGoal(robot) {
		var goal = window.goal;
		var centerX = (goal.x + 1) * 100;
		var centerY = (this.maxY - goal.y) * 100;
		var radius = 35;
		var context = this.context;
		var path = new Path2D();
		path.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		path.closePath();

		if (this.atGoal(robot, goal)) {
			context.fillStyle = "Green";  // When Sally reaches Goal!
		}
		context.stroke(path);
		context.fill(path);
		context.fillStyle = robot.color												;
	}
}