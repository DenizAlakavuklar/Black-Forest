const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const bgImg = new Image()
bgImg.src = './images/background.png' 




const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  

}

const startGame = () => {
  document.querySelector('.game-intro').style.display = 'none'
  animate()
}

window.addEventListener('load', () => {
  document.getElementById('start-button').onclick = () => {
    startGame()
  }

 
})
