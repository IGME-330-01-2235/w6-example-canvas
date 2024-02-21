import './styles/reset.css'
import './styles/styles.css'

const SIZE = 600
const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = SIZE
canvas.height = SIZE

const context = canvas.getContext('2d') as CanvasRenderingContext2D

interface Point {
  x: number
  y: number
}

const target: Point = { x: SIZE / 2, y: SIZE / 2 }
const position: Point = { x: SIZE / 2, y: SIZE / 2 }

// flash the canvas once to avoid ghosting trails
context.fillStyle = 'white'
context.fillRect(0, 0, SIZE, SIZE)

const clear = () => {
  // draw with a mostly transparent fill to leave a tail
  context.fillStyle = 'rgba(102, 51, 153, 0.1)'
  context.fillRect(0, 0, SIZE, SIZE)
}

const drawCursor = () => {
  context.fillStyle = 'white'
  context.beginPath()
  context.arc(position.x, position.y, 5, 0, 2 * Math.PI)
  context.fill()
}

const update = () => {
  position.x += (target.x - position.x) * 0.05
  position.y += (target.y - position.y) * 0.05
}

const render = () => {
  clear()
  update()
  drawCursor()
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)

canvas.addEventListener('mousemove', (event: MouseEvent) => {
  target.x = event.offsetX
  target.y = event.offsetY
})
