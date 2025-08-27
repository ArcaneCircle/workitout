import { useEffect } from "react";
import PartyPopper from "~icons/custom/party-popper";

import { levelUpSfx } from "~/lib/sounds";

import ConfirmModal from "./ConfirmModal";

const PartyPopperStyled = () => (
  <PartyPopper style={{ height: "1.3em", width: "auto" }} />
);

type Props = {
  level: number;
  [key: string]: any;
};

export default function LevelUpModal({ level, ...props }: Props) {
  useEffect(() => {
    levelUpSfx.play();
  }, [level]);

  return (
    <ConfirmModal {...props}>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "2em" }}>
          You Leveled Up!
          <hr />
        </div>
        <div style={{ fontSize: "0.8em", paddingBottom: "0.4em" }}>
          Now at level
        </div>
        <div style={{ fontSize: "1.5em" }}>
          <PartyPopperStyled />
          <span style={{ paddingLeft: "0.2em", paddingRight: "0.2em" }}>
            {level}
          </span>
          <PartyPopperStyled />
        </div>
      </div>
    </ConfirmModal>
  );
}
