"use client"

import { useEffect, useRef } from "react";
type VideoProps = {
  stream: MediaStream | null;
};
export const Video: React.FC<VideoProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream])

  return (
    <div>
      <div className="rounded-2xl border-8 border-[#404094c6]">
        <video style={{ borderRadius: 10 }} ref={videoRef} muted width="100%" autoPlay={true} playsInline={true}
          className=" rounded-3xl"
        />
      </div>
    </div>
  )
}