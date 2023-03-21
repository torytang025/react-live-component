import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

export const LiveLayout: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <div
      className={`relative h-[1080px] w-[1920px] ${
        import.meta.env.DEV ? 'bg-study-live bg-cover' : 'bg-transparent'
      }`}
    >
      {children}
    </div>
  );
};
