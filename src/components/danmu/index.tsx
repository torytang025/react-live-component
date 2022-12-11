import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bubble } from '../chat-bubble';

interface IMsg {
  name: string;
  content: string;
  key: string | number;
}

const maxMsg = 3;
const rid = '26433151';

export default function DanMuBubble(props: { className?: string }) {
  const { className } = props;
  const [msgList, setMsgList] = useState<IMsg[]>([]);

  useEffect(() => {
    const socket = new WebSocket('wss://blive.deno.dev');

    socket.addEventListener('open', () => {
      // 进入房间命令
      socket.send(
        JSON.stringify({
          cmd: 'enter', // 命令
          rid, // 房间号
          events: ['DANMU_MSG', 'SUPER_CHAT_MESSAGE'], // 监听这个房间中的事件列表
        }),
      );

      // 离开房间命令
      // socket.send(
      //   JSON.stringify({
      //     cmd: 'leave', // 命令
      //     rid: '123', // 房间号
      //   }),
      // );
    });

    const handleSocket = (ev: MessageEvent) => {
      const { data } = ev;
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch {
        console.log();
      }

      if (jsonData && jsonData?.payload) {
        const data = jsonData.payload?.info as any[];
        if (!data || !data.length) {
          return;
        }
        const msg = data[1];
        const user = data[2][1];
        setMsgList((prev) => {
          const date = new Date();
          const key =
            date.getSeconds().toString() +
            date.getMilliseconds().toString() +
            user +
            msg.slice(0, 5);
          if (prev.length < maxMsg) {
            return [...prev, { name: user, content: msg, key }];
          } else {
            return [...prev.slice(1), { name: user, content: msg, key }];
          }
        });
      }
    };

    socket.addEventListener('message', handleSocket);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setMsgList((prev) => {
        return prev.slice(1);
      });
    }, 10000);
  }, []);

  return (
    <div className={classNames([className])}>
      <AnimatePresence>
        <div className="flex h-[330px] flex-col justify-end gap-y-4">
          {msgList.map((msg) => (
            <Bubble
              key={msg.key}
              content={msg.content}
              name={msg.name}
              onClick={() => {
                setMsgList((prev) => {
                  const ind = prev.findIndex((item) => item.key === msg.key);
                  return prev.slice(0, ind).concat(prev.slice(ind + 1));
                });
              }}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
