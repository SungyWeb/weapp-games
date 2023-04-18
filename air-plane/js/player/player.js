import ResourceLoader from '../base/ResourceLoader'
import Sprite from '../base/Sprite'
import { ImageKeys } from '../utils/constants'
const W = 186 / 2
const H = 130 / 2
export default class Player extends Sprite {
  constructor() {
    const img = ResourceLoader.getInstance().getImage(ImageKeys.Hero)
    const { windowWidth, windowHeight } = GameGlobal
    const x = (windowWidth - W) / 2
    const y = windowHeight - 200
    super(img, x, y, W, H, true)
    this.touched = false
  }
  touchStart(e) {
    if (this.checkTouching(e)) {
      this.touched = true
    }
  }
  /**
   * 移动手指
   * @param {TouchEvent} e
   */
  touchMoving(e) {
    if (this.touched) {
      this._setPos(e)
    }
  }
  touchEnd() {
    this.touched = false
  }

  /**
   * 设置飞机到手指位置
   * @description 边界判断
   * @param {TouchEvent} e
   */
  _setPos(e) {
    const { clientX, clientY } = e.touches[0]
    const { windowWidth, windowHeight } = GameGlobal
    let x = clientX - this.width / 2
    let y = clientY - this.height / 2
    if (x < 0) {
      x = 0
    }
    if (x > windowWidth - this.width) {
      x = windowWidth - this.width
    }
    if (y > windowHeight - this.height) {
      y = windowHeight - this.height
    }
    if (y < 0) {
      y = 0
    }
    this.x = x
    this.y = y
  }
}
