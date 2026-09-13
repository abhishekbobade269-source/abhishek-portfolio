import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 14,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="17" stroke="#34d399" strokeWidth="2" strokeOpacity="0.4" />
          <circle cx="20" cy="6" r="2.4" fill="#34d399" />
          <circle cx="32" cy="27" r="2.4" fill="#34d399" />
          <circle cx="8" cy="27" r="2.4" fill="#34d399" />
        </svg>
      </div>
    ),
    size
  );
}
