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
      title: string;
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
      title: 'font-[Reggae] text-6xl',
      subtitle: 'font-[Reggae] text-5xl',
      userList: 'font-[Reggae]',
    },
    content: { title: "Happy April Fools' Day", subtitle: '愚人节快乐' },
  },
  [TextMode.Null]: {
    style: {
      title: '',
    },
    content: { title: '' },
  },
};
