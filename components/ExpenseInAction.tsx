"use client";

import { Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const videos = [
  { label: "iOS", src: "/videos/expense-all-ios.mp4" },
  { label: "Android", src: "/videos/expense-all-android.mp4" },
];

const ExpenseInAction = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "expense-video-state") return;
      setPlayingVideo(event.data.playing ? event.data.label : null);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const playVideo = (label: string) => {
    iframeRefs.current[label]?.contentWindow?.postMessage(
      { type: "expense-video-play" },
      window.location.origin,
    );
  };

  return (
    <section className="w-full bg-transparent px-5 py-10 sm:py-12">
      <div className="mx-auto max-w-[850px] text-center">
        <h2 className="text-[24px] font-semibold leading-tight text-white sm:text-[26px]">
          See <span className="text-cyan-400">ExpenseAll</span> in Action
        </h2>
        <p className="mx-auto mt-2 max-w-[540px] text-[14px] leading-[20px] text-white/85 sm:text-[15px]">
          Experience a smarter, simpler way to manage your money, available on
          both iOS and Android.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-7 sm:flex-row sm:gap-10">
          {videos.map((video) => (
            <div key={video.label} className="flex w-full max-w-[330px] flex-col items-center">
              <div
                className={`relative w-full overflow-hidden rounded-[11px] bg-[#0E2A5E]/50 ring-1 ring-white/10 transition-[height] duration-300 ${playingVideo === video.label ? "h-[620px]" : "h-[380px]"}`}
              >
                <iframe
                  ref={(element) => { iframeRefs.current[video.label] = element; }}
                  title={`ExpenseAll on ${video.label}`}
                  srcDoc={`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;width:100vw;height:100vh;background:#0E2A5E;display:flex;align-items:center;justify-content:center"><video src="${video.src}" controls playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover" onplay="parent.postMessage({type:'expense-video-state',label:'${video.label}',playing:true},'*')" onpause="parent.postMessage({type:'expense-video-state',label:'${video.label}',playing:false},'*')" onended="parent.postMessage({type:'expense-video-state',label:'${video.label}',playing:false},'*')"></video><script>window.addEventListener('message',function(event){if(event.data&&event.data.type==='expense-video-play'){document.querySelector('video').play()}})</script></body></html>`}
                  className="h-full w-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
                {playingVideo !== video.label && (
                  <button
                    type="button"
                    onClick={() => playVideo(video.label)}
                    aria-label={`Play ExpenseAll ${video.label} video`}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition hover:bg-black/25"
                  >
                    <span className="flex h-14 w-14 items-center cursor-pointer justify-center rounded-full border border-white/80 bg-black/40 text-white shadow-lg transition hover:scale-110">
                      <span className="ml-1 text-lg"><Play/></span>
                    </span>
                  </button>
                )}
              </div>
              <p className="mt-4 text-[14px] font-medium text-white">
                ExpenseAll on <span className="text-cyan-400">{video.label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpenseInAction;
