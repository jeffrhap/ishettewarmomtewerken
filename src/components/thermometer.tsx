import { Fragment } from "react";

type Props = { temperature: number; isWarm: boolean };

// Native panel coordinate system (300 x 660). The whole thing is scaled
// responsively by its parent; internally everything stays in these units.
const ZERO_Y = 539; // y of the 0° tick
const TUBE_BOTTOM = 590; // y where the column meets the bulb
const MAX_DEG = 40;
const PX_PER_DEG = 470 / MAX_DEG; // 0° at y=539, 40° at y=69
const TICKS = [0, 5, 10, 15, 20, 25, 30, 35, 40];

export const Thermometer = ({ temperature, isWarm }: Props) => {
  const clamped = Math.max(0, Math.min(MAX_DEG, temperature));
  const liquidTop = ZERO_Y - clamped * PX_PER_DEG;
  const liquidHeight = TUBE_BOTTOM - liquidTop;

  return (
    <div
      className="relative h-[660px] w-[300px] rounded-[28px] border-[1.5px] border-white/40"
      style={{
        background: isWarm ? "#4A0F0066" : "#08205C66",
        boxShadow: isWarm
          ? "0 18px 48px #3A0A0040"
          : "0 18px 48px #08153F40",
      }}
    >
      {/* Zone tint */}
      {isWarm ? (
        <div
          className="absolute"
          style={{
            left: 115,
            top: 70,
            width: 50,
            height: 134,
            background: "#FF1E0080",
            borderRadius: "25px 25px 0 0",
          }}
        />
      ) : (
        <div
          className="absolute"
          style={{
            left: 115,
            top: 300,
            width: 50,
            height: 290,
            background: "#34D39959",
            borderRadius: "0 0 25px 25px",
          }}
        />
      )}

      {/* Glass tube — square bottom + no bottom border so it tucks cleanly
          into the bulb instead of showing a rounded edge through the glass. */}
      <div
        className="absolute border-2 border-white/40 bg-white/20"
        style={{
          left: 115,
          top: 70,
          width: 50,
          height: 520,
          borderRadius: "25px 25px 0 0",
          borderBottomWidth: 0,
        }}
      />
      {/* Glass bulb */}
      <div
        className="absolute rounded-full border-2 border-white/40 bg-white/20"
        style={{ left: 92, top: 542, width: 96, height: 96 }}
      />

      {/* Liquid column (height tracks the temperature) */}
      <div
        className="absolute"
        style={{
          left: 127,
          top: liquidTop,
          width: 26,
          height: liquidHeight,
          background: isWarm
            ? "linear-gradient(180deg,#FF6A3D,#C21500)"
            : "linear-gradient(180deg,#7CC9FF,#1E63D6)",
          borderRadius: "13px 13px 0 0",
        }}
      />
      {/* Bulb liquid — nearly fills the bulb (leaving only the glass rim) so
          the tube/bulb glass overlap is hidden behind the opaque reservoir. */}
      <div
        className="absolute rounded-full"
        style={{
          left: 95,
          top: 545,
          width: 90,
          height: 90,
          background: isWarm ? "#CC1800" : "#1452C9",
        }}
      />
      {/* Callout connector */}
      <div
        className="absolute"
        style={{ left: 97, top: liquidTop, width: 18, height: 2, background: "#FFFFFFCC" }}
      />

      {/* Ticks + labels */}
      {TICKS.map((deg) => {
        const major = deg % 10 === 0;
        const y = ZERO_Y - deg * PX_PER_DEG;
        return (
          <Fragment key={deg}>
            <div
              className="absolute"
              style={{
                left: 175,
                top: y,
                width: major ? 24 : 14,
                height: 2,
                background: major ? "#FFFFFFCC" : "#FFFFFF73",
              }}
            />
            {major && (
              <div
                className="absolute font-body text-[13px] font-semibold text-white/80"
                style={{ left: 209, top: y - 8, width: 44 }}
              >
                {deg}°
              </div>
            )}
          </Fragment>
        );
      })}

      {/* Current temperature callout */}
      <div
        className="absolute text-right font-display text-[46px] font-extrabold leading-[46px] text-white"
        style={{ left: 5, top: liquidTop - 25, width: 88 }}
      >
        {Math.round(temperature)}°
      </div>

      {/* Status pill — centered header so it never collides with the
          temperature callout, which floats at the mercury level on the left. */}
      <div
        className="absolute flex items-center gap-1.5 rounded-full px-3 py-1.5"
        style={{
          left: "50%",
          top: 24,
          transform: "translateX(-50%)",
          background: isWarm ? "#FF1E00CC" : "#1FA85ECC",
        }}
      >
        <span className="font-body text-[12px] font-bold tracking-wider text-white">
          {isWarm ? "TE HEET" : "PRIMA"}
        </span>
        <span className="text-[12px]">{isWarm ? "🔥" : "🧊"}</span>
      </div>
    </div>
  );
};
