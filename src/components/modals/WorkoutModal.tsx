import { useState, useMemo } from "react";

import { sendWorkout } from "~/lib/game";
import { seconds2label } from "~/lib/util";

import ConfirmModal from "~/components/modals/ConfirmModal";
import LevelUpModal from "~/components/modals/LevelUpModal";
import MenuPreference from "~/components/MenuPreference";

const distanceBasedWorkouts: WorkoutType[] = ["jogging", "cycling", "walking"];
const timeBasedWorkouts: WorkoutType[] = [
  "plank",
  "hollow hold",
  "stretching",
  "handstand",
  "L-sit",
];
const workouts: WorkoutType[] = [
  "push-ups",
  "pull-ups",
  "chin-ups",
  "muscle-ups",
  "reverse muscle-ups",
  "sit-ups",
  "curl-ups",
  "bicycle crunches",
  "hanging knee raises",
  "leg raises",
  "squats",
  "squat thrusts",
  "burpees",
  "calf raises",
  "lunges",
  "dips",
  "bicep curls",
  "rows",
  "inverted rows",
  "jumps",
  "box jumps",
  "jumping jacks",
  "plank",
  "hollow hold",
  "handstand",
  "L-sit",
  "stretching",
  "walking",
  "jogging",
  "cycling",
];

const rowStyle = {
  display: "flex",
  flexDirection: "row" as "row",
  justifyContent: "space-between",
  gap: "0.4em",
};

type Props = {
  [key: string]: any;
};

type ModalType =
  | { levelUp: number }
  | { selected: WorkoutType }
  | { workout: true };

export default function WorkoutModal(props: Props) {
  const [modal, setModal] = useState<ModalType>({ workout: true });

  return "levelUp" in modal ? (
    <LevelUpModal level={modal.levelUp} {...props} />
  ) : (
    <ConfirmModal buttonText={"Cancel"} {...props}>
      {"selected" in modal ? (
        <QuantitySelectionModal kind={modal.selected} setModal={setModal} />
      ) : (
        <WorkoutSelectionModal setModal={setModal} />
      )}
    </ConfirmModal>
  );
}

function WorkoutSelectionModal({
  setModal,
}: {
  setModal: (modal: ModalType) => void;
}) {
  const items = useMemo(() => {
    return workouts.map((kind) => {
      const onClick = () => setModal({ selected: kind });
      return <MenuPreference name={kind} state="" onClick={onClick} />;
    });
  }, [setModal]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        SELECT WORKOUT
        <hr />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        {items}
      </div>
    </div>
  );
}

function QuantitySelectionModal({
  kind,
  setModal,
}: {
  kind: WorkoutType;
  setModal: (modal: ModalType) => void;
}) {
  const items = useMemo(() => {
    const distance = distanceBasedWorkouts.indexOf(kind) >= 0;
    const timeBased = timeBasedWorkouts.indexOf(kind) >= 0;
    return distance
      ? [1, 2, 5, 10, 20, 40].map((amount) => {
          const onClick = () => {
            const newLevel = sendWorkout(kind, amount);
            if (newLevel) {
              setModal({ levelUp: newLevel });
            } else {
              setModal({ workout: true });
            }
          };
          return (
            <MenuPreference
              style={{ textWrap: "nowrap" }}
              name={`${amount} km`}
              state=""
              onClick={onClick}
            />
          );
        })
      : timeBased
        ? [15, 30, 45, 60, 300, 600].map((amount) => {
            const onClick = () => {
              const newLevel = sendWorkout(kind, amount);
              if (newLevel) {
                setModal({ levelUp: newLevel });
              } else {
                setModal({ workout: true });
              }
            };
            return (
              <MenuPreference
                style={{ textWrap: "nowrap" }}
                name={seconds2label(amount)}
                state=""
                onClick={onClick}
              />
            );
          })
        : [1, 5, 10, 20, 50, 100].map((amount) => {
            const onClick = () => {
              const newLevel = sendWorkout(kind, amount);
              if (newLevel) {
                setModal({ levelUp: newLevel });
              } else {
                setModal({ workout: true });
              }
            };
            return (
              <MenuPreference name={`x${amount}`} state="" onClick={onClick} />
            );
          });
  }, [kind, setModal]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        {kind.toUpperCase()}
        <hr />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        <div style={rowStyle}>
          {items[0]}
          {items[1]}
        </div>
        <div style={rowStyle}>
          {items[2]}
          {items[3]}
        </div>
        <div style={rowStyle}>
          {items[4]}
          {items[5]}
        </div>
      </div>
    </div>
  );
}
