import { clickSfx } from "~/lib/sounds";

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
    backgroundColor: "white",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    padding: "0.4em 0.5em",
  };
  props.style = { ...btnStyle, ...(props.style || {}) };
  const clickWithSound = () => {
    clickSfx.play();
    onClick();
  };

  return (
    <button onClick={clickWithSound} {...props}>
      {children}
    </button>
  );
}
