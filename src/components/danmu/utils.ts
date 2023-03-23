import { IGiftData } from './type';

export function getWsEndpoint() {
  if (window.location.protocol === 'http:') {
    return `ws://${window.location.hostname}:8000`;
  } else if (window.location.protocol === 'https:') {
    return `wss://${window.location.hostname}:8000`;
  } else {
    console.warn('获取ws地址失败');
  }
}

export const MOCK: IGiftData = {
  giftName: '辣条',
  num: 1,
  uname: 'simon3000',
  face: 'http://i1.hdslb.com/bfs/face/c26b9f670b10599ad105e2a7fea4b5f21c0f0bcf.jpg',
  guard_level: 0,
  rcost: 2318827,
  uid: 3499295,
  top_list: [],
  timestamp: 1555690631,
  giftId: 1,
  giftType: 0,
  action: '喂食',
  super: 0,
  super_gift_num: 0,
  price: 100,
  rnd: '1555690616',
  newMedal: 0,
  newTitle: 0,
  medal: [],
  title: '',
  beatId: '0',
  biz_source: 'live',
  metadata: '',
  remain: 6,
  gold: 0,
  silver: 0,
  eventScore: 0,
  eventNum: 0,
  smalltv_msg: [],
  specialGift: null,
  notice_msg: [],
  capsule: null,
  addFollow: 0,
  effect_block: 1,
  coin_type: 'silver',
  total_coin: 100,
  effect: 0,
  tag_image: '',
  user_count: 0,
};
