'use strict';

import MainLoop from 'mainloop.js';
import {Robot} from './Robot';
import {Goal} from './Goal';
import {InputView} from './InputView';
import {ReportView} from './ReportView';
import {CanvasView} from './CanvasView';

export class Simulator {
	constructor() {	
		// Run these only once, not for Large Size?
    	this.chkbox = document.getElementById('chkbox');	
		if(!document.getElementById("chkbox").checked)
		{	
			window.canvasView = new CanvasView();;
		}			
		window.inputView = new InputView();
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

	// Set a new Robot object to the large screen
    getCurrentLargeRobot() {
		window.robot = new Robot();
		return window.robot;	
	}
	
	
	getCurrentRobot() {
/* 		window.robot.makeRobots(); */
		return window.robot;
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
