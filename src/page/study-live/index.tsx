import { Bubble, ChatBubble, CountDown } from '@/components';
import DanMuBubble from '@/components/danmu';
import { LiveLayout } from '@/layout/live-layout';
import React from 'react';

const StudyLive: React.FC = () => {
  return (
    <LiveLayout>
      <CountDown
        className="absolute left-[40px] top-1/2 -translate-y-1/2 "
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
        className="absolute top-[4.5rem] right-[20px]"
      />
      <ChatBubble
        className="absolute bottom-[36px] right-[20px]"
        name="torytang"
      />
    </LiveLayout>
  );
};

export { StudyLive };
