var c = document.getElementById("canvasid");
var ctx = c.getContext("2d");
var graph = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
var dictionary = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var angetaken = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var highlighted=0;
var canvasx1=-1;
var canvasx2=-1;
var canvasy1=-1;
var canvasy2=-1;
var turn=0;
function getCursorPosition(event) {
	if(turn==0)
	{
     canvasx1 = event.clientX;
    canvasy1 = event.clientY;
	console.log("x: " + canvasx1 + " y: " + canvasy1)
	turn=1;
	}
	else
	{
		canvasx2 = event.clientX;
		canvasy2 = event.clientY;
		console.log("x: " + canvasx2 + " y: " + canvasy2)
		turn=0;
	}
}

let canvas = document.getElementById('canvasid');
canvas.addEventListener('mousedown',getCursorPosition)
function  orientation( px,py,qx,qy,rx,ry) 
{ 
	var  val = (qy - py) * (rx - qx) - 
		(qx - px) * (ry - qy); 
	if (val == 0) return 0;  // colinear 
	return (val > 0)? 1: 2; // clock or counterclock wise 
}
function angle(x1,y1,x2,y2,x3,y3)
{
	var AB = Math.sqrt(Math.pow(x2-x1,2)+ Math.pow(y2-y1,2));    
	var BC = Math.sqrt(Math.pow(x2-x3,2)+ Math.pow(y2-y3,2)); 
	var AC = Math.sqrt(Math.pow(x3-x1,2)+ Math.pow(y3-y1,2));
	return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
} 
function drawcircletohighlight(x1,y1)
{
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle="red";
	ctx.arc(x1, y1, 25, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.stroke();
	ctx.beginPath();
	ctx.fillStyle="blue";
  	ctx.arc(x1, y1, 12.5, 0, 2 * Math.PI, true);
	  ctx.fill();
}

function drawCurvedArrow(
	startPointX,
	startPointY,
	endPointX,
	endPointY,
	quadPointX,
	quadPointY,
	lineWidth,
	arrowWidth,
	color
) {
	// BEST PRACTICE: the function changes color and lineWidth -> save context!
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;

	// angle of the end tangeant, useful for drawing the arrow head
	var arrowAngle =
		Math.atan2(quadPointX - endPointX, quadPointY - endPointY) + Math.PI;

	// start a new path
	ctx.beginPath();
	// Body of the arrow
	ctx.moveTo(startPointX, startPointY);
	ctx.quadraticCurveTo(quadPointX, quadPointY, endPointX, endPointY);
	// Head of the arrow
	ctx.moveTo(
		endPointX - arrowWidth * Math.sin(arrowAngle - Math.PI / 6),
		endPointY - arrowWidth * Math.cos(arrowAngle - Math.PI / 6)
	);

	ctx.lineTo(endPointX, endPointY);

	ctx.lineTo(
		endPointX - arrowWidth * Math.sin(arrowAngle + Math.PI / 6),
		endPointY - arrowWidth * Math.cos(arrowAngle + Math.PI / 6)
	);

	ctx.stroke();
	ctx.closePath();
	// BEST PRACTICE -> restore the context as we saved it at the beginning
	// of the function
	ctx.restore();
}
function drawline(x1,x2,y1,y2)
{
	ctx.save();
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}
var vid = VideoFrame({
	id: "vid",
	frameRate: 30,
	callback: function(frame) {
		//frame=frame%500;
			ctx.clearRect(0, 0, c.width, c.height);
			if(highlighted==0)
			{
				for (i = 1; i <= 22; i++) {
					if (dictionary[i] == 1) {
						var str1 = "Player";
						str1 = str1.concat(i.toString());
						x = jsondata[frame - 1][str1]["X"];
						y = jsondata[frame - 1][str1]["Y"];
						if (x >= 0 && x <= 1400 && y >= 0 && y <= 800)
							drawCoordinates(x, y);
					}
				}
			}
			else
			{
				var k=0;
				for(i=1;i<=22;i++)
				{
					if(dictionary[i]==1)
					{
						var str1 = "Player";
						str1 = str1.concat(i.toString());
						x = jsondata[frame - 1][str1]["X"];
						y = jsondata[frame - 1][str1]["Y"];
						graph[k][0]=x;
						graph[k][1]=y;
						k=k+1;
					}
				}
				for(i=0;i<k;i++)
				{
					drawcircletohighlight(graph[i][0],graph[i][1]);
				}
				var min_idx=0,l=0;
				for (i = 1; i < k; i++) 
					if (graph[i][0]<graph[l][0])
						l = i; 
				for(i=0;i<k;i++)
				{
					if(graph[i][0]==graph[l][0]&&graph[i][1]>graph[l][1])
						l=i;
				}
				for(i=0;i<k;i++)
				{
					if(i==l)
					angetaken[i]=0;
					else
					{
					angetaken[i]=angle(graph[i][0],graph[i][1],graph[l][0],graph[l][1],graph[l][0]-1,graph[l][1]);
					if(graph[i][1]>graph[l][1])
						angetaken[i]=-angle(graph[i][0],graph[i][1],graph[l][0],graph[l][1],graph[l][0]-1,graph[l][1]);
					}
					}
				
					for (i = 0; i < k-1; i++)  
				{  
					min_idx = i;  
					for (j = i+1; j < k; j++)  
						if (angetaken[j]<angetaken[min_idx])  
							min_idx = j;  

					var temp=graph[min_idx][0];
					graph[min_idx][0]=graph[i][0];
					graph[i][0]=temp;
					temp=graph[min_idx][1];
					graph[min_idx][1]=graph[i][1];
					graph[i][1]=temp;
					temp=angetaken[min_idx];
					angetaken[min_idx]=angetaken[i];
					angetaken[i]=temp;
				}   
				for(i=0;i<k;i++)
				{
					if(i!=k-1)
					{
						drawline(graph[i][0],graph[i+1][0],graph[i][1],graph[i+1][1]);

					}
					else
						drawline(graph[0][0],graph[k-1][0],graph[0][1],graph[k-1][1]);

				}
			}
	}
});

let play_button = document.getElementById('play');
let speed = document.getElementById('speed_text');
let speed_dec = document.getElementById('speed_dec');
let speed_inc = document.getElementById('speed_inc');
let rewind = document.getElementById('rewind');
let progBar = document.getElementById('progress_bar');
let progBarBody = document.getElementById('Rectangle_progress_bar');
let actionBar = document.getElementById('overlay_box');
let screen = document.getElementById('screen');
let zoomIn = document.getElementById('zoomIn');
let zoomOut = document.getElementById('zoomOut');
//let notch = document.getElementById('notch');
let body = document.body;
let actionHolder = document.getElementById('actions');
let speedContainer = document.getElementById('speed_container');
scaleVal = 1;
activeAction = 0;
inactiveAction = 0;
fps = 10;
tracker = -1;
// boxes_info=0;

status = 0;


speeds = [0.1, 0.5, 1, 2, 5];
speed.innerHTML = 1;

play_button.addEventListener('click', playPauseToggle);
speed_dec.addEventListener('click', speedChange);
speed_inc.addEventListener('click', speedChange);
rewind.addEventListener('click', rewind_vid)
progBarBody.addEventListener('mouseup', seekToPoint);
zoomIn.addEventListener('click', scalePage);
zoomOut.addEventListener('click', scalePage);


setInterval(updateStuff, 50);
setInterval(updateFrameNumber, 1000 / fps);
// setInterval(emptyTheDict, 10000);
var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value;
var slidervalue=0;
slider.oninput = function() {
  //output.innerHTML = this.value;
  slidervalue=parseInt(this.value);
  document.getElementById('high').value=slidervalue;
}
var numberchange=document.getElementById("high");
numberchange.oninput=function()
{
	slidervalue=parseInt(this.value);
	document.getElementById('myRange').value=slidervalue;
}





function scalePage(e) {
	if (e.target.id == 'zoomIn') {
		scaleVal += 0.1;
		screen.style.transform = 'scale(' + scaleVal.toString(10) + ')';
	} else {
		scaleVal -= 0.1
		screen.style.transform = 'scale(' + scaleVal.toString(10) + ')';
	}
}

prevActive = 1

function updateStuff() {
	let progress = vid.video.currentTime / vid.video.duration;
	progBar.style.width = progress * 1440;
	actionBar.style.marginLeft = progress * (1440 - 1285);
	notch.style.marginLeft = -1285 + progress * 1265;
}

function updateFrameNumber() {
	frameNumber = Math.floor(vid.video.currentTime * fps);
}

function seekToPoint(e) {
	let box = progBarBody.getBoundingClientRect()
	let seekRatio = (e.clientX - box.left) / (box.right - box.left)
	vid.video.currentTime = vid.video.duration * seekRatio;
	let progress = vid.video.currentTime / vid.video.duration;
	progBar.style.width = progress * 1440;
}

function playPauseToggle() {
	if (vid.video.paused == 1) {
		vid.video.play();
		vid.listen("frame");
		play_button.src = "../static/img/pause.png";
	} else {
		vid.video.pause();
		vid.stopListen();
		play_button.src = "../static/img/play.png";
	}
	failure=0;
}

function speedChange(e) {
	if (e.target.id.split('_')[1] == 'inc') {
		new_index = speeds.indexOf(Number(speed.innerHTML)) + 1;
		if (new_index < speeds.length) {
			vid.video.playbackRate = speeds[new_index];
			speed.innerHTML = speeds[new_index];
		}
	} else {
		new_index = speeds.indexOf(Number(speed.innerHTML)) - 1;
		if (new_index > -1) {
			vid.video.playbackRate = speeds[new_index];
			speed.innerHTML = speeds[new_index];
		}
	}
	if (speed.innerHTML >= 1) {
		speedContainer.style.fontSize = 15;
	} else {
		speedContainer.style.fontSize = 10;
	}

}

function rewind_vid() {
	vid.video.currentTime = Math.max(vid.video.currentTime - 10, 0);
}

function changeVolume() {
	vid.video.volume = slider.value / 100;
}

var jsondata = data;

function drawCoordinates(x, y) {
	var c = document.getElementById("canvasid");
	var ctx = c.getContext("2d");
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.lineWidth=5;
	ctx.rect(x, y, 50, 50);
	ctx.stroke();
}

function playerclicked(id) {
	id1=id.toString();
	if(dictionary[id]==0)
	{
		document.getElementById(id1).src="../static/img/image.png";
	}
	else if (dictionary[id]==1)
	{
		document.getElementById(id1).src="../static/img/messi.jpg";
	}
	dictionary[id] = 1 - dictionary[id];
}
function highlight()
{
	if(highlighted==0)
		document.getElementById("inter").value="de highlight formation";
	else
		document.getElementById("inter").value="highlight formation";
	highlighted=1-highlighted;

}

function arrowcreationwithdeviation()
{
	ctx.clearRect(0, 0, c.width, c.height);
	vid.video.pause();
	midx=canvasx1+canvasx2;
	midx=midx/2;
	midy=canvasy1+canvasy2;
	midy=midy/2;
	ydiff=Math.abs(canvasy2-canvasy1);
	midy=midy+ydiff*(slidervalue)/100;
	console.log(canvasx1,canvasy1,canvasx2,canvasy2,midx,midy);
	drawCurvedArrow(
		canvasx1,
		canvasy1,
		canvasx2,
		canvasy2,
		midx,
		midy,
		6,
		20,
		"#0000ff"
	);
}
// updateFrameNumber();
