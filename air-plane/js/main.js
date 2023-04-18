import Background from './background/background'
import ResourceLoader from './base/ResourceLoader'
import Enemy from './enemy/enemy'
import './libs/weapp-adapter'
import Bullet from './player/bullet'
import Player from './player/player'

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

/** @type {Background[]} */
let bgList = []

/** @type {Enemy[]} */
let enemyList = []

/** @type {Player} */
let player = null

/** 子弹对象 */
let bullets = []

/** 子弹间隔时间 */
const disTime = 500
/** requestAnimationFrame 上次的时间 本次减去上次 大于disTime 产生子弹 */
let prevTime = 0

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
    this.initBullet()
    this.addListener()
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
  /** 初始化子弹 */
  initBullet() {
    bullets.push(new Bullet(player))
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
  updateBullets(delta) {
    if (delta - prevTime > disTime) {
      bullets.push(new Bullet(player))
      prevTime = delta
    }

    bullets.forEach((b) => {
      b.y -= 4
      if (b.y < -20) {
        b.destory()
      } else {
        b.draw(ctx)
      }
    })
    bullets = bullets.filter((b) => !!b.img)
    console.log(bullets)
  }
  addListener() {
    canvas.addEventListener('touchstart', function (e) {
      e.preventDefault()
      player.touchStart(e)
    })
    canvas.addEventListener('touchmove', function (e) {
      e.preventDefault()
      player.touchMoving(e)
    })
    canvas.addEventListener('touchend', function (e) {
      e.preventDefault()
      player.touchEnd(e)
    })
  }
  animate(delta) {
    ctx.clearRect(0, 0, GameGlobal.windowWidth, GameGlobal.windowHeight)
    this.updateBg()
    this.updateEnemy()
    this.updatePlayer()
    this.updateBullets(delta || 0)
    requestAnimationFrame(this.animate.bind(this))
  }
}
