import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const GRASS2_INTERVAL_MIN = 600
  const GRASS2_INTERVAL_MAX = 1000
  const worldElem = document.querySelector("[data-world]")
  
  let nextGrass2Time
  export function setupGrass2() {
    nextGrass2Time = GRASS2_INTERVAL_MIN
    document.querySelectorAll("[data-grass2]").forEach(grass2 => {
      grass2.remove()
    })
  }
  
  export function updateGrass2(delta, speedScale) {
    document.querySelectorAll("[data-grass2]").forEach(grass2 => {
      incrementCustomProperty(grass2, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(grass2, "--left") <= -100) {
        grass2.remove()
      }
    })
  
    if (nextGrass2Time <= 0) {
      createGrass2()
      nextGrass2Time =
        randomNumberBetween(GRASS2_INTERVAL_MIN, GRASS2_INTERVAL_MAX) / speedScale
    }
    nextGrass2Time -= delta
  }

  
  export function getGrass2Rects() {
    return [...document.querySelectorAll("[data-grass2]")].map(grass2 => {
      return grass2.getBoundingClientRect()
    })
  }
  

  function createGrass2() {
    const grass2 = document.createElement("img")
    grass2.dataset.grass2 = true
    grass2.src = "imgs/grass-2.png"
    grass2.classList.add("grass2")
    setCustomProperty(grass2, "--left", 100)
    worldElem.append(grass2)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  