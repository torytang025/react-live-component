import { ChatBubble } from '@/components';
import DanMuBubble from '@/components/danmu';
import { GameLiveLayout } from '@/layout/live-layout';

export const GameLive = () => {
  return (
    <GameLiveLayout>
      <ChatBubble
        className="absolute bottom-[460px] right-[20px]"
        name="torytang"
      />
      <DanMuBubble
        key="danmu-bubble"
        className="absolute top-[12rem] right-[20px] z-top"
        size="small"
      />
    </GameLiveLayout>
  );
};
