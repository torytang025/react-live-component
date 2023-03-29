import { Bubble, ChatBubble, CountDown } from '@/components';
import DanMuBubble from '@/components/danmu';
import GoodNightText from '@/components/good-night-text';
import { LiveLayout } from '@/layout/live-layout';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const StudyLive: React.FC = () => {
  return (
    <>
      <LiveLayout>
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
        <DanMuBubble
          key="danmu-bubble"
          className="absolute top-[4.5rem] right-[20px] z-top"
        />
        <ChatBubble
          className="absolute bottom-[36px] right-[20px] z-top"
          name="torytang"
        />
      </LiveLayout>
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
      <GoodNightText />
    </>
  );
};

export { StudyLive };
