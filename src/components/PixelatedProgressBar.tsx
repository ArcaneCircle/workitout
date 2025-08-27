const container = {
  display: "flex",
  flexDirection: "row" as "row",
  flexWrap: "nowrap" as "nowrap",
  overflow: "hidden" as "hidden",
  alignItems: "center",
  border: "2px solid #464646",
  borderRadius: "5px",
  position: "relative" as "relative",
};
const row = {
  height: "5px",
};
const square = {
  height: "5px",
  width: "5px",
  float: "left" as "left",
};

interface Props {
  progress: number;
  total: number;
  color: string;
  label?: string;
  lite?: boolean;
  [key: string]: any;
}

export default function PixelatedProgressBar({
  progress,
  total,
  color,
  lite,
  label,
  ...props
}: Props) {
  const height = lite ? "15px" : "20px";
  const labelStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap" as "nowrap",
    textWrap: "nowrap" as "nowrap",
    position: "absolute" as "absolute",
    fontSize: lite ? "14px" : "20px",
    paddingLeft: "5px",
    color: "white",
    textShadow: "1px 1px 2px black",
  };
  progress = Math.min(progress, total);
  const percentage = Math.round((progress / total) * 100);
  const progressStyle = {
    width: `${percentage}%`,
    height,
    background: color,
  };
  const d0 = { ...square, background: color };
  const d1 = { ...square, background: color + "f2" };
  const d2 = { ...square, background: color + "d9" };
  const d3 = { ...square, background: color + "4d" };
  const hide = percentage === 100 || progress === 0;
  const pixels = { minWidth: "15px", display: hide ? "none" : "inline-block" };

  props.style = { ...container, height, ...(props.style || {}) };
  return (
    <div {...props}>
      {label && <div style={labelStyle}>{label}</div>}
      <div style={progressStyle}></div>
      <div style={pixels}>
        <div style={row}>
          <span style={d2}></span>
          <span style={d3}></span>
          <span style={square}></span>
        </div>
        <div style={row}>
          <span style={d1}></span>
          <span style={d2}></span>
          <span style={d3}></span>
        </div>
        <div style={row}>
          <span style={d0}></span>
          <span style={d1}></span>
          <span style={d2}></span>
        </div>
        {!lite && (
          <div style={row}>
            <span style={d0}></span>
            <span style={d0}></span>
            <span style={d1}></span>
          </div>
        )}
      </div>
    </div>
  );
}
