import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const BENCH_INTERVAL_MIN = 2750
  const BENCH_INTERVAL_MAX = 3000
  const worldElem = document.querySelector("[data-world]")
  
  let nextBenchTime
  export function setupBench() {
    nextBenchTime = BENCH_INTERVAL_MIN
    document.querySelectorAll("[data-bench]").forEach(bench => {
      bench.remove()
    })
  }
  
  export function updateBench(delta, speedScale) {
    document.querySelectorAll("[data-bench]").forEach(bench => {
      incrementCustomProperty(bench, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(bench, "--left") <= -100) {
        bench.remove()
      }
    })
  
    if (nextBenchTime <= 0) {
      createBench()
      nextBenchTime =
        randomNumberBetween(BENCH_INTERVAL_MIN, BENCH_INTERVAL_MAX) / speedScale
    }
    nextBenchTime -= delta
  }

  
  export function getBenchRects() {
    return [...document.querySelectorAll("[data-bench]")].map(bench => {
      return bench.getBoundingClientRect()
    })
  }
  

  function createBench() {
    const bench = document.createElement("img")
    bench.dataset.bench = true
    bench.src = "imgs/bench.png"
    bench.classList.add("bench")
    setCustomProperty(bench, "--left", 100)
    worldElem.append(bench)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  