import { Bubble, ChatBubble, CountDown } from '@/components';
import DanMuBubble from '@/components/danmu';
import Headline from '@/components/headline';
import { StudyLiveLayout } from '@/layout/live-layout';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { timerAtom } from './model/atom';

const danmuVariants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 200 },
};

const StudyLive: React.FC = () => {
  const timerState = useRecoilValue(timerAtom);

  return (
    <>
      <StudyLiveLayout>
        <CountDown
          className="absolute left-[40px] top-1/2 z-top -translate-y-1/2"
          extra={
            <Bubble
              id="countdown-text"
              name="torytang"
              content="This is the Pomodoro Timer I coded~"
              direction="left"
              className="ml-10"
              size="small"
            />
          }
        />
        <AnimatePresence>
          {(timerState.status === 'break' || import.meta.env.DEV) && (
            <motion.div
              variants={danmuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <DanMuBubble
                key="danmu-bubble"
                className="absolute top-[4.5rem] right-[20px] z-top"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <ChatBubble
          className="absolute bottom-[36px] right-[20px] z-top"
          name="torytang"
        />
      </StudyLiveLayout>
      <Toaster
        position="bottom-center"
        containerClassName="ml-40"
        gutter={24}
        toastOptions={{
          style: {
            backgroundColor: 'rgb(216 205 185)',
            color: 'rgb(114 27 41)',
            fontWeight: 800,
            fontSize: '1.5rem',
            lineHeight: '2rem',
            borderRadius: 9999,
            maxWidth: 'none',
            height: 64,
          },
        }}
        containerStyle={{
          bottom: 128,
          zIndex: 99,
        }}
      />
      <Headline />
    </>
  );
};

export { StudyLive };
