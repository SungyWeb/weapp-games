import ResourceLoader from '../base/ResourceLoader'
import Sprite from '../base/Sprite'
import { ImageKeys } from '../utils/constants'
const EnemyWidth = 60
const EnemyHeight = 60

/** 敌人 */
export default class Enemy extends Sprite {
  constructor() {
    const img = ResourceLoader.getInstance().getImage(ImageKeys.Enemy)
    const x = Math.floor(Math.random() * (GameGlobal.windowWidth - EnemyWidth))
    const y = -EnemyHeight - 20
    super(img, x, y, EnemyWidth, EnemyHeight, true)
  }

  reset() {
    const x = Math.floor(Math.random() * (GameGlobal.windowWidth - EnemyWidth))
    const y = -EnemyHeight - 20
    this.moveTo(x, y)
  }
}
