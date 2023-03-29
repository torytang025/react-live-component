import { IDanmuMsg, IGiftData } from '@/types/danmu';
import { TORY_RID } from '@/utils/const';
import { useDeepCompareEffect } from 'ahooks';
import { KeepLiveWS } from 'bilibili-live-ws/browser';

const live = new KeepLiveWS(TORY_RID);

export function useDanmu(props: {
  handleLiveOpen?: () => void;
  handleDanmuMessage?: (data: IDanmuMsg) => void;
  handleSendGift?: (data: IGiftData) => void;
}) {
  const { handleDanmuMessage, handleLiveOpen, handleSendGift } = props;

  useDeepCompareEffect(() => {
    const fn = () => {
      handleLiveOpen?.();
      console.log(
        '%c [ wss init success ]',
        'font-size:13px; background:#FFFF00; color:#bf2c9f;',
      );
    };
    live?.on('open', fn);

    return () => {
      live?.removeListener('open', fn);
    };
  }, [handleLiveOpen]);

  useDeepCompareEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = (data: { cmd: string; info?: any; data?: any }) => {
      console.log(
        '%c [ bilibili live msg data ]',
        'font-size:13px; background:#FFFF00; color:#bf2c9f;',
        data,
      );
      const type = data.cmd;
      switch (type) {
        case 'DANMU_MSG':
          handleDanmuMessage?.(data.info);
          break;
        case 'SEND_GIFT':
          handleSendGift?.(data.data);
          break;
      }
    };
    live?.on('msg', fn);

    return () => {
      live?.removeListener('msg', fn);
    };
  }, [handleDanmuMessage, handleSendGift]);
}
