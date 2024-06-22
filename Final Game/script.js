import { updateGround, setupGround } from "./ground.js"
import { updateTree, setupTree } from "./tree.js"
import { updateLily, setupLily, getLilyRect, setLilyLose } from "./Lily.js"
import { updateCactus, setupCactus, getCactusRects } from "./cactus.js"
import { updatePuddle, setupPuddle, getPuddleRects } from "./puddle.js"
import { updateCloud, setupCloud } from "./cloud.js"
import { updateCloud2, setupCloud2 } from "./cloud2.js"
import { updateLebah, setupLebah} from "./lebah.js"
import { updateBench, setupBench } from "./bench.js"
import {updateGrass, setupGrass} from "./grass.js"
import {updateGrass2, setupGrass2} from "./grass2.js"
import { updateFlower, setupFlower } from "./flower.js"
import { updateFlower2, setupFlower2 } from "./flower2.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const highScoreElem = document.querySelector("[data-highscore")
const startScreenElem = document.querySelector("[data-start-screen]")
const playElem = document.querySelector("[data-play]")
const retryElem = document.querySelector("[data-retry]")
const x = document.querySelector("[data-bgm")
const tutor = document.querySelector("[data-tutor]")

//update baru
const popoutElem = document.querySelector("[data-popout]")
const creditElem = document.querySelector("[data-credit]")
const closeElem = document.querySelector("[data-close]")
const creditElem2 = document.querySelector("[data-credit2]")
const closeElem2 = document.querySelector("[data-close2]")
//update baru

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
playElem.addEventListener("click", handleStart, { once: true })


//update baru
creditElem.addEventListener("click", popoutTrue, { once: true })

//update baru


let lastTime
let speedScale
let score
let highScore

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateTree(delta, speedScale)
  updateCloud(delta, speedScale)
  updateCloud2(delta, speedScale)
  updateLebah(delta, speedScale)
  updateBench(delta, speedScale)
  updateGrass(delta, speedScale)
  updateGrass2(delta, speedScale)
  updateFlower(delta, speedScale)
  updateFlower2(delta, speedScale)
  updateLily(delta, speedScale)
  updateCactus(delta, speedScale)
  updatePuddle(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()
  if (checkLose1()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

window.addEventListener("DOMContentLoaded", event => {
  const audio = document.querySelector("audio");
  audio.volume = 0.2;
  audio.play();
});

{retryElem.style.display = 'none'}

//update baru
{popoutElem.style.display = 'none'}
{closeElem.style.display = 'none'}
{creditElem2.style.display = 'none'}
{closeElem2.style.display = 'none'}
//update baru


function checkLose() {
  const lilyRect = getLilyRect()
  return getCactusRects().some(rect => isCollision(rect, lilyRect)) 
}

function checkLose1() {
  const lilyRect = getLilyRect()
  return getPuddleRects().some(rect => isCollision(rect, lilyRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.top <= rect2.bottom &&
    rect1.right >= rect2.left &&
    rect1.bottom >= rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  speedScale = 1.1
  score = 0
  setupGround()
  setupTree()
  setupCloud()
  setupCloud2()
  setupLebah()
  setupBench()
  setupGrass()
  setupGrass2()
  setupFlower()
  setupFlower2()
  setupLily()
  setupCactus()
  setupPuddle()
  window.requestAnimationFrame(update)
  {tutor.style.display = 'none'}
  {playElem.style.display = 'none'}
  {retryElem.style.display = 'none'}
  {creditElem.style.display = 'none'}
  {closeElem2.style.display = 'none'}
  {creditElem2.style.display = 'none'}
}

function handleLose() {
  setLilyLose()
  setTimeout(() => {
    creditElem2.addEventListener("click", popout2True, { once: true })
    retryElem.addEventListener("click", handleStart, { once: true })
    {retryElem.style.display = 'block'}
    {tutor.style.display = 'block'}
    {creditElem2.style.display = 'block'}
  }, 100)
}

//update baru
function popoutTrue() {
  closeElem.addEventListener("click", popoutFalse, { once: true })
  {popoutElem.style.display = 'block'}
  {closeElem.style.display = 'block'}
  {creditElem.style.display = 'none'}
  {playElem.style.display = 'none'}
  {tutor.style.display = 'none'}
}

function popoutFalse() {
  creditElem.addEventListener("click", popoutTrue, { once: true })
  {popoutElem.style.display = 'none'}
  {closeElem.style.display = 'none'}
  {creditElem.style.display = 'block'}
  {playElem.style.display = 'block'}
  {tutor.style.display = 'block'}
}

function popout2True() {
  closeElem2.addEventListener("click", popout2False, { once: true })
  {popoutElem.style.display = 'block'}
  {closeElem2.style.display = 'block'}
  {creditElem2.style.display = 'none'}
  {retryElem.style.display = 'none'}
  {tutor.style.display = 'none'}
}

function popout2False() {
  creditElem2.addEventListener("click", popout2True, { once: true })
  {popoutElem.style.display = 'none'}
  {closeElem2.style.display = 'none'}
  {creditElem2.style.display = 'block'}
  {retryElem.style.display = 'block'}
  {tutor.style.display = 'block'}
}
//update baru

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}



