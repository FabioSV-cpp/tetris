// @ts-nocheck

import { moveDown, moveLeft, moveRight } from '../stores/blocks'

// document.addEventListener('touchstart', handleTouchStart, false)
// document.addEventListener('touchmove', handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ) // jQuery
}

function handleTouchStart(evt) {
  evt.preventDefault()
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY

  console.log('touch start')
}

function handleTouchMove(evt) {
  evt.preventDefault()
  console.log('touch move')

  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      moveLeft()

      /* right swipe */
    } else {
      moveRight()

      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      moveDown()

      /* up swipe */
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

export { handleTouchStart, handleTouchMove }
