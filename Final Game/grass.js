import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const GRASS_INTERVAL_MIN = 600
  const GRASS_INTERVAL_MAX = 1000
  const worldElem = document.querySelector("[data-world]")
  
  let nextGrassTime
  export function setupGrass() {
    nextGrassTime = GRASS_INTERVAL_MIN
    document.querySelectorAll("[data-grass]").forEach(grass => {
      grass.remove()
    })
  }
  
  export function updateGrass(delta, speedScale) {
    document.querySelectorAll("[data-grass]").forEach(grass => {
      incrementCustomProperty(grass, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(grass, "--left") <= -100) {
        grass.remove()
      }
    })
  
    if (nextGrassTime <= 0) {
      createGrass()
      nextGrassTime =
        randomNumberBetween(GRASS_INTERVAL_MIN, GRASS_INTERVAL_MAX) / speedScale
    }
    nextGrassTime -= delta
  }

  
  export function getGrassRects() {
    return [...document.querySelectorAll("[data-grass]")].map(grass => {
      return grass.getBoundingClientRect()
    })
  }
  

  function createGrass() {
    const grass = document.createElement("img")
    grass.dataset.grass = true
    grass.src = "imgs/grass.png"
    grass.classList.add("grass")
    setCustomProperty(grass, "--left", 100)
    worldElem.append(grass)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  