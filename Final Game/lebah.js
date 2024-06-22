import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.07
const LEBAH_INTERVAL_MIN = 3000
const LEBAH_INTERVAL_MAX = 4000
const worldElem = document.querySelector("[data-world]")

let nextLebahTime
export function setupLebah() {
  nextLebahTime = LEBAH_INTERVAL_MIN
  document.querySelectorAll("[data-lebah]").forEach(lebah=> {
    lebah.remove()
  })
}

export function updateLebah(delta, speedScale) {
  document.querySelectorAll("[data-lebah]").forEach(lebah => {
    incrementCustomProperty(lebah, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(lebah, "--left") <= -500) {
      lebah.remove()
    }
  })

  if (nextLebahTime <= 0) {
    createLebah()
    nextLebahTime =
      randomNumberBetween(LEBAH_INTERVAL_MIN, LEBAH_INTERVAL_MAX) / speedScale
  }
  nextLebahTime -= delta
}


export function getLebahRects() {
  return [...document.querySelectorAll("[data-lebah]")].map(lebah => {
    return lebah.getBoundingClientRect()
  })
}


function createLebah() {
  const lebah = document.createElement("img")
  lebah.dataset.lebah = true
  lebah.src = "imgs/lebah.gif"
  lebah.classList.add("lebah")
  setCustomProperty(lebah, "--left", 100)
  worldElem.append(lebah)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
