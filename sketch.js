var dog, happyDog;
var food, foodStock;
var database;

function preload()
{
  dogImage=loadImage("images/dogImg1.png");
  happyDogImg=loadImage("images/dogImg.png");
  
}

function setup() {
  database = firebase.database();
	createCanvas(800, 800);
  dog = createSprite(300,600,600,20);
  dog.addImage(dogImage);
  dog.scale = 0.5
  foodStock = database.ref('food');
  foodStock.on("value", readStock)
}


function draw() {  
background(46,139,87)
textSize(30)
text("Note: Press up arrow to feed the dog",250,250)
text("Food in Stock:"+food,250,300)

//if(keyDown(UP_ARROW)){
//readStock(food);
//}

if(keyWentDown(UP_ARROW)){
  writeStock(food);
  dog.addImage(happyDogImg)
}

dog.display();
  drawSprites();
  

}

function readStock(data){
  food = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}

