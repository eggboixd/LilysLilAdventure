import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const lilyElem = document.querySelector("[data-lily]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.00165
const LILY_FRAME_COUNT = 4
const FRAME_TIME = 100

let isJumping
let lilyFrame
let currentFrameTime
let yVelocity
export function setupLily() {
  isJumping = false
  lilyFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(lilyElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
  }

export function updateLily(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getLilyRect() {
  return lilyElem.getBoundingClientRect()
}

export function setLilyLose() {
  lilyElem.src = 'imgs/lily-lose.png'
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    lilyElem.src = `imgs/lily-jumping.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    lilyFrame = (lilyFrame + 1) % LILY_FRAME_COUNT
    lilyElem.src = `imgs/lily-run-${lilyFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(lilyElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(lilyElem, "--bottom") <= 0) {
    setCustomProperty(lilyElem, "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space"|| isJumping)
  if (e.code !== "ArrowUp" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
