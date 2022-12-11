import { Bubble, ChatBubble, CountDown } from '@/components';
import DanMuBubble from '@/components/danmu';
import { LiveLayout } from '@/layout/live-layout';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { timerAtom } from './model/atom';

const danmuVariants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: 200 },
};

const StudyLive: React.FC = () => {
  const timerState = useRecoilValue(timerAtom);

  return (
    <LiveLayout>
      <CountDown
        className="absolute left-[40px] top-1/2 -translate-y-1/2 "
        extra={
          <Bubble
            key="countdown-text"
            name="torytang"
            content="This is the Pomodoro Timer I coded~"
            direction="left"
            className="ml-10"
            size="small"
          />
        }
      />
      <AnimatePresence>
        <motion.div
          variants={danmuVariants}
          animate={timerState.status === 'break' ? 'visible' : 'hidden'}
        >
          <DanMuBubble
            key="danmu-bubble"
            className="absolute top-[4.5rem] right-[20px]"
          />
        </motion.div>
      </AnimatePresence>
      <ChatBubble
        className="absolute bottom-[36px] right-[20px]"
        name="torytang"
      />
    </LiveLayout>
  );
};

export { StudyLive };
