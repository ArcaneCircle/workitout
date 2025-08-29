import { useMemo, useContext } from "react";
import PixelLockAltSolid from "~icons/pixel/lock-alt-solid";

import { BADGE_COUNT, GOLDEN_COLOR, GRAY_COLOR } from "~/lib/constants";
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
  width: "2.8em",
  height: "auto",
};

const labelStyle = {
  margin: "0.2em 0 0 0",
  border: "none",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor,
            opacity,
          }}
          onClick={onClick}
        >
          <img style={{ ...imgStyle, cursor }} src={`./badges/${i}.png`} />
          {unlocked ? (
            <div
              className="pixel-corners"
              style={{
                ...labelStyle,
                cursor,
                padding: "0 0.2em",
                background: player.badge === i ? GOLDEN_COLOR : GRAY_COLOR,
              }}
            >
              #0{n < 10 ? "0" + n : n}
            </div>
          ) : (
            <div
              style={{
                ...labelStyle,
                display: "flex",
                alignItems: "center",
                gap: "0.1em",
                cursor,
              }}
            >
              <PixelLockAltSolid width="0.7em" height="0.7em" />
              <span>lvl.{i >= 55 ? 100 : Math.floor(i / 5) * 10}</span>
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
        <div
          style={{ ...rowStyle, flexWrap: "wrap", justifyContent: "center" }}
        >
          {items}
        </div>
      </div>
    </ConfirmModal>
  );
}
