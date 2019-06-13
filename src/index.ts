import Device from '@xg4/device'

interface Options {
  type: string
  sourceType: string
  source: string
  menu: 'yes' | 'no'
}

const defaultOptions = {
  type: 'wpa',
  sourceType: 'web',
  source: 'qq',
  menu: 'yes' as const
}

export default class Service {
  private device: Device

  private get status() {
    if (this.device.isMobile() || this.device.isIpad()) {
      // mobile

      // iphone 7（15C202）  iphone6s(15E216) iphoneSE(OPiOS) iphone5(14G60)不兼容
      if (
        this.device.find('15c202') ||
        this.device.find('15e216') ||
        this.device.find('14g60') ||
        (this.device.find('opios') && this.device.isIphone())
      ) {
        return 0
      }

      // iphone 6s 14A456 | iphone7 15C114 不兼容2345浏览器
      if (
        this.device.find('mb2345browser') &&
        this.device.isIphone() &&
        (this.device.find('14a456') || this.device.find('15c114'))
      ) {
        return 0
      }

      // iphone 6s 14A456 | iphone7 不兼容夸克浏览器
      if (
        this.device.find('quark') &&
        this.device.isIphone() &&
        (this.device.find('14a456') || this.device.find('14f89'))
      ) {
        return 0
      }

      // iphone 6s 不兼容2345浏览器
      if (
        this.device.find('ucbrowser') &&
        this.device.isIphone() &&
        this.device.find('15e216')
      ) {
        return 0
      }

      // iphone 5 不兼容 360安全浏览器
      if (
        this.device.find('searchbrowser') &&
        this.device.isIphone() &&
        this.device.find('12b466')
      ) {
        return 0
      }

      // 火狐浏览器 iphone7 15C202不兼容  iphone 6s 不兼容 火狐浏览器
      if (
        this.device.find('fxios') &&
        this.device.isIphone() &&
        (this.device.find('15c202') ||
          this.device.find('15d100') ||
          this.device.find('16a5288q'))
      ) {
        return 0
      }

      // 百度浏览器
      if (this.device.find('baiduboxapp') || this.device.find('baidubrowser')) {
        return 0
      }

      // iphone手机 遨游浏览器 不兼容
      if (this.device.find('mxios') && this.device.isIphone()) {
        if (this.device.find('15c202') || this.device.find('14g60')) {
          return 1
        }
        return 0
      }

      // 微信,在安卓端会识别到Safari,故单独执行,70606:
      if (this.device.find('micromessenger')) {
        return 1
      }

      // SE,QQ,71016:
      if (this.device.find('iphone 84') && this.device.find('mqqbrowser')) {
        return 2
      }

      // 70615:
      if (this.device.find('ucbrowser') || this.device.find('mqqbrowser')) {
        return 2
      }

      // 70615:
      if (this.device.find('sogoumobilebrowser')) {
        return 1
      }

      if (this.device.find('qihoobrowser')) {
        return 2
      }

      if (this.device.find('iphone') && this.device.find('safari')) {
        return 2
      }

      // 0228：华为手机其他浏览器;
      if (this.device.find('huawei') && this.device.find('safari')) {
        return 3
      }

      return 1
    }
    // other
    return 4
  }

  public constructor(userAgent?: string) {
    this.device = new Device(userAgent)
  }

  public get(qq: string | number, options?: Partial<Options>) {
    options = { ...defaultOptions, ...options }
    return [
      null,
      `http://wpa.qq.com/msgrd?v=3&uin=${qq}&site=${options.source}&menu=${options.menu}`,
      `mqqwpa://im/chat?chat_type=${options.type}&uin=${qq}&version=1&src_type=${options.sourceType}&web_src=${options.source}`,
      `mqq://im/chat?chat_type=${options.type}&uin=${qq}&version=1&src_type=${options.sourceType}`,
      `tencent://message/?uin=${qq}&Site=${options.source}&Menu=${options.menu}`
    ][this.status]
  }
}
