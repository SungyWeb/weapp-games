import ResourceLoader from '../base/ResourceLoader'
import Sprite from '../base/Sprite'
import { ImageKeys } from '../utils/constants'

const w = 62 / 2
const h = 108 / 2
export default class Bullet extends Sprite {
  constructor(player) {
    const img = ResourceLoader.getInstance().getImage(ImageKeys.Bullet)
    const x = player.x + player.width / 2 - w / 2
    const y = player.y - h - 5
    super(img, x, y, w, h)
  }
}
