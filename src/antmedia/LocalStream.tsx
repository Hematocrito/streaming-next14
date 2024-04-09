import React from 'react';
import classnames from 'classnames';

export interface HTMLMediaProps
  extends React.AudioHTMLAttributes<any>,
    React.VideoHTMLAttributes<any> {
  id: string;
  // eslint-disable-next-line react/require-default-props
  classNames?: string;
}

const defaultProps = {
  muted: true,
  controls: true,
  playsInline: true,
  autoPlay: true,
  preload: 'auto'
};

export function LocalStream({ classNames, ...props }: HTMLMediaProps) {
  const ref = React.useRef<HTMLVideoElement>();
  React.useEffect(() => {
    const videoEl = ref.current;
    if (videoEl) {
      videoEl.addEventListener('play', () => {
        //  eslint-disable-next-line no-console
        console.log('Pulisher is playing');
      });
    }
  }, []);

  return React.createElement('video', {
    ...defaultProps,
    ...props,
    ref,
    className: classnames('video-js broadcaster', classNames)
  });
}
