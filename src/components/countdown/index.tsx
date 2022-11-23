import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import useTimer from 'easytimer-react-hook';
import { motion } from 'framer-motion';

interface IProps {
  className?: string;
  extra?: React.ReactNode;
}

interface PomodoroTimer {
  status: 'focus' | 'break';
  interval: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  };
}

const CountDown: React.FC<IProps> = (props) => {
  const { className, extra } = props;
  const [currentTimer, setCurrentTimer] = useState<PomodoroTimer>({
    status: 'focus',
    interval: {
      minutes: 25,
    },
  });
  const [currentRound, setCurrentRound] = useState(1);
  const [timer, isTargetAchieved] = useTimer({
    startValues: currentTimer.interval,
    countdown: true,
    updateWhenTargetAchieved: true,
  });

  useEffect(() => {
    if (isTargetAchieved) {
      toggleStatus();
    }
  }, [isTargetAchieved]);

  const toggleStatus = () => {
    timer.stop();
    let interval;
    if (currentTimer.status === 'break') {
      setCurrentRound((prev) => (prev % 4) + 1);
      setCurrentTimer({
        status: 'focus',
        interval: {
          minutes: 25,
        },
      });
      interval = {
        minutes: 25,
      };
    } else {
      setCurrentTimer({
        status: 'break',
        interval: {
          minutes: currentRound !== 4 ? 5 : 15,
        },
      });
      interval = {
        minutes: currentRound !== 4 ? 5 : 15,
      };
    }
    timer.start({
      startValues: interval,
      countdown: true,
    });
  };

  const handleTimeClick = () => {
    if (timer.isRunning()) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  const handleStatusClick = () => {
    toggleStatus();
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className={cls([className, 'bt-black'])}
    >
      {extra}
      <p
        className="font-sans text-8xl font-semibold italic text-primary-1"
        onClick={handleTimeClick}
      >
        {timer.getTimeValues().toString(['minutes', 'seconds'], ':')}
      </p>
      <p
        className="font-sans text-4xl italic text-primary-2"
        onClick={handleStatusClick}
      >
        {(currentTimer.status === 'break' ? 'Breäk' : 'Stüdy') +
          ' #' +
          currentRound}
      </p>
    </motion.div>
  );
};

export { CountDown };
