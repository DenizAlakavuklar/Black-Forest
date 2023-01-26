const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

//audiosfiles
let audioGameIntro = new Audio('./audio/night-forest.wav')
audioGameIntro.volume = 0.03

// IMAGES
const bgImg = new Image()
bgImg.src = './images/background.png'
const charImg = new Image()
charImg.src = './images/char1.png'
const ghostImg = new Image()
ghostImg.src = './images/ghost.png'
const resource1Img = new Image()
resource1Img.src = "./images/resource1.png"

// VARIABLES
const resource1ImgWidth = 80
const resource1ImgHeight = 80

const ghostImgWidth = 30
const ghostImgHeight = 60

const charWidth = 80
const charHeight = 200

let isMovingLeft = false
let isMovingRight = false
let isMovingUp = false
let isMovingDown = false

let gameOver = false

let ghosts = []
let resources = []
let score = 0
let charX = 10
let charY = 450
let animateId

function init() {
  ghosts = []
  resources = []
  score = 0
  charX = 10
  charY = 450
  animateId
  isMovingLeft = false
  isMovingRight = false
  isMovingUp = false
  isMovingDown = false
}

class Resource {
  constructor(xrPos, yrPos, rwidth, rheight) {
    this.xrPos = xrPos
    this.yrPos = yrPos
    this.rwidth = rwidth
    this.rheight = rheight
  }
  drawResource() {
    ctx.drawImage(resource1Img, this.xrPos, this.yrPos, this.rwidth, this.rheight)
    ctx.fill()
  }
  pickUpResource() {
    if (
      charX -10 < this.xrPos + this.rwidth +10  &&
      charX + charWidth -20 > this.xrPos &&
      charY < this.yrPos + this.rheight &&
      charHeight + charY > this.yrPos
    ) {
      gameOver = false;
      score += 20;
      resources.splice(resources[this], 1)
    }
  }
}

class Ghost {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
  }
  draw() {
    this.yPos += 2
    ctx.drawImage(ghostImg, this.xPos, this.yPos, ghostImgWidth, ghostImgHeight)
    ctx.fill()
  }
  checkCollision() {
    if (
      charX - 10 < this.xPos + ghostImgWidth + 10 &&
      charX + charWidth - 20 > this.xPos &&
      charY < this.yPos + ghostImgHeight - 30 &&
      charHeight + charY > this.yPos
    ) {
      gameOver = true
    }
  }
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(charImg, charX, charY, charWidth, charHeight)

  audioGameIntro.play()

  ctx.fillStyle = 'white'
  ctx.font = "36px serif";
  ctx.fillText(`Score: ${score}`, 1000, 30);
  ctx.fill()

  ghosts.forEach(ghost => {
    ghost.checkCollision()
    ghost.draw()
  })
  ghosts = ghosts.filter(ghost => ghost.yPos < canvas.height)
  // this removes the already came ghost.

  resources.forEach(resource => {
    resource.pickUpResource()
    resource.drawResource()
     })
  
  if (isMovingRight === true) { charX += 2 };
  if (isMovingLeft === true) { charX -= 2 };
  if (isMovingUp === true) { charY -= 2 };
  if (isMovingDown === true) { charY += 2 };

  if (charX <= 0) {
    charX = 0;
  }
  if (charX > canvas.width - charWidth) {
    charX = canvas.width - charWidth;
  }

  if (charY <= 0) {
    charY = 110;
  }
  if (charY > canvas.height - charHeight) {
    charY = canvas.height - charHeight;
  }

  if (animateId % 100 === 0) {
    ghosts.push(new Ghost(canvas.width * Math.random(), -50, 50, 50))
  
  }
  if (animateId % 200 === 0) {
    resources.push(new Resource(canvas.width * Math.random(), canvas.height * Math.random(), 50, 50))
    setInterval(Resource,5000)
  }
  if (gameOver) {
    cancelAnimationFrame(animateId)
    audioGameIntro.pause()
    alert("GAME OVER")
    document.querySelector('.game-intro').style.display = 'none'
    document.querySelector('.game-board').style.display = 'none'
    document.querySelector('.game-over').style.display = 'block'
    document.querySelector('.game-win').style.display = 'none'
  } else {
    animateId = requestAnimationFrame(animate)
  }

  if (score === 500) {
    console.log (x)
    cancelAnimationFrame(animateId)
    alert("WIN")
    document.querySelector('.game-intro').style.display = 'none'
    document.querySelector('.game-board').style.display = 'none'
    document.querySelector('.game-over').style.display = 'none'
    document.querySelector('.game-win').style.display = 'block'
    
  }
}

const startGame = () => {
  document.querySelector('.game-intro').style.display = 'none'
  document.querySelector('.game-board').style.display = 'block'
  document.querySelector('.game-over').style.display = 'none'
  document.querySelector('.game-win').style.display = 'none'

  animate()
}

window.addEventListener('load', () => {
  document.querySelector('.game-intro').style.display = 'block'
  document.querySelector('.game-board').style.display = 'none'
  document.querySelector('.game-over').style.display = 'none'
  document.querySelector('.game-win').style.display = 'none'

  document.getElementById('start-button').onclick = () => {
    startGame()
  
  }
  document.getElementById('restart-button').onclick = () => {

    document.querySelector('.game-intro').style.display = 'none'
    document.querySelector('.game-board').style.display = 'block'
    document.querySelector('.game-over').style.display = 'none'
    document.querySelector('.game-win').style.display = 'none'
    gameOver = false
    init()
    animate()
  }
  document.getElementById('replay-button').onclick = () => {

    document.querySelector('.game-intro').style.display = 'none'
    document.querySelector('.game-board').style.display = 'block'
    document.querySelector('.game-over').style.display = 'none'
    document.querySelector('.game-win').style.display = 'none'
    gameOver = false
    init()
    animate()
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 'ArrowRight') {
      isMovingRight = true
    }
    if (event.key === 'ArrowUp') {
      isMovingUp = true
    }
    if (event.key === 'ArrowDown') {
      isMovingDown = true
    }
  })

  document.addEventListener('keyup', event => {
    if (event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 'ArrowRight') {
      isMovingRight = false
    }
    if (event.key === 'ArrowUp') {
      isMovingUp = false
    }
    if (event.key === 'ArrowDown') {
      isMovingDown = false
    }
  })

})

