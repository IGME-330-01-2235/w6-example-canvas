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

const clear = () => {
  context.resetTransform()
  context.fillStyle = 'rebeccapurple'
  context.fillRect(0, 0, SIZE, SIZE)
}

const drawCursor = () => {
  // use a 0.5 number for crisp 1px lines on the pixel grid
  const center: Point = {
    x: Math.floor(position.x) + 0.5,
    y: Math.floor(position.y) + 0.5,
  }

  context.setTransform(1, 0, 0, 1, center.x, center.y)

  context.strokeStyle = 'white'
  context.lineWidth = 1
  context.beginPath()
  // draw the plus in the center
  context.moveTo(-4.5, 0)
  context.lineTo(4.5, 0)
  context.moveTo(0, -4.5)
  context.lineTo(0, 4.5)

  // draw the top left bracket
  context.moveTo(-15, -9.5)
  context.lineTo(-15, -15)
  context.lineTo(-9.5, -15)

  // draw the top right bracket
  context.moveTo(15, -9.5)
  context.lineTo(15, -15)
  context.lineTo(9.5, -15)

  // draw the bottom left bracket
  context.moveTo(-15, 9.5)
  context.lineTo(-15, 15)
  context.lineTo(-9.5, 15)

  // draw the bottom right bracket
  context.moveTo(15, 9.5)
  context.lineTo(15, 15)
  context.lineTo(9.5, 15)

  context.stroke()

  // draw text coordinates
  context.fillStyle = 'white'
  context.font = '9px monospace'
  context.fillText(center.x.toString(), 20, -9)
  context.fillText(center.y.toString(), 20, 14)
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
