import { clickSfx } from "~/lib/sounds";
import { GOAL_COLOR } from "~/lib/constants";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  [key: string]: any;
}

export default function MenuButton({ onClick, children, ...props }: Props) {
  const btnStyle = {
    width: "100%",
    fontSize: "1em",
    color: "black",
    backgroundColor: GOAL_COLOR,
    cursor: "pointer",
    border: "none",
    padding: "0.4em 0.5em",
  };
  props.style = { ...btnStyle, ...(props.style || {}) };
  const clickWithSound = () => {
    clickSfx.play();
    onClick();
  };

  return (
    <button className="pixel-corners4" onClick={clickWithSound} {...props}>
      {children}
    </button>
  );
}
