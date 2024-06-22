import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const CACTUSHIT_INTERVAL_MIN = 2678
  const CACTUSHIT_INTERVAL_MAX = 3678
  const worldElem = document.querySelector("[data-world]")
  
  let nextCactusHitTime
  export function setupCactusHit() {
    nextCactusHitTime = CACTUSHit_INTERVAL_MIN
    document.querySelectorAll("[data-cactusHit]").forEach(cactusHit => {
      cactusHit.remove()
    })
  }
  
  export function updateCactusHit(delta, speedScale) {
    document.querySelectorAll("[data-cactusHit]").forEach(cactusHit => {
      incrementCustomProperty(cactusHit, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cactusHit, "--left") <= -100) {
        cactusHit.remove()
      }
    })
  
    if (nextCactusHitTime <= 0) {
      createCactusHit()
      nextCactusHitTime =
        randomNumberBetween(CACTUSHIT_INTERVAL_MIN, CACTUSHIT_INTERVAL_MAX) / speedScale
    }
    nextCactusHitTime -= delta
  }
  
  export function getCactusHitRects() {
    return [...document.querySelectorAll("[data-cactusHit]")].map(cactusHit => {
      return cactusHit.getBoundingClientRect()
    })
  }
  
  function createCactusHit() {
    const cactusHit = document.createElement("img")
    cactusHit.dataset.cactusHit = true
    cactusHit.src = "imgs/cactus-hitbox.png"
    cactusHit.classList.add("cactusHit")
    setCustomProperty(cactusHit, "--left", 100)
    worldElem.append(cactusHit)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  