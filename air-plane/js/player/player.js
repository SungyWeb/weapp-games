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
  }
}
