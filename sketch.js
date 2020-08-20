var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage
var ob1, ob2, ob3, ob4, ob5, ob6
var obstaclesGroup
var cloudsGroup
var PLAY = 1
var END = 0
var gamestate = PLAY 
var gameOver, gameOverImage
var restart, restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameOverImage = loadImage("gameOver.png")
  
  restartImage = loadImage("restart.png")
  
  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png")
  
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  gameOver = createSprite(300,80,10,10)
  restart = createSprite(300,120,10,10)
  gameOver.addImage(gameOverImage)
  restart.addImage(restartImage)
}

function draw() {
  background(255);
  
  if(gamestate===PLAY){
      if(keyDown("space")&&trex.y>161) {
    trex.velocityY = -12;
    }   
    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -5;
      if (ground.x < 0){
    ground.x = ground.width/2;
    }
    spawnClouds();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gamestate = END;
    }
  }
  else if(gamestate===END){
    ground.velocityX = 0
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided");
    //gameOver.visible = true;
    //restart.visible = true;
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
  console.log(trex.y);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1);  break;
      case 2: obstacle.addImage(ob2);  break;
      case 3: obstacle.addImage(ob3);  break;
      case 4: obstacle.addImage(ob4);  break;
      case 5: obstacle.addImage(ob5);  break;
      case 6: obstacle.addImage(ob6);  break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    obstaclesGroup.add(obstacle)
  }
}