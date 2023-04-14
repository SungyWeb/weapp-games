import { ImageKeys } from '../utils/constants'

const IMAGE_PATH = './images/'
const IMAGES = [
  [ImageKeys.Bg, `${IMAGE_PATH}bg.jpg`],
  [ImageKeys.Enemy, `${IMAGE_PATH}enemy.png`],
]
let instance = null

/**
 * 单例模式 加载资源
 * 通过 ResourceLoader.getInstance() 获取实例
 */
export default class ResourceLoader {
  constructor() {
    this.imgMap = new Map(IMAGES)
    for (const [key, value] of this.imgMap) {
      let img = new Image()
      img.src = value

      this.imgMap.set(key, img)
    }
  }

  /**
   * 加载所有图片资源
   * @param {function} callback 回调函数
   */
  onLoad(callback) {
    let lastCount = 0
    const imgList = this.imgMap.values()
    for (const img of imgList) {
      img.onload = () => {
        lastCount++
        if (lastCount === this.imgMap.size) {
          callback()
        }
      }
    }
  }

  /**
   * 获取图片实例
   * @param {Symbol} key ImageKeys
   */
  getImage(key) {
    return this.imgMap.get(key)
  }
  /**
   * 获取实例
   * @returns {ResourceLoader}
   */
  static getInstance() {
    if (!instance) {
      instance = new ResourceLoader()
    }
    return instance
  }
}
