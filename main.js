"use strict"
let character=document.querySelector(".character");
let map=document.querySelector(".map");
let health=document.querySelector("#health");
let stamina=document.querySelector("#stamina");
 let mob=document.querySelector(".mob");
 let arrow_img=document.querySelector(".arrow");
let x=40;
let y=0;
let c=0;
let v=0;
let held_directions=[];
let speed=7.8;
let Rect=function(l,o,k,j){
    this.l=l;
    this.o=o;
    this.k=k;
    this.j=j;

    this.dl=0;
    this.do=0;

    this.max=10;
    this.dd=0.1;

    this.fall=true;
}

Rect.prototype={
    draw:function(){
arrow();
    },
    move:function(){
this.l+=this.dl;
this.o+=this.do;
    },
    grav:function(){
        if(!this.fall) return;
        this.do+=this.do+=this.max?this.dd:0;
        if(this.o+this.j>=height){
            this.o=height-this.h;
            this.do=0;
        }

        if(Math.abs(this.dy)<this.dd-2&&this.o+this.j>=hero_atack_right){
this.fall=false;
this.do=0;
        }
    }
}

const placeCharacter=()=>{
    let pixelSize=parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );
    const held_direction=held_directions[0];
    if(held_direction){
        if(held_direction===directions.right){x+=speed; walk_right();}
        if(held_direction===directions.left){x-=speed;walk_left();}
        if(held_direction===directions.atack1){atack_left()}
        if(held_direction===directions.atack2){atack_right()}
        character.setAttribute("facing",held_direction);
    
    }

    character.setAttribute("walking",held_direction?"true":"false");
   if(x>900||x<-2){ 
        character.style.transform=false
       }
       else{  
           character.style.transform=`translate3d(${x*pixelSize}px,${y*pixelSize}px,0)`;
       }
      
   if(x>710||x<-2){
    map.style.transform=false
   }
   else{  
         let camera_left=pixelSize*1;
    map.style.transform=`translate3d(${-x*pixelSize/1.2+camera_left}px,${-y*pixelSize}px,0)`;
   }
}


const step=()=>{
    placeCharacter();
    window.requestAnimationFrame(()=>{
        step();
    })
}
step();

const directions={
    left:'left',
    right:'right',
    atack1:'atack1',
    atack2:'atack2'
}
const keys={
    37:directions.left,
    69:directions.atack2,
    81:directions.atack1,
    39:directions.right
}

document.addEventListener("keydown",(e)=>{
    let dir=keys[e.which];

    if(dir&&held_directions.indexOf(dir)===-1){
        held_directions.unshift(dir)
        
    } 
 
})

document.addEventListener("keyup",(e)=>{
   
    let dir=keys[e.which];
    let index=held_directions.indexOf(dir);
    if(index>-1){
        held_directions.splice(index,1)
    }
});

function walk_left() {
            context.clearRect(0, 0, width, height);
            drawImage(hero_left, 0, 30);
            HP();
            Stamina();
}
function walk_right() {
        context.clearRect(0, 0, width, height);
        drawImage(hero_right, 0, 30); 
        HP();
        Stamina();
} 

 function atack_right() { 
     for(let i=0;i<14;i++){

     setTimeout(() => {
context.clearRect(0, 0, width, height);
drawImage(hero_atack_right, 0, 30); 
if(i=9){
Rect.push(new Rect)
}
     }, 500);
 }
}


function atack_left() { 
    context.clearRect(0, 0, width, height);
   drawImage(hero_atack_left, 0, 30);
   
   }

   function arrow() { 
       if(  arrow_img.style.display!='block'){
        arrow_img.style.display='block'
        arrow_img.style.transform= character.style.transform;
        arrow_img.style.top=490+"px";
       }
      
   setTimeout(function(){
    arrow_img.style.display='none'
   },1200);
 
   }
 
 
   function HP(){
    health.style.transform= character.style.transform;
   }
   function Stamina(){
    stamina.style.transform= character.style.transform;
   }

let context = document.querySelector(".character").getContext("2d");

let width = 100,
    height = 300;
   
let hero_left = loadImage("img/hero_walk.png", 64, 160, 7);
let hero_atack_right = loadImage("img/hero_atack.png", 65, 160, 13);
let hero_atack_left = loadImage("img/hero_atack_left.png", 65, 160, 13);
// let mob_left = loadImage("img/mob_left.png", 66, 160, 7);
// let mob_right = loadImage("img/mob_right.png", 66, 160, 7);
let hero_right = loadImage("img/hero_walk_right.png", 64, 160, 7);

function drawImage(img, c, v) {
    if (img.num >= img.count) img.num = 1
    else img.num += 1;
    context.drawImage(img.dom, img.width * (img.num - 1),2, img.width/1.4, img.height/1.3, c-10, v,64, 360);
      }

function loadImage(path, width, height, count) {
    let image = document.createElement("img");
    let result = {
        dom: image,
        width: width,
        height: height,
        count: count,
        loaded: false,
        num: 1
    };
    image.onload = function() {
        result.loaded = true;
    };

    image.src = path;
    return result;
}