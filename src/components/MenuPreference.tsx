import MenuButton from "./MenuButton";

interface Props {
  onClick: () => void;
  name: string;
  state: React.ReactNode;
  [key: string]: any;
}

export default function MenuPreference({ name, state, ...props }: Props) {
  const divStyle = {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "space-between",
  };
  return (
    <MenuButton {...props}>
      <div style={divStyle}>
        <div style={{ paddingRight: "1em" }}>{name}</div> <div>{state}</div>
      </div>
    </MenuButton>
  );
}
