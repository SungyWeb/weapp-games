import Background from './background/background'
import ResourceLoader from './base/ResourceLoader'
import Enemy from './enemy/enemy'
import Player from './player/player'

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

/** @type {Background[]} */
let bgList = []

/** @type {Enemy[]} */
let enemyList = []

/** @type {Player} */
let player = null

export default class Main {
  constructor() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()

    GameGlobal.windowWidth = windowWidth
    GameGlobal.windowHeight = windowHeight
    GameGlobal.ctx = ctx
    console.log(`分辨率:${windowWidth}*${windowHeight}`)

    ResourceLoader.getInstance().onLoad(this.init.bind(this))
  }
  /** 初始化 */
  init() {
    this.initBg()
    this.initEnemy()
    this.initPlayer()
    this.animate()
  }
  /** 初始化玩家 */
  initPlayer() {
    player = new Player()
  }
  /** 初始化敌人 */
  initEnemy() {
    const enemy = new Enemy()
    enemyList.push(enemy)
    if (enemyList.length < 10) {
      setTimeout(this.initEnemy.bind(this), 200)
    }
  }
  /** 初始化背景 */
  initBg() {
    const bg1 = new Background()
    const bg2 = new Background()
    bg2.y = -GameGlobal.windowHeight
    bgList = [bg1, bg2]
  }

  /** 背景图滚动 */
  updateBg() {
    bgList.forEach((bg) => {
      bg.addY(2)
      bg.draw(ctx)
      if (bg.y >= GameGlobal.windowHeight) {
        bg.y = -GameGlobal.windowHeight + 2
      }
    })
  }
  /** 更新敌人 */
  updateEnemy() {
    enemyList.forEach((enemy) => {
      enemy.addY(5)
      enemy.draw(ctx)
      if (enemy.y >= GameGlobal.windowHeight) {
        enemy.reset()
      }
    })
  }
  /** 更新玩家 */
  updatePlayer() {
    player.draw(ctx)
  }

  animate() {
    ctx.clearRect(0, 0, GameGlobal.windowWidth, GameGlobal.windowHeight)
    this.updateBg()
    this.updateEnemy()
    this.updatePlayer()
    requestAnimationFrame(this.animate.bind(this))
  }
}
