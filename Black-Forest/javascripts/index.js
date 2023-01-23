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


const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(charImg, charX, charY, charWidth, charHeight)

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
  requestAnimationFrame(animate)
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
