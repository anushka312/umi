// File: fishies-full.js

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  resolution: window.devicePixelRatio,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player, cursors, score = 0, scoreText, highScoreText, fishGroup, enemyGroup, gameOverText, playButton, leaderboardText, rulesText, startButton;
let fishTimer, enemyTimer;
const gameId = 1;
let gameOver = false;
let inRules = true;

function preload() {
  this.load.atlasXML('fishAtlas', '/fishies/spritesheet.png', '/fishies/spritesheet.xml');
}

function create() {
  if (!localStorage.getItem('walletAddress')) {
    this.add.text(100, 250, 'Connect Wallet to Play', { fontFamily: 'Verdana', fontSize: '28px', fill: '#fff' });
    return;
  }

  this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'fishAtlas', 'background_terrain').setOrigin(0);

  for (let i = 0; i < 20; i++) {
    const x = Phaser.Math.Between(0, window.innerWidth);
    const sprite = Phaser.Utils.Array.GetRandom([
      'seaweed_green_a', 'seaweed_pink_b', 'rock_a', 'background_seaweed_a'
    ]);
    this.add.image(x, window.innerHeight - 10, 'fishAtlas', sprite).setScale(1).setOrigin(0.5, 1);
  }

  rulesText = this.add.text(window.innerWidth / 2, window.innerHeight / 2 - 120,
    '🎮 Welcome to Fishies🐠\n\n📜 Rules:\n✅ Collect red & orange fish for points\n❌ Avoid brown & grey fish\n💥 Touching enemies ends the game! \n Use Up, Down, Left, Right keys to operate',
    {
      fontFamily: 'Comic Sans MS',
      fontSize: '26px',
      fill: '#ffffff',
      align: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: { left: 20, right: 20, top: 15, bottom: 15 },
      wordWrap: { width: 600, useAdvancedWrap: true },
      lineSpacing: 10,
      resolution: 2
    }
  ).setOrigin(0.5);

  startButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 80, '▶ Start Game', {
    fontFamily: 'Comic Sans MS', fontSize: '32px', fill: '#ffffff', backgroundColor: '#00c853', padding: 10
  }).setOrigin(0.5).setInteractive();

  startButton.on('pointerdown', () => {
    rulesText.setVisible(false);
    startButton.setVisible(false);
    inRules = false;
    launchGame.call(this);
  });
}

function launchGame() {
  this.add.text(40, 20, 'Fishies', { fontFamily: 'Comic Sans MS', fontSize: '38px', fill: '#00e1ff' });
  scoreText = this.add.text(40, 70, 'Score: 0', { fontFamily: 'Comic Sans MS', fontSize: '26px', fill: '#ffffff' });
  highScoreText = this.add.text(40, 110, '', { fontFamily: 'Comic Sans MS', fontSize: '22px', fill: '#ffff99' });

  player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'fishAtlas', 'fish_blue');
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  fishGroup = this.physics.add.group();
  enemyGroup = this.physics.add.group();

  fishTimer = this.time.addEvent({ delay: 2000, callback: () => spawnFish(this), loop: true });
  enemyTimer = this.time.addEvent({ delay: 3000, callback: () => spawnEnemy(this), loop: true });

  this.physics.add.overlap(player, fishGroup, collectFish, null, this);
  this.physics.add.overlap(player, enemyGroup, handleGameOver, null, this);

  fetchHighScore();

  playButton = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 40, '▶ Play Again', {
    fontFamily: 'Comic Sans MS', fontSize: '32px', fill: '#ffffff', backgroundColor: '#00c853', padding: 10
  }).setOrigin(0.5).setInteractive().setVisible(false);

  playButton.on('pointerdown', () => restartGame(this));

  leaderboardText = this.add.text(window.innerWidth - 300, 30, '', {
    fontFamily: 'Courier', fontSize: '18px', fill: '#ffffff', align: 'right'
  });
  fetchLeaderboard();
}

function update() {
  if (gameOver || inRules || !player) return;

  player.setVelocity(0);
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
    player.setFlipX(true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
    player.setFlipX(false);
  }
  if (cursors.up.isDown) player.setVelocityY(-200);
  if (cursors.down.isDown) player.setVelocityY(200);
}

