'use strict';

export class ReportView {
	constructor() {
		this.errorMessageEle = document.getElementById("error");
		this.reportMessageEle = document.getElementById("report");
	}

	renderReport() {
		var currentRobot = window.robot;
		let color = currentRobot.color;
		this.reportMessageEle.innerHTML = '<span>' + 'Axis X: ' + currentRobot.x + '</span>' +
			'<span>' + 'Axis Y: ' + currentRobot.y + '</span>' +
			'<span>' + 'Facing: ' + currentRobot.f + '</span>'+
			'<span><strong><font color="' + color + '">' + 'Player # ' + window.currentPlayer + '</font></strong></span>';
	}

	renderErrors(msg) {
		this.errorMessageEle.innerHTML = '<span id="error"><strong><font color="red">' + msg + '</font></strong></span>';
	}

	clear() {  
		this.reportMessageEle.innerHTML = '';
		this.errorMessageEle.innerHTML = '';
	}
}
