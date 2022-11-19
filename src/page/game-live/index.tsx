import React from 'react';
import { ChatBubble } from '@/components';
import { LiveLayout } from '@/layout/live-layout';

export const GameLive = () => {
  return (
    <LiveLayout>
      <ChatBubble
        className="absolute bottom-[460px] right-[20px]"
        name="torytang"
      />
    </LiveLayout>
  );
};
