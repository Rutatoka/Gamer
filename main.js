"use strict"
let character=document.querySelector(".character");
let map=document.querySelector(".map");
let x=0;
let y=0;
let held_directions=[];
let speed=0.8;

const placeCharacter=()=>{
    let pixelSize=parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );
    const held_direction=held_directions[0];
    if(held_direction){
        if(held_direction===directions.right){x+=speed; walk_right();}
        if(held_direction===directions.left){x-=speed; walk_left();}

        character.setAttribute("facing",held_direction);

    }
    
     if(character.walking===false){ walk_stoper();}
    character.setAttribute("walking",held_direction?"true":"false");
   
    character.style.transform=`translate3d(${x*pixelSize}px,${y*pixelSize}px,0)`;


    let camera_left=pixelSize*1;
     
    map.style.transform=`translate3d(${-x*pixelSize+camera_left}px,${-y*pixelSize}px,0)`;

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
            drawImage(hero_left, 0, 560);
       
           
}
function walk_right() {
        context.clearRect(0, 0, width, height);
        drawImage(hero_right, 0, 560);
        
}
function walk_stoper() {
        context.clearRect(0, 0, width, height);
        // drawImage(hero_stop, 0, 420);
        // walk_left()=false;
        // walk_right()=false;
}

let context = document.querySelector(".character").getContext("2d");
let width = 100,
    height = 700;
   
let hero_left = loadImage("img/hero_walk.png", 64, 160, 7);
let hero_stop = loadImage("img/hero_stop.png", 65, 160, 1);
let hero_right = loadImage("img/hero_walk_right.png", 64, 160, 7);
// let girl2 = loadImage("last-guardian-sprites/amg3_lf2.gif", 32, 32, 2);



function drawImage(img, c, v) {
    if (img.num >= img.count) img.num = 1
    else img.num += 1;
    context.drawImage(img.dom, img.width * (img.num - 1), 0, img.width/1.2, img.height/2, c-10, v,64, 160);
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