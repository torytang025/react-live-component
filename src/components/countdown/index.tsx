import cls from 'classnames';
import useTimer from 'easytimer-react-hook';
import { useEffect, useState } from 'react';

interface IProps {
  className?: string;
}

enum PomodoroTimer {
  Focus = 25,
  break = 5,
}

const FOCUS_START_VALUE = {
  hours: 0,
  minutes: PomodoroTimer.Focus,
  seconds: 0,
};

const BREAK_START_VALUE = {
  hours: 0,
  minutes: PomodoroTimer.break,
  seconds: 0,
};

function CountDown(props: IProps) {
  const { className } = props;
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [timer, isTargetAchieved] = useTimer({
    startValues: {
      minutes: PomodoroTimer.Focus,
    },
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
    setIsBreakTime((prev) => !prev);
    timer.start({
      startValues: isBreakTime ? FOCUS_START_VALUE : BREAK_START_VALUE,
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
    <div className={cls([className, 'bt-black'])}>
      <p className="font-sans text-8xl font-semibold italic text-primary-1" onClick={handleTimeClick}>
        {timer.getTimeValues().toString(['minutes', 'seconds'], ':')}
      </p>
      <p className="font-sans text-4xl italic text-primary-2" onClick={handleStatusClick}>
        {isBreakTime ? 'Breäk' : 'Stüdy'}
      </p>
    </div>
  );
}

export { CountDown };
