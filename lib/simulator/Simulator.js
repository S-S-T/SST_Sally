'use strict';

import MainLoop from 'mainloop.js';
import {Robot} from './Robot';
import {Goal} from './Goal';
import {InputView} from './InputView';
import {ReportView} from './ReportView';
import {CanvasView} from './CanvasView';

var robots = new Array()

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

	
	getRobotArray(n){
	//  Create an array of the Robot object with x number of instances
		// var robots = new Array(n)
		for (var i=0; i<n; i++) {
			robots[i] = new Robot();
		window.robot = robots;			
		}
		return window.robot;
	}
	
	// Set new Robot for LargeGrid
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
		window.robot = new Robot();
		window.goal = new Goal();	
	}

};
