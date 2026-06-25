type Props = { size: number };

// Brand thermometer mark shared by the favicon-style icon and the Apple touch
// icon. Sizing is derived from the pixel `size` (not percentages) so the bulb
// stays circular regardless of the canvas the icon is rendered at.
export const IconArt = ({ size }: Props) => {
  const cx = size / 2;
  const tubeW = size * 0.16;
  const tubeH = size * 0.5;
  const tubeTop = size * 0.12;
  const bulb = size * 0.34;
  const bulbTop = tubeTop + tubeH - bulb * 0.35;
  const mercW = tubeW * 0.5;
  const mercTop = size * 0.4;
  const mercH = bulbTop + bulb / 2 - mercTop;
  const border = `${Math.max(2, size * 0.012)}px solid rgba(255,255,255,0.7)`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        background: "linear-gradient(152deg,#FF7A18 16%,#E53600 84%)",
      }}
    >
      {/* glass tube */}
      <div
        style={{
          position: "absolute",
          left: cx - tubeW / 2,
          top: tubeTop,
          width: tubeW,
          height: tubeH,
          borderRadius: tubeW,
          background: "rgba(255,255,255,0.3)",
          border,
        }}
      />
      {/* mercury column */}
      <div
        style={{
          position: "absolute",
          left: cx - mercW / 2,
          top: mercTop,
          width: mercW,
          height: mercH,
          borderRadius: mercW,
          background: "#C21500",
        }}
      />
      {/* bulb */}
      <div
        style={{
          position: "absolute",
          left: cx - bulb / 2,
          top: bulbTop,
          width: bulb,
          height: bulb,
          borderRadius: bulb,
          background: "#C21500",
          border,
        }}
      />
    </div>
  );
};
