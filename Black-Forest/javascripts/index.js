const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const bgImg = new Image()
bgImg.src = './images/background.png' 

const charImg = new Image()
charImg.src = './images/female1.png'

const charWidth = 160
const charHeight = 200

let charX = 10
let charY = 450


let isMovingLeft = false
let isMovingRight = false
let isMovingUp= false
let isMovingDown = false

let animateId

let ghosts = []



class Ghost {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos
    this.yPos = yPos
    this.width = width
    this.height = height
    
  }
  draw() {
    ctx.beginPath()
    ctx.fillStyle = 'tomato'
    this.yPos += 2
    ctx.rect(this.xPos, this.yPos, this.width, this.height)
    ctx.fill()
    ctx.closePath()
}
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(charImg, charX, charY, charWidth, charHeight)

  ghosts.forEach(ghost => {
    ghost.draw()
  })
  ghosts = ghosts.filter(ghost => ghost.yPos < canvas.height)
  // this removes the already came ghost.

  if (isMovingRight === true) { charX += 2};
  if (isMovingLeft === true) { charX -= 2} ;
  if (isMovingUp === true) { charY -= 2};
  if (isMovingDown === true) { charY += 2} ;

  if (charX <= 0) {
    charX = 0;
  }
  if (charX > canvas.width-charWidth) {
    charX = canvas.width-charWidth;
  }

  if (charY <= 0) {
    charY = 110;
  }
  if (charY > canvas.height-charHeight) {
    charY = canvas.height-charHeight;
  }

  if (animateId % 100 === 0) {
    ghosts.push(new Ghost(canvas.width * Math.random(), -50, 50, 50))
  }
  console.log(ghosts)
  console.log(animateId)
  animateId = requestAnimationFrame(animate)
}

const startGame = () => {
  document.querySelector('.game-intro').style.display = 'none'
  animate()
}

window.addEventListener('load', () => {
  document.getElementById('start-button').onclick = () => {
    startGame()
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
