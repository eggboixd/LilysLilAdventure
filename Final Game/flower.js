import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const FLOWER_INTERVAL_MIN = 2000
  const FLOWER_INTERVAL_MAX = 3000
  const worldElem = document.querySelector("[data-world]")
  
  let nextFlowerTime
  export function setupFlower() {
    nextFlowerTime = FLOWER_INTERVAL_MIN
    document.querySelectorAll("[data-flower]").forEach(flower => {
      flower.remove()
    })
  }
  
  export function updateFlower(delta, speedScale) {
    document.querySelectorAll("[data-flower]").forEach(flower => {
      incrementCustomProperty(flower, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(flower, "--left") <= -100) {
        flower.remove()
      }
    })
  
    if (nextFlowerTime <= 0) {
      createFlower()
      nextFlowerTime =
        randomNumberBetween(FLOWER_INTERVAL_MIN, FLOWER_INTERVAL_MAX) / speedScale
    }
    nextFlowerTime -= delta
  }

  
  export function getFlowerRects() {
    return [...document.querySelectorAll("[data-flower]")].map(flower => {
      return flower.getBoundingClientRect()
    })
  }
  

  function createFlower() {
    const flower = document.createElement("img")
    flower.dataset.flower = true
    flower.src = "imgs/flower.png"
    flower.classList.add("flower")
    setCustomProperty(flower, "--left", 100)
    worldElem.append(flower)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  