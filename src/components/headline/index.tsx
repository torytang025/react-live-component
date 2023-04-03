import { useDanmu } from '@/hooks/danmu';
import { IDanmuMsg } from '@/types/danmu';
import { isFestival, isGoodNightDanmuMsg } from '@/utils/danmu';
import { useMemoizedFn } from 'ahooks';
import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { filter } from 'lodash-es';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { star } from '../canfetti';
import { MODE_MAP, TextMode } from './const';

const sentence: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

interface ITextUserData {
  name: string;
  uid: number;
  time: Dayjs;
  key: string;
  mode: TextMode;
}

interface ITextData {
  title: string;
  subtitle?: string;
}

const MAX_USER = 20;

export default function Headline() {
  const [userList, setUserList] = useState<ITextUserData[]>([]);
  const [text, setText] = useState<ITextData>();
  const [textMode, setTextMode] = useState<TextMode>(TextMode.Null);

  const handleDanmuMessage = useMemoizedFn((data: IDanmuMsg) => {
    const msg = data[1];
    const user = data[2];
    const uid = data[2][0];
    const username = user[1];
    if (msg) {
      let mode: TextMode = TextMode.Null;
      if (isGoodNightDanmuMsg(msg)) {
        mode = TextMode.GoodNight;
      } else if (isFestival(msg)) {
        star();
        mode = TextMode.Festival;
      } else {
        return;
      }
      setText(MODE_MAP[mode].content);
      setTextMode(mode);
      const temp = [...userList];
      if (temp.length >= MAX_USER) {
        temp.slice(1);
      }
      const index = temp.findIndex((i) => i.uid === uid);
      if (index !== -1) {
        setUserList(
          filter(temp, (i) => i.uid !== uid).concat({
            key: v4(),
            name: username,
            uid,
            time: dayjs(),
            mode,
          }),
        );
      } else {
        setUserList([
          ...temp,
          {
            key: v4(),
            name: username,
            uid,
            time: dayjs(),
            mode,
          },
        ]);
      }
    }
  });

  const handleTextClick = () => {
    setUserList([]);
  };

  useDanmu({
    handleDanmuMessage,
  });

  useEffect(() => {
    if (import.meta.env.DEV) {
      return;
    }
    const timer = setInterval(() => {
      setUserList((prev) => {
        if (prev.length) {
          return prev.filter((item) => {
            return !item.time.isBefore(dayjs().subtract(30, 'seconds'));
          });
        } else {
          return prev;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <AnimatePresence>
        {userList.filter((i) => i.mode === textMode).length && (
          <motion.div
            key="good-night-text-wrapper"
            className="flex flex-col flex-wrap items-center justify-center gap-y-4 text-primary-1"
            variants={sentence}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleTextClick}
          >
            <div
              className={clsx(
                'flex items-center justify-center gap-x-4',
                MODE_MAP[textMode].style.title,
              )}
            >
              {text?.title.split('').map((l, i) => {
                return (
                  <motion.span
                    key={l + ' ' + i}
                    variants={letter}
                    style={{
                      textShadow: '8px 8px 8px #721B29',
                    }}
                  >
                    {l}
                  </motion.span>
                );
              })}
            </div>
            {text?.subtitle && (
              <div
                className={clsx(
                  'flex items-center justify-center gap-x-4',
                  MODE_MAP[textMode].style.subtitle,
                )}
              >
                {text?.subtitle.split('').map((l, i) => {
                  return (
                    <motion.span
                      key={l + ' ' + i}
                      variants={letter}
                      style={{
                        textShadow: '8px 8px 8px #721B29',
                      }}
                    >
                      {l}
                    </motion.span>
                  );
                })}
              </div>
            )}
            <div
              className={clsx(
                'flex max-w-2xl flex-wrap items-center justify-center gap-4 text-2xl',
                MODE_MAP[textMode].style.userList,
              )}
            >
              <span className="text-6xl">by</span>
              {userList
                .filter((i) => i.mode === textMode)
                .map((item) => {
                  return (
                    <motion.span
                      key={item.key}
                      layout
                      variants={letter}
                      className="rounded-full bg-front/70 p-3 font-sans font-extrabold text-highlight-1"
                    >
                      {item.name}
                    </motion.span>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
