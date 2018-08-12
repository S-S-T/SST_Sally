'use strict';

import MainLoop from 'mainloop.js';
import {Robot} from './Robot';
import {Goal} from './Goal';
import {InputView} from './InputView';
import {ReportView} from './ReportView';
import {CanvasView} from './CanvasView';

var robots = new Array();
var botColors = new Array();
var botIndex = 0;
var currentPlayer = 1;

export class Simulator {
	constructor() {
		window.inputView = new InputView();
		window.canvasView = new CanvasView();
		window.reportView = new ReportView();

		this.restart();
		MainLoop
		.setUpdate(() => {
		})
		.setDraw(() => {
			window.canvasView.render();
		})
		.start();
	}

	// Set new Robot() for LargeGrid
    getCurrentLargeRobot() {
		window.robot = new Robot();
		return window.robot;	
	}	
	
	getCurrentRobot() {
		return window.robot;
	}
	
    getNewRobot() {
		window.robot = new Robot();	
	}	

	resetContents() {
		window.reportView.clear();
	};

	/* --------------------------------------------------- */
	/*         end of command functions
	/* --------------------------------------------------- */
	printErrors(msg) {
		window.reportView.renderErrors(msg);
	}
	restart() {
		window.botIndex = 0;
		this.currentPlayer = 1;
		if(document.getElementById("chk2Robots").checked)
		{
			window.botIndex = 1;
			this.currentPlayer = 2;
		}	
		if(document.getElementById("chk3Robots").checked)
		{
			window.botIndex = 2;
			this.currentPlayer = 3;	
		}
		// Rerun arrays for 'bots/colors
		botColors = ['purple', 'green', 'red', 'blue', 'black'];
	    // Create arrays[] robots and colors			
		for (var i=0; i<3; i++) {
			robots[i] = new Robot();				
		}
		for (var i=0; i<3; i++) {		
			robots[i].color = botColors[i];			
		}
		window.robot = robots[window.botIndex];	
		// window.robot = new Robot();
		window.goal = new Goal();	
		window.currentPlayer = this.currentPlayer;
	}

};
