import {
    setCustomProperty,
    incrementCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const SPEED = 0.05
  const TREE_INTERVAL_MIN = 2750
  const TREE_INTERVAL_MAX = 3000
  const worldElem = document.querySelector("[data-world]")
  
  let nextTreeTime
  export function setupTree() {
    nextTreeTime = TREE_INTERVAL_MIN
    document.querySelectorAll("[data-tree]").forEach(tree => {
      tree.remove()
    })
  }
  
  export function updateTree(delta, speedScale) {
    document.querySelectorAll("[data-tree]").forEach(tree => {
      incrementCustomProperty(tree, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(tree, "--left") <= -100) {
        tree.remove()
      }
    })
  
    if (nextTreeTime <= 0) {
      createTree()
      nextTreeTime =
        randomNumberBetween(TREE_INTERVAL_MIN, TREE_INTERVAL_MAX) / speedScale
    }
    nextTreeTime -= delta
  }

  
  export function getTreeRects() {
    return [...document.querySelectorAll("[data-tree]")].map(tree => {
      return tree.getBoundingClientRect()
    })
  }
  

  function createTree() {
    const tree = document.createElement("img")
    tree.dataset.tree = true
    tree.src = "imgs/tree-asset.png"
    tree.classList.add("tree")
    setCustomProperty(tree, "--left", 100)
    worldElem.append(tree)
  }
  
  function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  