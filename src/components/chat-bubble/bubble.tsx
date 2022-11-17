import React, { useState } from 'react';
import cls from 'classnames';
import AutosizeInput from 'react-input-autosize';
import { motion, Variants } from 'framer-motion';

type IDirection = 'left' | 'right';

interface IProps {
  key: string | number;
  content?: string;
  name?: string;
  className?: string;
  direction?: IDirection;
  size?: 'small' | 'medium';
  editable?: boolean;
  onClick?: () => void;
  onInput?: (value: string) => void;
  onEnter?: (value: string) => void;
}

const bubbleMotionVariants: Variants = {
  visible: (direction: IDirection) => {
    return {
      x: direction === 'left' ? [-40, -20, 0] : [0, -20, -40],
      opacity: 1,
      scale: [0, 1.1, 1],
      transition: { duration: 1, times: [0, 0.4, 1], ease: 'easeOut' },
    };
  },
  hidden: (direction: IDirection) => {
    return {
      opacity: 0,
      x: direction === 'left' ? [0, -20, -40] : [-40, -20, 0],
      transition: { duration: 1, times: [0, 0.4, 1], ease: 'easeOut' },
    };
  },
};

const Bubble: React.FC<IProps> = (props) => {
  const {
    key,
    content,
    name,
    direction = 'right',
    size = 'medium',
    className,
    editable = false,
    onClick,
    onInput,
    onEnter,
  } = props;
  const [inputValue, setInputValue] = useState('');

  return (
    <motion.div
      layout
      key={key}
      className={cls([className])}
      onClick={onClick}
      initial="hidden"
      animate="visible"
      exit="hidden"
      custom={direction}
      variants={bubbleMotionVariants}
    >
      {!editable && (
        <p
          className={`flex font-bold italic text-front ${
            direction === 'left' ? 'ml-1 justify-start' : 'mr-1 justify-end'
          } ${size === 'medium' ? 'text-2xl' : 'text-xl'}`}
        >
          {name}
        </p>
      )}
      <div className="relative flex max-w-xl justify-end align-middle">
        {!editable && (
          <div
            className={`absolute h-[28px] w-[20px] rounded-full bg-transparent  ${
              direction === 'right'
                ? 'bottom-1 -right-4 shadow-chatBubbleRightTail'
                : 'bottom-1 -left-4 shadow-chatBubbleLeftTail'
            }`}
          >
            &nbsp;
          </div>
        )}
        {editable ? (
          <div className="mt-12">
            <AutosizeInput
              value={inputValue}
              inputClassName="whitespace-pre-wrap rounded-[24px] py-[14px] px-[20px] text-[26px] text-transparent hover:text-highlight-1 bg-transparent hover:bg-front transition-all outline-none"
              minWidth={40}
              onChange={(e) => {
                const value = e.target.value;
                onInput?.(value);
                setInputValue(value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onEnter?.(inputValue);
                  setInputValue('');
                }
              }}
            />
          </div>
        ) : (
          <div
            className={`whitespace-pre-wrap rounded-[24px] bg-front ${
              size === 'medium'
                ? 'py-[14px] px-[20px] text-[26px]'
                : 'py-[8px] px-[18px] text-[16px]'
            }  text-highlight-1`}
          >
            {content}
          </div>
        )}
        <div></div>
      </div>
    </motion.div>
  );
};

export { Bubble };
