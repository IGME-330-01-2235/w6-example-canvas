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
  context.fillStyle = 'rebeccapurple'
  context.fillRect(0, 0, SIZE, SIZE)
}

const drawCursor = () => {
  // use a 0.5 number for crisp 1px lines on the pixel grid
  const center: Point = {
    x: Math.floor(position.x) + 0.5,
    y: Math.floor(position.y) + 0.5,
  }

  context.strokeStyle = 'white'
  context.lineWidth = 1
  context.beginPath()
  // draw the plus in the center
  context.moveTo(center.x - 4.5, center.y)
  context.lineTo(center.x + 4.5, center.y)
  context.moveTo(center.x, center.y - 4.5)
  context.lineTo(center.x, center.y + 4.5)

  // draw the top left bracket
  context.moveTo(center.x - 15, center.y - 9.5)
  context.lineTo(center.x - 15, center.y - 15)
  context.lineTo(center.x - 9.5, center.y - 15)

  // draw the top right bracket
  context.moveTo(center.x + 15, center.y - 9.5)
  context.lineTo(center.x + 15, center.y - 15)
  context.lineTo(center.x + 9.5, center.y - 15)

  // draw the bottom left bracket
  context.moveTo(center.x - 15, center.y + 9.5)
  context.lineTo(center.x - 15, center.y + 15)
  context.lineTo(center.x - 9.5, center.y + 15)

  // draw the bottom right bracket
  context.moveTo(center.x + 15, center.y + 9.5)
  context.lineTo(center.x + 15, center.y + 15)
  context.lineTo(center.x + 9.5, center.y + 15)

  context.stroke()

  // draw text coordinates
  context.fillStyle = 'white'
  context.font = '9px monospace'
  context.fillText(center.x.toString(), center.x + 20, center.y - 9)
  context.fillText(center.y.toString(), center.x + 20, center.y + 14)
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
