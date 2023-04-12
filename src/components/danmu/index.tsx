import { useDanmu } from '@/hooks/danmu';
import { IDanmuMsg } from '@/types/danmu';
import { getNoRefererImageUrl } from '@/utils';
import { TORY_ID } from '@/utils/const';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bubble } from '../chat-bubble';

interface IMsg {
  name: React.ReactNode;
  content: React.ReactNode;
  key: string | number;
  time: Dayjs;
  fansInfo?: string;
}

const maxMsg = 4;

export default function DanMuBubble(props: { className?: string }) {
  const { className } = props;
  const [msgList, setMsgList] = useState<IMsg[]>([]);

  const handleDanmuMessage = useMemoizedFn((info: IDanmuMsg) => {
    if (info) {
      const data = info;
      if (!data || !data.length) {
        return;
      }
      const sticker = data[0][13];
      const msg = data[1];
      const user = data[2];
      const userID = user[0];
      const userName = user[1];
      const fansInfo = data[3];
      const key = uuidv4();
      const msgData: IMsg = {
        name: userName,
        content: msg,
        key,
        time: dayjs(),
      };
      if (typeof sticker !== 'string') {
        msgData.content = (
          <img
            src={getNoRefererImageUrl(sticker.url)}
            className={sticker.bulge_display ? 'h-16' : 'h-10'}
          />
        );
      }
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
  });

  useDanmu({
    handleDanmuMessage,
  });

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
