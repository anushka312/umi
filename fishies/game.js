const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let brown_fish;
let sea;
let cursors;

function preload() {
  this.load.image('brown_fish', 'assets/PNG/Default/fish_brown.png');
  this.load.image('blue_fish', 'assets/PNG/Default/fish_blue.png');
  this.load.image('green_fish', 'assets/PNG/Default/fish_green.png');
  this.load.image('orange_fish', 'assets/PNG/Default/fish_orange.png');
  this.load.image('red_fish', 'assets/PNG/Default/fish_red.png');
  this.load.image('sea', 'assets/PNG/Default/background_terrain.png');
}

function create() {
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'sea').setScale(30).refreshBody();
  platforms.create(600, 400, 'sea');
  platforms.create(50, 250, 'sea');
  platforms.create(750, 220, 'sea');
  platforms.create(350, 220, 'sea');

  // Brown Fish (player)
  brown_fish = this.physics.add.sprite(100, 450, 'brown_fish');
  brown_fish.setBounce(0.2);
  brown_fish.setCollideWorldBounds(true);

  // Other fishes (non-player)
  const blue_fish = this.physics.add.sprite(200, 300, 'blue_fish');
  const green_fish = this.physics.add.sprite(300, 200, 'green_fish');
  const orange_fish = this.physics.add.sprite(400, 100, 'orange_fish');
  const red_fish = this.physics.add.sprite(500, 300, 'red_fish');

  [blue_fish, green_fish, orange_fish, red_fish].forEach(fish => {
    fish.setBounce(0.2);
    fish.setCollideWorldBounds(true);
  });

  // Colliders with platforms
  this.physics.add.collider(brown_fish, platforms);
  this.physics.add.collider(blue_fish, platforms);
  this.physics.add.collider(green_fish, platforms);
  this.physics.add.collider(orange_fish, platforms);
  this.physics.add.collider(red_fish, platforms);

  // Optional: Add overlap or interaction logic later if needed

  cursors = this.input.keyboard.createCursorKeys();
}


function update() {
  if (cursors.left.isDown) {
    brown_fish.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    brown_fish.setVelocityX(160);
  } else {
    brown_fish.setVelocityX(0);
  }

  if(cursors.up.isDown) {
    brown_fish.setVelocityY(-160);
  }else if(cursors.down.isDown){
    brown_fish.setVelocityY(160);
  }else{
    brown_fish.setVelocityY(0);
  }
}
