class Stone {
    constructor() {
        var options = {
            isStatic: false,
            restitution: 0,
            friction: 1,
            density: 1.2
        }
        this.body = Bodies.circle(220,400,10, options);
        this.image = loadImage('images/stone.png');
        World.add(world,this.body);
    }
    display() {
        this.image.resize(50,50);
        image(this.image,this.body.position.x,this.body.position.y);
    }
}