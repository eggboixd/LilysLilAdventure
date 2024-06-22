import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const PUDDLE_INTERVAL_MIN = 10000
  const PUDDLE_INTERVAL_MAX = 17500
  const worldElem = document.querySelector("[data-world]")
  
  let nextPuddleTime
  export function setupPuddle() {
    nextPuddleTime = PUDDLE_INTERVAL_MIN
    document.querySelectorAll("[data-puddle]").forEach(puddle => {
      puddle.remove()
    })
  }
  
  export function updatePuddle(delta, speedScale) {
    document.querySelectorAll("[data-puddle]").forEach(puddle => {
      incrementCustomProperty(puddle, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(puddle, "--left") <= -100) {
        puddle.remove()
      }
    })
  
    if (nextPuddleTime <= 0) {
      createPuddle()
      nextPuddleTime =
        randomNumberBetween(PUDDLE_INTERVAL_MIN, PUDDLE_INTERVAL_MAX) / speedScale
    }
    nextPuddleTime -= delta
  }
  
  export function getPuddleRects() {
    return [...document.querySelectorAll("[data-puddle]")].map(puddle => {
      return puddle.getBoundingClientRect()
    })
  }
  
  function createPuddle() {
    const puddle = document.createElement("img")
    puddle.dataset.puddle = true
    puddle.src = "imgs/puddle.png"
    puddle.classList.add("puddle")
    setCustomProperty(puddle, "--left", 100)
    worldElem.append(puddle)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  