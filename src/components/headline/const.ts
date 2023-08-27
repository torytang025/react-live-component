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
      title: 'font-[Reggae] text-9xl',
      subtitle: 'font-[Reggae] text-6xl',
      userList: 'font-[Reggae]',
    },
    content: { title: '高考加油', subtitle: '金榜题名' },
  },
  [TextMode.Null]: {
    style: {
      title: '',
    },
    content: { title: '' },
  },
};
