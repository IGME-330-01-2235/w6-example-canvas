import './styles/reset.css'
import './styles/styles.css'

const downloadButton = document.getElementById('download')

const SIZE = 600
const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = SIZE
canvas.height = SIZE

const context = canvas.getContext('2d') as CanvasRenderingContext2D
context.fillStyle = 'black'
context.fillRect(0, 0, SIZE, SIZE)
let isDrawing = false

// set isDrawing to true when pressing the mouse while over the canvas
canvas.addEventListener('mousedown', () => {
  isDrawing = true
})

// set isDrawing to false when releasing the mouse anywhere in the document
document.addEventListener('mouseup', () => {
  isDrawing = false
})
interface Point {
  x: number
  y: number
}

const position: Point = { x: SIZE / 2, y: SIZE / 2 }

// update position when the mouse moves over the canvas
canvas.addEventListener('mousemove', (event: MouseEvent) => {
  position.x = event.offsetX
  position.y = event.offsetY
})

// when isDrawing is true, draw a 2px square at the mouse location
const drawCursorMaybe = () => {
  if (isDrawing) {
    const x = Math.floor(position.x)
    const y = Math.floor(position.y)
    context.fillStyle = 'white'
    context.fillRect(x - 1, y - 1, 2, 2)
  }
}

const render = () => {
  drawCursorMaybe()
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)

// save the canvas image to a local file
downloadButton!.addEventListener('click', () => {
  // Convert our canvas to a data URL
  const canvasUrl = canvas.toDataURL()
  // Create an anchor, and set the href value to our data URL
  const createEl = document.createElement('a')
  createEl.href = canvasUrl

  console.log(canvasUrl)

  // This is the name of our downloaded file
  createEl.download = 'canvas-snapshot'

  // Click the download button, causing a download, and then remove it
  createEl.click()
  createEl.remove()
})
