import XDevice from '@xg4/device'

export default class XService {
  private static instance: XService

  static create() {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  private device: XDevice

  constructor() {
    this.device = new XDevice()
  }

  fetch(qq: string | number) {
    const status = this.getStatus()
    if (!status) {
      return null
    }

    const URL_MAP = {
      1: `http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`,
      2: `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=yidian51.com`,
      3: `mqq://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web`,
      4: `tencent://message/?uin=${qq}&Site=https://wap.yidian51.com&Menu=yes`
    }
    return URL_MAP[status]
  }

  getStatus() {
    if (this.device.isMobile() || this.device.isIpad()) {
      // mobile

      // iphone 7（15C202）  iphone6s(15E216) iphoneSE(OPiOS) iphone5(14G60)不兼容
      if (
        this.device.find('15C202') ||
        this.device.find('15E216') ||
        this.device.find('14G60') ||
        (this.device.find('OPiOS') && this.device.isIphone())
      ) {
        return 0
      }

      // iphone 6s 14A456 | iphone7 15C114 不兼容2345浏览器
      if (
        this.device.find('Mb2345Browser') &&
        this.device.isIphone() &&
        (this.device.find('14A456') || this.device.find('15C114'))
      ) {
        return 0
      }

      // iphone 6s 14A456 | iphone7 不兼容夸克浏览器
      if (
        this.device.find('Quark') &&
        this.device.isIphone() &&
        (this.device.find('14A456') || this.device.find('14F89'))
      ) {
        return 0
      }

      // iphone 6s 不兼容2345浏览器
      if (
        this.device.find('UCBrowser') &&
        this.device.isIphone() &&
        this.device.find('15E216')
      ) {
        return 0
      }

      // iphone 5 不兼容 360安全浏览器
      if (
        this.device.find('searchBrowser') &&
        this.device.isIphone() &&
        this.device.find('12B466')
      ) {
        return 0
      }

      // 火狐浏览器 iphone7 15C202不兼容  iphone 6s 不兼容 火狐浏览器
      if (
        this.device.find('FxiOS') &&
        this.device.isIphone() &&
        (this.device.find('15C202') ||
          this.device.find('15D100') ||
          this.device.find('16A5288q'))
      ) {
        return 0
      }

      // 百度浏览器
      if (this.device.find('baiduboxapp') || this.device.find('baidubrowser')) {
        return 0
      }

      // iphone手机 遨游浏览器 不兼容
      if (this.device.find('MXiOS') && this.device.isIphone()) {
        if (this.device.find('15C202') || this.device.find('14G60')) {
          return 1
        }
        return 0
      }

      // 微信,在安卓端会识别到Safari,故单独执行,70606:
      if (this.device.find('MicroMessenger')) {
        return 1
      }

      // SE,QQ,71016:
      if (this.device.find('iPhone 84') && this.device.find('MQQBrowser')) {
        return 2
      }

      // 70615:
      if (this.device.find('UCBrowser') || this.device.find('MQQBrowser')) {
        return 2
      }

      // 70615:
      if (this.device.find('SogouMobileBrowser')) {
        return 1
      }

      if (this.device.find('QihooBrowser')) {
        return 2
      }

      if (this.device.find('iPhone') && this.device.find('Safari')) {
        return 2
      }

      // 0228：华为手机其他浏览器;
      if (this.device.find('HUAWEI') && this.device.find('Safari')) {
        return 3
      }

      return 1
    }
    // other
    return 4
  }
}
