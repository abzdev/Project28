const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
var treeObj, stoneObj,groundObject, launcherObject;
var mango1, mango2, mango3, mango4;
var world, boy, stone, string;
var gameState = 'attached';

function preload() {
	boy=loadImage("images/boy.png");
}

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,30);
	mango2=new mango(950,200,30);
	mango3=new mango(1150,160,30);
	mango4=new mango(1050,220,30);

	stone = new Stone();

	var options = {
		bodyA: stone.body,
		pointB: {x:210,y:400},
		length: 10,
		stiffness: 0.02
	}

	string = Constraint.create(options);
	World.add(world,string);

	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);
	
	Engine.run(engine);
}

function draw() {
	background(230);

	push();
	textSize(30);
	text('Press "Space" to get a new stone.', 30,50);
	pop();

	image(boy,200,340,200,300);

	if(string.bodyA) {
		line(235,400,stone.body.position.x+20,stone.body.position.y+20);
	}

	treeObj.display();
	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();
	stone.display();

	groundObject.display();

	detectCollision(stone,mango1);
	detectCollision(stone,mango2);
	detectCollision(stone,mango3);
	detectCollision(stone,mango4);
}

function mouseReleased() {
	string.bodyA = null;
	gameState = 'flying';
}

function mouseDragged() {
	Body.setPosition(stone.body,{x: mouseX, y: mouseY});
}

function keyPressed() {
	if(keyCode === 32) {
		string.bodyA = stone.body;
		Body.setPosition(stone.body,{x: 220, y: 400});
		gameState = 'attached';
	}
}

function detectCollision(lstone,lmango) {
	var distance = dist(lstone.body.position.x, lstone.body.position.y,lmango.body.position.x, lmango.body.position.y);
	if(distance <= 40) {
		Body.setStatic(lmango.body,false);
	}
}