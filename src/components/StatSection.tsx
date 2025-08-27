interface Props {
  title: string;
  number: number | string;
  numberSize?: string;
  numberColor?: string;
  unit?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export default function StatSection({
  title,
  number,
  numberSize,
  numberColor,
  unit,
  icon,
  ...props
}: Props) {
  const smallLabel = { paddingLeft: "0.2em", fontSize: "0.9em" };
  return (
    <div {...props}>
      <div
        style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline" }}
      >
        <span style={{ paddingRight: "0.5em" }}>{title}</span>
        {icon}
        <span style={{ color: numberColor, fontSize: numberSize }}>
          {number}
        </span>
        {unit && <span style={smallLabel}>{unit}</span>}
      </div>
    </div>
  );
}
