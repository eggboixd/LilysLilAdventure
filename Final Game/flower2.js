import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const FLOWER2_INTERVAL_MIN = 5000
  const FLOWER2_INTERVAL_MAX = 6000
  const worldElem = document.querySelector("[data-world]")
  
  let nextFlower2Time
  export function setupFlower2() {
    nextFlower2Time = FLOWER2_INTERVAL_MIN
    document.querySelectorAll("[data-flower2]").forEach(flower2 => {
      flower2.remove()
    })
  }
  
  export function updateFlower2(delta, speedScale) {
    document.querySelectorAll("[data-flower2]").forEach(flower2 => {
      incrementCustomProperty(flower2, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(flower2, "--left") <= -100) {
        flower2.remove()
      }
    })
  
    if (nextFlower2Time <= 0) {
      createFlower2()
      nextFlower2Time =
        randomNumberBetween(FLOWER2_INTERVAL_MIN, FLOWER2_INTERVAL_MAX) / speedScale
    }
    nextFlower2Time -= delta
  }

  
  export function getFlower2Rects() {
    return [...document.querySelectorAll("[data-flower2]")].map(flower2 => {
      return flower2.getBoundingClientRect()
    })
  }
  

  function createFlower2() {
    const flower2 = document.createElement("img")
    flower2.dataset.flower2 = true
    flower2.src = "imgs/flower2.png"
    flower2.classList.add("flower2")
    setCustomProperty(flower2, "--left", 100)
    worldElem.append(flower2)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  