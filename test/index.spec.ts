import Service from '../src'
import UA from './user-agent'

test('created an instance', () => {
  expect(new Service()).toBeInstanceOf(Service)
})

test('mac chrome', () => {
  const service = new Service(UA.mac)
  expect(service.get('123456')).toBe(
    'tencent://message/?uin=123456&Site=qq&Menu=yes'
  )
})

test('iphone safari 15E148', () => {
  const service = new Service(UA.iphone8)
  expect(service.get('123456')).toBe(
    'mqqwpa://im/chat?chat_type=wpa&uin=123456&version=1&src_type=web&web_src=qq'
  )
})
