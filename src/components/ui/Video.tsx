import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import Img from "@/components/Img";
import { img } from "@/lib/img";
import type { VideoItem } from "@/lib/types";

type Props = { video: VideoItem; className?: string; aspect?: string };

const youtubeId = (src: string) => src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];

/**
 * Video without the weight. Nothing downloads until the visitor presses play, except short
 * silent loops, which start on wider screens once scrolled into view (never with reduced motion).
 * YouTube links become a click-to-load embed.
 */
export default function Video({ video, className = "", aspect = "aspect-[9/16]" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const yt = youtubeId(video.src);

  useEffect(() => {
    if (!video.loop || yt) return;
    const el = box.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setPlaying(true);
        else ref.current?.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video.loop, yt]);

  useEffect(() => {
    if (playing) ref.current?.play().catch(() => undefined);
  }, [playing]);

  const poster = img(video.poster).src;

  return (
    <figure className={className}>
      <div ref={box} className={`relative overflow-hidden rounded-lg bg-ink ${aspect}`}>
        {playing && yt ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
            title={video.caption || "Video"}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : playing ? (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            src={video.src}
            poster={poster}
            playsInline
            muted={video.loop}
            loop={video.loop}
            controls={!video.loop}
            preload="none"
          />
        ) : (
          <>
            <Img src={video.poster} alt="" layout="(min-width: 1024px) 33vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/25"
              aria-label={`Play video${video.caption ? `: ${video.caption}` : ""}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink shadow-xl">
                <Play className="ml-1 h-7 w-7 fill-current" />
              </span>
            </button>
          </>
        )}
      </div>
      {video.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{video.caption}</figcaption>}
    </figure>
  );
}
