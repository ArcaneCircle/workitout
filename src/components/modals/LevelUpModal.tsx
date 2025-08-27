import { useEffect } from "react";
import PartyPopper from "~icons/custom/party-popper";

import { levelUpSfx } from "~/lib/sounds";

import ConfirmModal from "./ConfirmModal";

const PartyPopperStyled = () => (
  <PartyPopper style={{ height: "1.2em", width: "auto" }} />
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
        <div style={{ marginBottom: "1.5em" }}>
          YOU LEVELED UP!
          <hr />
        </div>
        <div style={{ paddingBottom: "0.4em" }}>
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
