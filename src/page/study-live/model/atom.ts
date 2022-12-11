import { PomodoroTimer } from '@/components';
import { atom } from 'recoil';

export const timerAtom = atom<PomodoroTimer>({
  key: 'timer',
  default: {
    status: 'focus',
    interval: {
      minutes: 25,
    },
  },
});
