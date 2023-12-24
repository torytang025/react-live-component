import React from 'react';

export enum TextMode {
  GoodNight = 'good_night',
  Festival = 'festival',
  Null = '',
}

export const MODE_MAP: {
  [key in TextMode]: {
    style: {
      title: string;
      subtitle?: string;
      userList?: string;
    };
    content: {
      title: React.ReactNode;
      subtitle?: string;
    };
  };
} = {
  [TextMode.GoodNight]: {
    style: {
      title: 'font-[signature] text-9xl',
      subtitle: 'font-[signature] text-6xl',
      userList: 'font-[signature]',
    },
    content: {
      title: 'Good Night',
    },
  },
  [TextMode.Festival]: {
    style: {
      title: 'font-[Reggae] text-9xl',
      subtitle: 'font-[Reggae] text-6xl',
      userList: 'font-[Reggae]',
    },
    content: {
      title: <div className="font-[Reggae] text-9xl">🎄圣诞快乐</div>,
      subtitle: 'Merry Christmas',
    },
  },
  [TextMode.Null]: {
    style: {
      title: '',
    },
    content: { title: '' },
  },
};
