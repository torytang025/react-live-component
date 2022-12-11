import { Bubble, ChatBubble, CountDown } from '@/components';
import { LiveLayout } from '@/layout/live-layout';
import React from 'react';

const StudyLive: React.FC = () => {
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
      {/* <DanMuBubble className="absolute top-24 right-[20px]" /> */}
      <ChatBubble
        className="absolute bottom-[36px] right-[20px]"
        name="torytang"
      />
    </LiveLayout>
  );
};

export { StudyLive };
