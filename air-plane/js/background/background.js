import ResourceLoader from '../base/ResourceLoader'
import Sprite from '../base/Sprite'
import { ImageKeys } from '../utils/constants'

export default class Background extends Sprite {
  constructor() {
    let img = ResourceLoader.getInstance().getImage(ImageKeys.Bg)
    super(img, 0, 0, GameGlobal.windowWidth, GameGlobal.windowHeight, true)
  }
}
