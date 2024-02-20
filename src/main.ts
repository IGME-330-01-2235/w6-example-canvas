import './styles/reset.css'
import './styles/styles.css'

const SIZE = 600
const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = SIZE
canvas.height = SIZE

const context = canvas.getContext('2d') as CanvasRenderingContext2D

// type to hold points
interface Point {
  x: number
  y: number
}

// target represents where we want to be, eventually
const target: Point = { x: SIZE / 2, y: SIZE / 2 }
// position represents where we are right now
const position: Point = { x: SIZE / 2, y: SIZE / 2 }

const clear = () => {
  context.fillStyle = 'rebeccapurple'
  context.fillRect(0, 0, SIZE, SIZE)
}

const drawCursor = () => {
  context.fillStyle = 'white'
  context.beginPath()
  context.arc(position.x, position.y, 5, 0, 2 * Math.PI)
  context.fill()
}

const update = () => {
  // update position to move part of the way towards the target
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
  // the target is set to the mouse coordinates
  target.x = event.offsetX
  target.y = event.offsetY
})
