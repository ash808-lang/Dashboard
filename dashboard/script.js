setInterval(()=>{
let now = new Date();
document.getElementById("time").innerText =
now.toLocaleTimeString();
},1000);

let h = new Date().getHours();

let text =
h<12 ? "Good Morning Ansh" :
h<18 ? "Good Afternoon Ansh" :
"Good Evening Ansh";

document.getElementById("greeting").innerText = text;

fetch("https://api.adviceslip.com/advice")
.then(res=>res.json())
.then(data=>{
document.getElementById("quote").innerText =
data.slip.advice;
})
.catch(()=>{
document.getElementById("quote").innerText =
"Stay curious. Keep building";
});

fetch("https://wttr.in/Delhi?format=3")
.then(r=>r.text())
.then(t=>{
document.getElementById("weather").innerText=t;
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render(){

let list=document.getElementById("taskList");
list.innerHTML="";

tasks.forEach(task=>{

let li=document.createElement("li");
li.innerText=task;

li.onclick=()=>{
tasks=tasks.filter(t=>t!==task);
save();
};

list.appendChild(li);

});
}

function addTask(){

let input=document.getElementById("taskInput");

if(input.value==="") return;

tasks.push(input.value);

input.value="";

save();
}

function save(){

localStorage.setItem("tasks",JSON.stringify(tasks));

render();
}

render();

document.getElementById("cmd").addEventListener("keydown",e=>{

if(e.key==="Enter"){

let cmd=e.target.value;

let out=document.getElementById("terminalOutput");

if(cmd==="hello") out.innerText="Hello Ansh";
else if(cmd==="time") out.innerText=new Date();
else out.innerText="Unknown command";

e.target.value="";
}

});

let canvas=document.getElementById("particles");
let ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<80;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2
});
}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="crimson";

particles.forEach(p=>{
ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fill();

p.y+=0.2;

if(p.y>canvas.height) p.y=0;
});

requestAnimationFrame(draw);
}

draw();
