import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.015
  const CLOUD2_INTERVAL_MIN = 2000
  const CLOUD2_INTERVAL_MAX = 3000
  const worldElem = document.querySelector("[data-world]")
  
  let nextCloud2Time
  export function setupCloud2() {
    nextCloud2Time = CLOUD2_INTERVAL_MIN
    document.querySelectorAll("[data-cloud2]").forEach(cloud2 => {
      cloud2.remove()
    })
  }
  
  export function updateCloud2(delta, speedScale) {
    document.querySelectorAll("[data-cloud2]").forEach(cloud2 => {
      incrementCustomProperty(cloud2, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cloud2, "--left") <= -500) {
        cloud2.remove()
      }
    })
  
    if (nextCloud2Time <= 0) {
      createCloud2()
      nextCloud2Time =
        randomNumberBetween(CLOUD2_INTERVAL_MIN, CLOUD2_INTERVAL_MAX) / speedScale
    }
    nextCloud2Time -= delta
  }

  
  export function getCloud2Rects() {
    return [...document.querySelectorAll("[data-cloud2]")].map(cloud2 => {
      return cloud2.getBoundingClientRect()
    })
  }
  

  function createCloud2() {
    const cloud2 = document.createElement("img")
    cloud2.dataset.cloud2 = true
    cloud2.src = "imgs/cloud-asset2.png"
    cloud2.classList.add("cloud2")
    setCustomProperty(cloud2, "--left", 100)
    worldElem.append(cloud2)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  