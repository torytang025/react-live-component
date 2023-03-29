import { useDanmu } from '@/hooks/danmu';
import { IDanmuMsg } from '@/types/danmu';
import { isGoodNightDanmuMsg } from '@/utils/danmu';
import { useMemoizedFn } from 'ahooks';
import dayjs, { Dayjs } from 'dayjs';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { filter } from 'lodash-es';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

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

interface IGoodNightData {
  name: string;
  uid: number;
  time: Dayjs;
  key: string;
}

const MAX_USER = 20;

export default function GoodNightText() {
  const [gnList, setGnList] = useState<IGoodNightData[]>([]);

  const handleDanmuMessage = useMemoizedFn((data: IDanmuMsg) => {
    const currentHour = dayjs().hour();
    if (currentHour > 6 && currentHour < 20) return;
    const msg = data[1];
    const user = data[2];
    const uid = data[2][0];
    const username = user[1];
    if (msg && isGoodNightDanmuMsg(msg)) {
      const temp = [...gnList];
      if (temp.length >= MAX_USER) {
        temp.slice(1);
      }
      const index = temp.findIndex((i) => i.uid === uid);
      if (index !== -1) {
        setGnList(
          filter(temp, (i) => i.uid !== uid).concat({
            key: v4(),
            name: username,
            uid,
            time: dayjs(),
          }),
        );
      } else {
        setGnList([
          ...temp,
          {
            key: v4(),
            name: username,
            uid,
            time: dayjs(),
          },
        ]);
      }
    }
  });

  const handleTextClick = () => {
    setGnList([]);
  };

  useDanmu({
    handleDanmuMessage,
  });

  useEffect(() => {
    setInterval(() => {
      setGnList((prev) => {
        if (prev.length) {
          return prev.filter((item) => {
            return !item.time.isBefore(dayjs().subtract(30, 'seconds'));
          });
        } else {
          return prev;
        }
      });
    }, 1000);
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
      <AnimatePresence>
        {gnList.length && (
          <motion.div
            key="good-night-text-wrapper"
            className="text-primary-1"
            variants={sentence}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={handleTextClick}
          >
            <div className="flex items-center justify-center gap-x-4 font-[signature] text-9xl">
              {'Good Night'.split('').map((l, i) => {
                return (
                  <motion.span key={l + ' ' + i} variants={letter}>
                    {l}
                  </motion.span>
                );
              })}
            </div>
            <div className="flex max-w-2xl flex-wrap items-center justify-center gap-4 text-2xl">
              <span className="font-[signature] text-6xl">by</span>
              {gnList.map((item) => {
                return (
                  <motion.span
                    key={item.key}
                    layout
                    variants={letter}
                    className="rounded-full bg-front/70 p-3 font-extrabold text-highlight-1"
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
