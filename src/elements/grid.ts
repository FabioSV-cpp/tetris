interface Dimensions {
  x: number
  y: number
  size: number
}

const defaultDimensions: Dimensions = {
  x: 10,
  y: 20,
  size: 40,
}

export const Grid = (ctx: CanvasRenderingContext2D, dimensions: Dimensions = defaultDimensions) => {
  const width = dimensions.x * dimensions.size
  const height = dimensions.y * dimensions.size

  for (let x = 0; x <= width; x += dimensions.size) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)

    for (let y = 0; y <= height; y += dimensions.size) {
      ctx.moveTo(x, y)
      ctx.lineTo(width, y)
    }
  }

  ctx.lineWidth = 1
  ctx.strokeStyle = '#08081b'
  ctx.stroke()
}
