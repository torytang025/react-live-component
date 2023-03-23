import { getNoRefererImageUrl } from '@/utils';
import { KeepLiveWS } from 'bilibili-live-ws/browser';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { fireConfetti } from '../canfetti';
import { Bubble } from '../chat-bubble';
import { IGiftData } from './type';

interface IMsg {
  name: React.ReactNode;
  content: string;
  key: string | number;
  time: Dayjs;
  fansInfo?: string;
}

const maxMsg = 4;
const rid = 26433151;
const TORY_ID = 21609301;

export default function DanMuBubble(props: { className?: string }) {
  const { className } = props;
  const [msgList, setMsgList] = useState<IMsg[]>([]);
  const giftToastList = useRef<string[]>([]);

  const handleMessage = (info: any[]) => {
    if (info) {
      const data = info;
      if (!data || !data.length) {
        return;
      }
      const msg = data[1];
      const user = data[2];
      const userID = user[0];
      const userName = user[1];
      const fansInfo = data[3] as [number, string, string]; // 粉丝牌子等级 粉丝称呼
      const key = uuidv4();
      const msgData: IMsg = {
        name: userName,
        content: msg,
        key,
        time: dayjs(),
      };
      if (userID === TORY_ID) {
        msgData.name = (
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-1 rounded-2xl bg-front/20 p-2">
              <span className="text-3xl">👾</span>
              <span className="text-2xl font-extrabold text-primary-1">
                999
              </span>
            </div>
            <span>{userName}</span>
          </div>
        );
      } else if (fansInfo.length && fansInfo[fansInfo.length - 1] === TORY_ID) {
        msgData.name = (
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-1 rounded-2xl bg-front/20 p-2">
              <span className="text-3xl">🧙</span>
              <span className="text-2xl font-extrabold text-primary-1">
                {fansInfo[0]}
              </span>
            </div>
            <span>{userName}</span>
          </div>
        );
      }
      setMsgList((prev) => {
        if (prev.length < maxMsg) {
          return [...prev, msgData];
        } else {
          return [...prev.slice(1), msgData];
        }
      });
    }
  };

  const handleGift = (info: IGiftData) => {
    fireConfetti();
    const { uname, face, action, giftName, num } = info;
    const toastID = toast(
      <div className="flex items-center gap-x-2  whitespace-nowrap">
        <div className="flex items-center gap-x-4">
          <Avatar>
            <AvatarImage src={getNoRefererImageUrl(face)} />
            <AvatarFallback>{uname[0]}</AvatarFallback>
          </Avatar>
          <p>{uname}</p>
        </div>
        <div className="flex items-center gap-x-1 font-bold">
          <span>{action}</span>
          <span>{num}</span>
          <span>x</span>
        </div>
        <div className="flex flex-1 items-center gap-x-2 align-middle font-[reggea] text-5xl underline decoration-primary-1 decoration-8">
          {giftName}
        </div>
      </div>,
      {
        duration: 10000,
      },
    );
    if (giftToastList.current.length >= maxMsg) {
      toast.dismiss(giftToastList.current[0]);
      giftToastList.current = [...giftToastList.current.slice(1), toastID];
    } else {
      giftToastList.current = [...giftToastList.current, toastID];
    }
  };

  useEffect(() => {
    const live = new KeepLiveWS(rid);
    live.on('open', () =>
      console.log(
        '%c [ wss init success ]',
        'font-size:13px; background:#FFFF00; color:#bf2c9f;',
      ),
    );

    live.on('msg', (data) => {
      console.log(
        '%c [ bilibili live msg data ]',
        'font-size:13px; background:#FFFF00; color:#bf2c9f;',
        data,
      );
      const type = data.cmd;
      switch (type) {
        case 'DANMU_MSG':
          handleMessage(data.info);
          break;
        case 'SEND_GIFT':
          handleGift(data.data);
          break;
      }
    });
  }, []);

  // mock send gift
  // useEffect(() => {
  //   if (!import.meta.env.DEV) return;
  //   setInterval(() => {
  //     handleGift(MOCK);
  //   }, 1000);
  // }, []);

  // auto hide danmu
  useEffect(() => {
    if (import.meta.env.DEV) {
      return;
    }
    setInterval(() => {
      setMsgList((prev) => {
        if (prev.length) {
          return prev.filter((item) => {
            return !item.time.isBefore(dayjs().subtract(20, 'seconds'));
          });
        } else {
          return prev;
        }
      });
    }, 1000);
  }, []);

  return (
    <div className={classNames([className])}>
      <div className="flex h-[500px] flex-col items-end justify-end gap-y-4">
        <AnimatePresence mode="popLayout">
          {msgList.map((msg) => (
            <Bubble
              key={msg.key}
              id={msg.key}
              content={msg.content}
              name={msg.name}
              onClick={() => {
                setMsgList((prev) => {
                  const ind = prev.findIndex((item) => item.key === msg.key);
                  return prev.slice(0, ind).concat(prev.slice(ind + 1));
                });
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
