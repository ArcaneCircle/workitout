import { useState, useCallback } from "react";
import PixelFireSolid from "~icons/pixel/fire-solid";
import PixelFlagCheckeredSolid from "~icons/pixel/flag-checkered-solid";
import PixelSeedlingsSolid from "~icons/pixel/seedlings-solid";
import PixelTrophySolid from "~icons/pixel/trophy-solid";

import { MAIN_COLOR, XP_COLOR, GOAL_COLOR } from "~/lib/constants";

import { ModalContext } from "~/components/modals/Modal";
import WorkoutModal from "~/components/modals/WorkoutModal";
import PickBadgeModal from "~/components/modals/PickBadgeModal";
import PixelatedProgressBar from "~/components/PixelatedProgressBar";
import StatSection from "~/components/StatSection";
import MenuButton from "~/components/MenuButton";

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const card = {
  display: "flex",
  flexDirection: "column" as "column",
  padding: "10px",
  background: "#f0f0f0",
};

const rowStyle = {
  display: "flex",
  flexDirection: "row" as "row",
  justifyContent: "space-between",
  gap: "0.2em",
};

interface Props {
  player: Player;
  scores: Score[];
}

export default function Home({ player, scores }: Props) {
  const [modal, setModal] = useState(null as "play" | "badge" | null);
  const streakColor = player.today ? MAIN_COLOR : "#959595";
  const streakSize = player.streak > 999 ? "0.9em" : undefined;

  const onBadgeClicked = useCallback(() => setModal("badge"), []);
  const onPlay = useCallback(() => setModal("play"), []);
  const setOpen = useCallback(
    (show: boolean) => (show ? setModal(modal) : setModal(null)),
    [modal],
  );

  const trophy = (
    <PixelTrophySolid style={{ verticalAlign: "middle", color: GOAL_COLOR }} />
  );
  const month = months[new Date().getMonth()];

  return (
    <>
      <ModalContext.Provider value={{ isOpen: !!modal, setOpen }}>
        {modal === "play" ? (
          <WorkoutModal style={{ minWidth: "60vw" }} />
        ) : modal === "badge" ? (
          <PickBadgeModal player={player} style={{ minWidth: "60vw" }} />
        ) : null}
      </ModalContext.Provider>

      <div style={{ padding: "0.5em" }}>
        <div className="pixel-corners" style={{ ...card, marginBottom: "1em" }}>
          <div
            style={{
              ...rowStyle,
              alignItems: "baseline",
              marginBottom: "0.5em",
            }}
          >
            <StatSection title={"LVL"} number={player.lvl} />
            <StatSection
              title={""}
              number={player.streak}
              numberSize={streakSize}
              numberColor={streakColor}
              unit={player.streak === 1 ? "day" : "days"}
              icon={<PixelFireSolid style={{ color: streakColor }} />}
            />
          </div>
          <div style={{ ...rowStyle }}>
            <img
              style={{
                cursor: "pointer",
                flexShrink: "0",
                height: "2.8em",
                width: "auto",
              }}
              src={`./badges/${player.badge}.png`}
              onClick={onBadgeClicked}
            />
            <div style={{ flexGrow: 1 }}>
              <div style={{ ...rowStyle, paddingBottom: "0.5em" }}>
                <PixelatedProgressBar
                  progress={player.totalXp ? player.xp : 100}
                  total={player.totalXp || 100}
                  color={XP_COLOR}
                  label={
                    player.totalXp ? `${player.xp}/${player.totalXp}` : "MAX"
                  }
                  style={{ flexGrow: 1, background: "#d9d9d9" }}
                />
                <PixelSeedlingsSolid />
              </div>

              <div style={rowStyle}>
                <PixelatedProgressBar
                  progress={player.today}
                  total={player.record}
                  color={GOAL_COLOR}
                  label={`${player.today}/${player.record}`}
                  style={{ flexGrow: 1, background: "#d9d9d9" }}
                />
                <PixelFlagCheckeredSolid />
              </div>
            </div>
          </div>

          <MenuButton
            style={{
              fontSize: "1.2em",
              color: "white",
              background: MAIN_COLOR,
              padding: "0.5em 0.5em",
              marginTop: "1em",
              textShadow: "1px 1px 1px black",
            }}
            onClick={onPlay}
          >
            <img
              src="./icon.png"
              style={{ height: "1em", width: "auto", verticalAlign: "middle" }}
            />{" "}
            Workout
          </MenuButton>
        </div>

        <div style={{ color: "white" }}>
          <div style={{ textAlign: "center" }}>
            {trophy} {month} RANKING {trophy}
            <hr style={{ color: "white" }} />
          </div>
          {scores.length ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2em",
              }}
            >
              {scores.map((score) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                    gap: "0.5em",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.2em",
                      textWrap: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        color: GOAL_COLOR,
                        alignSelf: "end",
                        flexShrink: "0",
                        minWidth: "0.6em",
                      }}
                    >
                      {score.pos}.
                    </span>
                    <img
                      style={{ height: "2.2em", alignSelf: "center" }}
                      src={`./badges/${score.badge}.png`}
                    />
                    <div
                      style={{
                        ...rowStyle,
                        flexDirection: "column",
                        gap: "0",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {score.name}
                      </span>
                      <span style={{ opacity: "70%" }}>lvl.{score.lvl}</span>
                    </div>
                  </div>

                  <span
                    style={{
                      color: GOAL_COLOR,
                      alignSelf: "center",
                      flexShrink: "0",
                    }}
                  >
                    {score.score}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center" }}>No entries yet. Be the first!</p>
          )}
        </div>
      </div>
    </>
  );
}
