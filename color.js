// selecting from document
var h1 =  document.querySelector('h1');
var resetButton = document.getElementById('reset');
var hard = document.getElementById("hard");
var easy = document.getElementById('easy');
var colordisplay = document.getElementById('showrgb');
var squares = document.querySelectorAll('.square');
var message = document.getElementById('message');
var levelButtons = document.getElementsByClassName('levelButton');
// initial skill level
var level = 6;
// create array of random colors 
function randomColorsArray(num){
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(singleColor());
	}
			return arr;
}


// the default number of squares added to an array
var colors = randomColorsArray(level);

// setting the active button based on the default skill level which is hard
hard.classList.add('active');

// pick the target color
function pickColor(){
	var random = Math.floor(Math.random()* colors.length);
	return colors[random];
}

// display the target color
var goalColor = pickColor();
colordisplay.textContent = goalColor;

// adding the starting colors to the squares 
colorSquares();

// the function that puts the colors and listens to the clicks on squares
function colorSquares(){
// looping the number of squares
for (var i = 0; i < squares.length; i++) {
	//Add the random color from the colors array
	squares[i].style.background = colors[i];
	//Event Listener for the click on squares
	squares[i].addEventListener('click', function(){
		var clickedColor = this.style.background;
		if (clickedColor === goalColor) {
			message.textContent = 'Correct';
			// Change colors of all squares to the target color
			changeColors(clickedColor);
			h1.style.background = clickedColor;
			resetButton.textContent = "Play Again?"
		}else{
			this.style.background = "#232323";
			message.textContent = 'Try Again';
		}
	})
}
}
// function to reset settings 
function resetSetting(num){
// generate new colors array
	 colors = randomColorsArray(num);
	// pic a color from the array
    goalColor = pickColor();
	// change color in the display
	colordisplay.textContent = goalColor;
	// change the colors of the squares
	colorSquares();
	// change the message
	message.textContent = 'Pick A Color';
	//Change the text of the reset button
	resetButton.textContent = "NEW Colors"
	// change the h1 background
	h1.style.background = 'steelblue';
	// check if the skill level is easy then make the color of the last 3 squares same as the background
	if (level === 3) {
		for (var i = 3; i < 6; i++) {
		squares[i].style.background = "#232323";
	}
	}
}

// changing the color of all squares to the correct one
function changeColors(color){
	for (var i = 0; i < level; i++) {
		squares[i].style.background = color;
	}
}

// a function to create one single color which will be used to build the array
function singleColor(){
	//pick a red from 0 to 255
	var r =Math.floor(Math.random() * 256);
	//pick a green from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb("+r+", "+g+", "+b+")";
}
// reset button listener
resetButton.addEventListener('click', function(){
	resetSetting(level);
})
//What happens when someone clicks on the level buttons
for (var i = 0; i < levelButtons.length; i++) {
	levelButtons[i].addEventListener('click', function(){
	levelButtons[0].classList.remove("active");
	levelButtons[1].classList.remove("active");
	this.classList.add('active');
	if (this.textContent === "Easy") {
		level = 3;
		resetSetting(level);
	}else{
		level = 6;
		resetSetting(level);
	}
})
}