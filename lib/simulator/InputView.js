'use strict';

const commands = {
	'move': () => {
		window.robot.move();
	},
	'left': () => {
		window.robot.left();
	},
	'right': () => {
		window.robot.right();
	},
	'place': (params) => {
		window.robot.place(params);
	},
	'stepai': () => {
		window.canvasView.stepAi();
	},
	'restart': () => {
		window.simulator.restart();  
	}
};


export class InputView {
	constructor() {
		this.commandBox = document.getElementById('command'); // from html element id
	};

	processCommand(value) { // called dir from html (on onkeydown="if (event.keyCode == 13))
		this.commandBox.select(); // auto select all input for easier editing, clearing out.
		window.simulator.resetContents(); // remove previous status and errors (make sure it repop's on next

		const sanitizedValue = value.trim().toLocaleLowerCase(),
			sanitizedValueArray = sanitizedValue.split(' '),
			firstWordEntered = sanitizedValueArray.splice(0, 1)[0];

		const cmdMethod = commands[firstWordEntered];
		if (cmdMethod) {
			cmdMethod(sanitizedValueArray.join()); // call controller functions by name
		} else {
			window.simulator.printErrors("Incorrect command");
		}
	}
}
