'use client';

import { useEffect, useRef, useState } from 'react';

export function VideoBackground({
  src,
  poster,
  className,
  overlay = 'gradient',
  autoPlay = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  overlay?: 'dark' | 'gradient' | 'none';
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onLoaded = () => setLoaded(true);
    const onError = () => setFailed(true);
    v.addEventListener('loadeddata', onLoaded);
    v.addEventListener('error', onError);
    return () => {
      v.removeEventListener('loadeddata', onLoaded);
      v.removeEventListener('error', onError);
    };
  }, [src]);

  if (failed && !poster) return null;

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {poster && (
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-opacity duration-700',
            loaded ? 'opacity-0' : 'opacity-100'
          )}
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      {!failed && (
        <video
          ref={ref}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {overlay === 'dark' && <div className="absolute inset-0 bg-ink-950/55" />}
      {overlay === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950" />
      )}
    </div>
  );
}

function cn(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(' ');
}
