import { IGiftData } from '@/types/danmu';

export const MOCK_GIFT_DATA: IGiftData = {
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

export const isGoodNightDanmuMsg = (text: string): boolean => {
  const reg = /^(大家|一起|各位|那)?((晚)?安|good( )?night|wan( )?an)/;

  if (reg.test(text)) {
    return true;
  }
  return false;
};
