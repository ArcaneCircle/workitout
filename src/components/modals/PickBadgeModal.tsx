import { useMemo, useContext } from "react";
import PixelLockAltSolid from "~icons/pixel/lock-alt-solid";

import { BADGE_COUNT } from "~/lib/constants";
import { setBadge } from "~/lib/game";
import { clickSfx } from "~/lib/sounds";

import { ModalContext } from "~/components/modals/Modal";
import ConfirmModal from "~/components/modals/ConfirmModal";

const rowStyle = {
  display: "flex",
  flexDirection: "row" as "row",
  alignItems: "center",
  gap: "0.5em",
};

const imgStyle = {
  width: "2em",
  height: "auto",
};

type Props = {
  player: Player;
  [key: string]: any;
};

export default function PickBadgeModal({ player, ...props }: Props) {
  const { setOpen } = useContext(ModalContext);
  const items = useMemo(() => {
    const items = [];
    for (let i = 0; i < BADGE_COUNT; i++) {
      const unlocked =
        player.lvl >= 100 || Math.floor(i / 5) * 10 <= player.lvl;
      const onClick = () => {
        if (!unlocked) return;
        clickSfx.play();
        setBadge(i);
        setOpen(false);
      };
      const n = i + 1;
      const opacity = unlocked ? undefined : "50%";
      const cursor = unlocked ? "pointer" : "not-allowed";
      items.push(
        <div style={{ ...rowStyle, cursor, opacity }} onClick={onClick}>
          <img style={{ ...imgStyle, cursor }} src={`./badges/${i}.png`} />
          {unlocked ? (
            <div style={{ cursor }}>#0{n < 10 ? "0" + n : n}</div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.2em",
                cursor,
              }}
            >
              <PixelLockAltSolid style={{ width: "1em" }} />
              <span>lvl {i >= 55 ? 100 : Math.floor(i / 5) * 10}</span>
            </div>
          )}
        </div>,
      );
    }
    return items;
  }, [player, setOpen]);

  return (
    <ConfirmModal buttonText={"Cancel"} {...props}>
      <div style={{ textAlign: "center" }} tabIndex={0}>
        <div style={{ marginBottom: "1em" }}>
          SELECT BADGE
          <hr />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          {items}
        </div>
      </div>
    </ConfirmModal>
  );
}
