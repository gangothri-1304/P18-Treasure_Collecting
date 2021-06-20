var path,boy,cash,jwellery,sword;
var pathImg,boyImg,cashImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path = createSprite(windowWidth/2, 200);
path.addImage(pathImg);


//creating boy running
boy = createSprite(70,580,windowWidth/2,windowHeight-30);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
   background(0);
   boy.x = World.mouseX;

   path.velocityY = 1;
  
   edges= createEdgeSprites();
   boy.collide(edges);
  
   //code to reset the background
   if(path.y > 400 ){
      path.y = height/2;
   }
  
    createCash();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }
     else 
     if(swordGroup.isTouching(boy)) {
      gameState = END;
    }
  }
    
   if(gameState === END){
     path.velocityY=0;
     boy.x=windowWidth/2;
     boy.y=windowHeight/2;
     boy.addAnimation("SahilRunning",endImg);
     boy.scale = 0.8;
     cashG.destroyEach();
     jwelleryG.destroyEach();
     swordGroup.destroyEach();
    }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,windowWidth/60,windowHeight/30);
  }


function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, windowWidth),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}