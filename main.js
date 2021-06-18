"use strict"
let character=document.querySelector(".character");

let map=document.querySelector(".map");
// let cam=document.querySelector(".camera");
let x=0;
let y=0;
let held_directions=[];
let speed=3.8;

const placeCharacter=()=>{
    let pixelSize=parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );
    const held_direction=held_directions[0];
    if(held_direction){
        if(held_direction===directions.right){x+=speed; walk_right();
            setInterval(() => {
                mob_walk_left();
            }, 710);
        }
        if(held_direction===directions.left){x-=speed; walk_left();}

        character.setAttribute("facing",held_direction);
    
    }

    character.setAttribute("walking",held_direction?"true":"false");
    
     // mob.setAttribute("walking",held_direction?"true":"false");
    if(x>650||x<-2){ 
        character.style.transform=false

       }
       else{  
           character.style.transform=`translate3d(${x*pixelSize}px,${y*pixelSize}px,0)`;
             
          
        //    mob.style.transform=`translate3d(${x*pixelSize}px,${y*pixelSize}px,0)`;
        
       }


   if(x>300||x<-2){
    map.style.transform=false
   }
   else{  
         let camera_left=pixelSize*1;
    map.style.transform=`translate3d(${-x*pixelSize+camera_left}px,${-y*pixelSize}px,0)`;
    
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
    right:'right'
}
const keys={
    37:directions.left,
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
            drawImage(hero_left, 0, 452);
            drawImage(mob_right,110, 452);
           
}
function walk_right() {
        context.clearRect(0, 0, width, height);
        drawImage(hero_right, 0, 452);
        drawImage(mob_left, 110, 447);
}
// function mob_walk_left() { 
//      context.clearRect(0, 0, width, height);
  
  
// }
// function walk_mob_left() {
//         context.clearRect(0, 0, width, height);
//         drawImage(mob_left, 500, 420);
       
// }

    // context.clearRect(0, 0, width, height);
    // drawImage(mob_right, 500, 420);

// setInterval(function() {
//     context.clearRect(0, 0, width, height);
   
//     drawImage(mob_right, 100, 120);


// }, 200)
// function timer(){
//     context.clearRect(0, 0, width, height);
//     drawImage(mob_left, 100, 120);
// }
let context = document.querySelector(".character").getContext("2d");

let width = 1100,
    height = 1000;
   
let hero_left = loadImage("img/hero_walk.png", 64, 160, 7);
let mob_left = loadImage("img/mob_left.png", 66, 160, 7);
let mob_right = loadImage("img/mob_right.png", 66, 160, 7);
let hero_right = loadImage("img/hero_walk_right.png", 64, 160, 7);
// let girl2 = loadImage("last-guardian-sprites/amg3_lf2.gif", 32, 32, 2);


    


function drawImage(img, c, v) {
    if (img.num >= img.count) img.num = 1
    else img.num += 1;
    context.drawImage(img.dom, img.width * (img.num - 1), 0, img.width/1.4, img.height/1.3, c-10, v,64, 360);
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