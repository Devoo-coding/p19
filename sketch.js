//stating variables
var gameState;

var olaf, olaf_running, olaf_melt;
var ground, invisible_ground
var scenery, sceneryImg;

var fire, fireGroup, fireImg;
var carrots, carrotsGroup,carrotImg;

var distance, game_over, game_over_img, game_start, game_start_img, replay, replayImg;
var score = 0;

var scoreDisplay;
var choose,test;



function preload(){
olaf_running  = loadAnimation("olaf1.png", "olaf2.png", "olaf3.png");

sceneryImg = loadImage("scenery.png");

fireImg = loadImage("fire.png");
carrotImg = loadImage("carrot.png");

game_overImg = loadImage("gameOver.png");
game_startImg = loadImage("start.png");
replayImg = loadImage("replay.png");

}

function setup() {

    createCanvas(1000,600);

    scenery = createSprite(300,100);
    scenery.addImage("scenery", sceneryImg);
    scenery.scale = 1;
    scenery.velocityX = -4;

    olaf = createSprite(100,170);
    olaf.addAnimation("running", olaf_running);
    olaf.scale = 0.05;
    olaf.setCollider("rectangle", 0,0,olaf.width,olaf.height);

    invisible_ground = createSprite(300,250,1000,5);
    invisible_ground.visible = false;
    invisible_ground.setCollider("rectangle", 0,0, invisible_ground.width, invisible_ground.height);

    game_over = createSprite(500,100);
    game_over.addImage("gameOver", game_overImg);
    game_over.scale = 0.6;


    game_start = createSprite(500,100);
    game_start.addImage("gameStart", game_startImg);
    game_start.scale = 0.6;

    replay = createSprite(500,200);
    replay.addImage("replay", replayImg);
    replay.scale = 0.3;

    olaf.collide(invisible_ground);

    fireGroup = new Group();

    carrotGroup = new Group();

    /*fire = createSprite(900,170);
    fire.addImage(fireImg);
    fire.scale = 0.2;
    fire.velocityx = -4;
    */

    //test = createSprite(900,50,100,3);

    gameState = "start"

    

   


    
 
}

function draw() {

    background(200);
    fill(255);
    text.size = 50;
    scoreDisplay = text("Score: "+ score, 500,50); 

    scoreDisplay.depth = scenery.depth;

    scoreDisplay.depth = scoreDisplay.depth + 1;

    game_over.visible = false;
    game_start.visible = false;
    replay.visible = false;

    if(scenery.x < 400){
        scenery.x = scenery.width/2;
    }


    if(gameState == "start"){
        
        olaf.visible = false;
        fireGroup.visible = false;
        carrotGroup.visible = false;


        game_start.visible = true;

        if(keyDown("space")){
            gameState = "play";
        }

    }else if(gameState == "play"){

    game_start.visible = false;

    olaf.visible = true;
    fireGroup.visible = true;
    carrotGroup.visible = true;

    
  
 
    olaf.collide(invisible_ground);

    if (keyDown("space") && olaf.y >= 60 && olaf.y >= 160){
        olaf.velocityY = -10
    }

    olaf.velocityY = olaf.velocityY + 0.5;

    
    createCarrots();
    createFire();
    if (carrotGroup.isTouching(olaf)){
        score = score + 300;
        carrotGroup.destroyEach();
    }

    if (fireGroup.isTouching(olaf)){
        gameState = "end"
    }
    
    }else if(gameState == "end"){
        game_over.visible = true;
        replay.visible = true;
        scenery.velocityX = 0;
        fireGroup.lifetime = -1;
        fire.velocityX = 0;
        carrotGroup.lifetime = -1;
        carrotGroup.visible = false;
        olaf.visible = false;
        text("press up arrow to restart", 300,300);
        text.size = 50;
        scoreDisplay = text("Score: "+ score, 600,300); 
        }

        if(keyDown("up_arrow")){
            reset();
        }

    drawSprites();
 
}


    function createFire(){
        if(frameCount % 150 == 0){
            fire = createSprite(900,200);
            fire.velocityX = -(6 + score/150);
            fire.addImage(fireImg);
            fire.scale = 0.12;
            fireGroup.add(fire);
            fire.lifetime = 600;
            fire.setCollider("rectangle", 0,0,1,1);
            //olaf.collide(invisible_ground);


            
        }
    }

    function createCarrots(){
        if(frameCount % 320 == 0){
            carrots = createSprite(900,200);
            carrots.velocityX = -(6 + score/150);
            carrots.addImage(carrotImg);
            carrots.scale = 0.1;
            carrotGroup.add(carrots);
            carrots.lifetime = 600;
            

            

          

            
        }

    

        
    }

    function reset(){
        replay.visible = false;
        game_over.visible = false;
        carrotGroup.destroyEach();
        fireGroup.destroyEach();

        scenery.velocityX = -4;
        score = 0;
        gameState = "start";
    
    }