/**
 * 精灵图片
 */
export default class Sprite {
  constructor(img = null, x = 0, y = 0, width = 0, height = 0, visible = true) {
    /** @type {HTMLImageElement} */
    this.img = img
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.visible = visible
  }
  /**
   * 画图
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.img) {
      ctx.drawImage(
        this.img,
        0,
        0,
        this.img.width,
        this.img.height,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  }
  addX(n = 0) {
    this.x += n
  }
  addY(n = 0) {
    this.y += n
  }
  moveTo(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  destory() {
    this.img = null
  }

  /**
   * 是否被触摸
   * @param {TouchEvent} e
   */
  checkTouching(e) {
    const { clientX, clientY } = e.touches[0]
    let inRect = false
    if (
      clientX > this.x &&
      clientX < this.x + this.width &&
      clientY > this.y &&
      clientY < this.y + this.height
    ) {
      inRect = true
    }
    return inRect
  }
}
