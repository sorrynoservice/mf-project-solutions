import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import Img from "@/components/Img";
import { img } from "@/lib/img";
import type { VideoItem } from "@/lib/types";

type Props = { video: VideoItem; className?: string; aspect?: string };

const youtubeId = (src: string) => src.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];

/**
 * One video component for the whole site.
 *
 * Clips with sound (loop: false) behave like the snagging video: poster and a play button, then
 * native controls. Silent loops (loop: true) play muted and inline while at least 40% visible,
 * pause when scrolled away and resume when they come back. They keep a small pause/play button,
 * and if the browser refuses autoplay (data saver, low power mode) the big play button returns.
 *
 * The <video> element is always in the page with preload="none", so nothing downloads until it
 * plays, and play() is called directly inside the click handler, which iOS Safari requires.
 */
export default function Video({ video, className = "", aspect = "aspect-[9/16]" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const yt = youtubeId(video.src);
  const loop = !!video.loop;
  const [started, setStarted] = useState(false); // has played at least once
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false); // autoplay refused, show the big button
  const [failed, setFailed] = useState(false);
  const [ytOpen, setYtOpen] = useState(false);
  const userPaused = useRef(false);

  const tryPlay = useCallback(() => {
    const v = ref.current;
    if (!v) return;
    if (loop) {
      v.muted = true;
      v.defaultMuted = true;
    }
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => setBlocked(false)).catch((err: unknown) => {
        if ((err as { name?: string })?.name !== "AbortError") setBlocked(true);
      });
    }
  }, [loop]);

  // Silent loops: play in view, pause out of view, resume on return.
  useEffect(() => {
    if (!loop || yt) return;
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setBlocked(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!userPaused.current) tryPlay();
        } else {
          ref.current?.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loop, yt, tryPlay]);

  const posterSrc = img(video.poster).src;

  if (yt) {
    return (
      <figure className={className}>
        <div className={`relative overflow-hidden rounded-lg bg-ink ${aspect}`}>
          {ytOpen ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
              title={video.caption || "Video"}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Img src={video.poster} alt="" layout="(min-width: 1024px) 33vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
              <BigPlay label={video.caption} onClick={() => setYtOpen(true)} />
            </>
          )}
        </div>
        {video.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{video.caption}</figcaption>}
      </figure>
    );
  }

  const showBig = !failed && (loop ? blocked && !playing : !started);

  return (
    <figure className={className}>
      <div ref={box} className={`relative overflow-hidden rounded-lg bg-ink ${aspect}`}>
        {!started && <Img src={video.poster} alt="" layout="(min-width: 1024px) 33vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />}
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover ${started ? "" : "opacity-0"}`}
          src={video.src}
          poster={posterSrc}
          preload="none"
          playsInline
          muted={loop}
          loop={loop}
          controls={!loop && started}
          disablePictureInPicture={loop}
          aria-label={video.caption || "Video"}
          onPlaying={() => {
            setStarted(true);
            setPlaying(true);
            setBlocked(false);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            if (typeof console !== "undefined") console.warn("[video] could not load", video.src);
          }}
          {...(loop ? { "webkit-playsinline": "true" } : {})}
        />
        {showBig && (
          <BigPlay
            label={video.caption}
            onClick={() => {
              userPaused.current = false;
              tryPlay();
            }}
          />
        )}
        {loop && started && !failed && (
          <button
            type="button"
            onClick={() => {
              const v = ref.current;
              if (!v) return;
              if (v.paused) {
                userPaused.current = false;
                tryPlay();
              } else {
                userPaused.current = true;
                v.pause();
              }
            }}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
          </button>
        )}
        {failed && (
          <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 text-center text-xs text-white">Video unavailable right now</div>
        )}
      </div>
      {video.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{video.caption}</figcaption>}
    </figure>
  );
}

function BigPlay({ label, onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/25"
      aria-label={`Play video${label ? `: ${label}` : ""}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink shadow-xl">
        <Play className="ml-1 h-7 w-7 fill-current" />
      </span>
    </button>
  );
}
