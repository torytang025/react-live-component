import cls from 'classnames';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Bubble } from './bubble';

interface IProps {
  className?: string;
  name: string;
  maxMsg?: number;
}

interface IMsg {
  name: string;
  content: string;
  key: string | number;
}

const ChatBubble: React.FC<IProps> = (props) => {
  const { name, maxMsg = 3, className } = props;
  const [msgList, setMsgList] = useState<IMsg[]>([]);

  const handleAddMsg = (text: string) => {
    if (!text) {
      return;
    }
    if (msgList.length && text === msgList[msgList.length - 1].content) {
      return;
    }
    setMsgList((prev) => {
      const date = new Date();
      const key =
        date.getSeconds().toString() + date.getMilliseconds().toString();
      if (prev.length < maxMsg) {
        return [...prev, { name, content: text, key }];
      } else {
        return [...prev.slice(1), { name, content: text, key }];
      }
    });
  };

  return (
    <div className={cls([className])}>
      <div className="flex flex-col items-end justify-end gap-y-4">
        <AnimatePresence>
          {msgList.map((msg) => (
            <Bubble
              key={msg.key}
              id={msg.key}
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
        </AnimatePresence>
        <Bubble
          key={'edit-bubble'}
          id="edit-bubble"
          editable={true}
          name={name}
          onEnter={(value) => {
            handleAddMsg(value);
          }}
        />
      </div>
    </div>
  );
};

export { ChatBubble };
