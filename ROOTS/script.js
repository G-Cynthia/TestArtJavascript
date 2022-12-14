/** @type{HTMLCanvasElement } */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing =  false; 
ctx.lineWidth = 1;
// ctx.globalCompositeOperation = 'destination-over';



//  mouvement , size and speed of roots
class Root {
    constructor(x, y){
        this.x = x ;
        this.y = y ; 
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        // max size between 7 to 5 pixels 
        this.maxSize = Math.random() * 5 + 3; 
        //intinial size between 1 to 2 pixels
        this.size = Math.random() * 1 + 2; 
        this.vs = Math.random() * 0.2 + 0.05;
        //add curve and speed on the root 
        this.angleX = Math.random() * 6.2; 
        this.vax = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() * 6.2; 
        this.vay = Math.random() * 0.6 - 0.3;
        this.lightness = 10;
    }
    update(){
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        if (this.lightness < 70) this.lightness += 0.25;
        //create a new segment of the root 
        if (this.size < this.maxSize){
            //start the draw
            ctx.beginPath(); 
             // draw a circle
            ctx.arc(this.x , this.y, this.size, 0, Math.PI * 2);
             //set la couleur 
            ctx.fillStyle = '#a7c957';
            ctx.fill(); 
            // bordure
            ctx.stroke();
            requestAnimationFrame(this.update.bind(this));
        } 
        else {
            const flower = new Flower(this.x, this.y, this.size);
            flower.grow();
        }
    }
}
// size , rotation , position --> flowers
class Flower {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.vs = Math.random() * 0.3 + 0.2;
        this.maxFlowerSize = this.size + Math.random() * 100;
        this.image = new Image();
        this.image.src = 'flowers.png';
        this.frameSize = 100; 
        this.frameX = Math.floor (Math.random() * 3);
        this.frameY = Math.floor (Math.random() * 3);
        this.size > 5.5 ?  this.willFlower = true : this.willFlower = false;
        this.angle = 0; 
        this.va = Math.random() * 0.05 - 0.025;

    }
    grow(){
        if (this.size < this.maxFlowerSize && this.willFlower){
            this.size += this.vs;
            this.angle +=  this.va;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.drawImage(this.image, this.frameSize * this.frameX , this.frameSize * this.frameY ,
                 this.frameSize , this.frameSize , 0 - this.size/2, 0 - this.size/2, this.size, this.size);
            ctx.restore();
            requestAnimationFrame(this.grow.bind(this));
        }
       
    }
}

//animated paint brush 
window.addEventListener('mousemove' , function(e){
    if (drawing){
        //densite pinceau
        for(let i = 0; i < 3; i++){
            const root = new Root(e.x, e.y);
            root.update();
    }
    
    }
});
// draw roots only when mouse is press
window.addEventListener('mousedown', function(e){
    drawing = true;
    //nombre de root
    for(let i = 0; i < 5; i++){
        const root = new Root(e.x, e.y);
        root.update();
    }
});
window.addEventListener('mouseup', function(){
    drawing = false;
});
