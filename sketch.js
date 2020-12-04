//For declaring the variables here so that it becomes PUBLIC(Global).
var monkey,monkeyImages;
var banana,bananaImage,bananaGroup; 
var ground,invisibleGround;
var obstacle,obstacleImage,obstaclesGroup;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gamestate = END;
var score = 0;

function preload()
{
//For loading Images.  
monkeyImages = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");

bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");

}

function setup() 
{
//For creating canvas  
createCanvas(450,350);
  
//For creating monkey sprite.
 monkey = createSprite(80,295,15,15);
 monkey.addAnimation("moving",monkeyImages);
 monkey.scale = 0.15;
 monkey.setCollider("circle",0,0);
 monkey.debug = true;
  
//For making a gorup for the banana's.
 bananaGroup = createGroup();
 obstaclesGroup = createGroup();
  
//For creating ground sprite.
 ground = createSprite(225,345,900,15);
 ground.velocityX = -3;
 ground.shapeColor = "green";
  
 invisibleGround = createSprite(225,345,900,15);
 invisibleGround.visible = false;
  
}

function draw() 
{
//for giving colour to the canvas.
 background("cyan");
  obstacles();
 createbananas(); 
  
  if (gameState === PLAY){
 if (keyDown("space") && monkey.y >= 150)
 {
  monkey.velocityY = -7;
  
 }
  score = score + 1;
 if (ground.x === 0){
   ground.x = 225;  
     }
 monkey.velocityY = monkey.velocityY + 0.3;
 monkey.collide(invisibleGround);

  if (bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  }
  if (obstaclesGroup.isTouching(monkey)){
   gameState = END;     
      }
  if (gameState === END)
 {
 bananaGroup.destroyEach();
 obstaclesGroup.destroyEach();
 bananaGroup.setVelocityXEach(0);
 obstaclesGroup.setVelocityEach(0); 
 }
  
 textSize(20); 
 text("SURVIVAL TIME : "+score , 200,20); 

  
 
  
drawSprites();
}

function createbananas()
{
 //For creating banana sprite.
if (frameCount % 150 === 0){
 banana = createSprite(450,200,10,10);
 banana.addImage(bananaImage);
 banana.scale = 0.1;
 banana.y = Math.round(random(80,200));
 bananaGroup.add(banana);
 banana.velocityX = -3;
 banana.lifetime = 140;
 banana.setCollider("circle",0,0);
 banana.debug = true;
 }
}

function obstacles()
{
if (frameCount % 200 === 0){
 obstacle = createSprite(350,300,20,20);
 obstacle.addImage(obstacleImage);
 obstacle.scale = 0.2;
 obstacle.velocityX = -3;
 obstacle.lifetime = 135;
 obstacle.debug = true;
 obstacle.setCollider("circle",0,0);
 obstaclesGroup.add(obstacle);
}
}