function spawnFish(scene) {
  const fishNames = ['fish_red', 'fish_orange'];
  const padding = 100;
  const x = Phaser.Math.Between(padding, window.innerWidth - padding);
  const y = Phaser.Math.Between(padding, window.innerHeight - padding);
  const frame = Phaser.Utils.Array.GetRandom(fishNames);
  const fish = scene.physics.add.sprite(x, y, 'fishAtlas', frame);
  fish.setData('type', 'collectible');
  fishGroup.add(fish);
}

function spawnEnemy(scene) {
  const enemies = ['fish_grey', 'fish_brown'];
  const padding = 100;
  const x = Phaser.Math.Between(padding, window.innerWidth - padding);
  const y = Phaser.Math.Between(padding, window.innerHeight - padding);
  const enemy = scene.physics.add.sprite(x, y, 'fishAtlas', Phaser.Utils.Array.GetRandom(enemies));
  enemy.setData('type', 'enemy');
  enemyGroup.add(enemy);
}

function collectFish(player, fish) {
  if (gameOver) return;
  score += 1;
  scoreText.setText('Score: ' + score);
  fish.destroy();
  if (score % 5 === 0) saveScore(score);
}

function handleGameOver(player, enemy) {
  gameOver = true;
  player.setTint(0xff0000);

  if (gameOverText) gameOverText.destroy(); // Remove old if any

  gameOverText = player.scene.add.text(
    window.innerWidth / 2,
    window.innerHeight / 2 - 80,
    '💀 Game Over 💀',
    {
      fontFamily: 'Comic Sans MS',
      fontSize: '48px',
      fill: '#ff5555'
    }
  ).setOrigin(0.5);

  playButton.setVisible(true);
  fetchLeaderboard();
}

function restartGame(scene) {
  fishGroup.clear(true, true);
  enemyGroup.clear(true, true);

  if (fishTimer) fishTimer.remove();
  if (enemyTimer) enemyTimer.remove();

  if (gameOverText) {
    gameOverText.destroy();
    gameOverText = null;
  }

  player.setPosition(window.innerWidth / 2, window.innerHeight / 2);
  player.clearTint();

  score = 0;
  gameOver = false;
  scoreText.setText('Score: 0');
  playButton.setVisible(false);

  fishTimer = scene.time.addEvent({ delay: 2000, callback: () => spawnFish(scene), loop: true });
  enemyTimer = scene.time.addEvent({ delay: 3000, callback: () => spawnEnemy(scene), loop: true });

  fetchLeaderboard();
}

async function saveScore(score) {
  const walletAddress = localStorage.getItem('walletAddress');
  try {
    await fetch(`https://umi-b.onrender.com/api/users/${walletAddress}/gameStats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, score })
    });
  } catch (err) {
    console.error('Failed to save score:', err);
  }
}

async function fetchHighScore() {
  const walletAddress = localStorage.getItem('walletAddress');
  try {
    const res = await fetch(`https://umi-b.onrender.com/api/users/${walletAddress}`);
    const user = await res.json();
    const stats = user.gameStats?.find(s => s.gameId === gameId);
    if (stats) highScoreText.setText('High Score: ' + stats.highestScore);
  } catch (err) {
    console.error('Failed to fetch high score:', err);
  }
}

async function fetchLeaderboard() {
  const walletAddress = localStorage.getItem('walletAddress');
  try {
    const res = await fetch('https://umi-b.onrender.com/api/users');
    const users = await res.json();
    const scores = users.map(u => {
      const stat = u.gameStats?.find(s => s.gameId === gameId);
      return stat ? {
        name: u.profile?.name?.trim() || 'Anon',
        score: stat.highestScore,
        wallet: u.walletAddress
      } : null;
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 5);

    leaderboardText.setText(
      '🏆 Leaderboard 🏆\n' +
      scores.map((s, i) => `${i + 1}. ${s.wallet === walletAddress ? '👉 ' : ''}${s.name}: ${s.score}`).join('\n')
    );
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
  }
}