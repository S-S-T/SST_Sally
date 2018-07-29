'use strict';

export class ReportView {
	constructor() {
		//        this.errorMessageEle = document.getElementById("error");
		this.reportMessageEle = document.getElementById("report");
	}

	renderReport() {
		var currentRobot = window.robot;
		this.reportMessageEle.innerHTML = '<span>' + 'Axis X: ' + currentRobot.x + '</span>' +
			'<span>' + 'Axis Y: ' + currentRobot.y + '</span>' +
			'<span>' + 'Facing: ' + currentRobot.f + '</span>'+
			'<span>' + 'Player Number: ' + window.currentPlayer + '</span>';
	}

	renderErrors(msg) {
		this.reportMessageEle.innerHTML = '<span id="error">' + msg + '</span>';
	}

	clear() {  
		this.reportMessageEle.innerHTML = '';
		//        this.errorMessageEle.innerHTML = '';
	}
}
