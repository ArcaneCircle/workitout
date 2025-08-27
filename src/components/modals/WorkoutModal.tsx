import { useState, useCallback } from "react";

import { sendWorkout } from "~/lib/game";

import ConfirmModal from "~/components/modals/ConfirmModal";
import LevelUpModal from "~/components/modals/LevelUpModal";
import MenuPreference from "~/components/MenuPreference";

type Props = {
  [key: string]: any;
};

type ModalType =
  | { levelUp: number }
  | { selected: WorkoutType }
  | { workout: true };

export default function WorkoutModal(props: Props) {
  const [modal, setModal] = useState({ workout: true } as ModalType);

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
  const onPushUps = useCallback(
    () => setModal({ selected: "push-ups" }),
    [setModal],
  );
  const onPullUps = useCallback(
    () => setModal({ selected: "pull-ups" }),
    [setModal],
  );
  const onAbs = useCallback(() => setModal({ selected: "abs" }), [setModal]);
  const onSquats = useCallback(
    () => setModal({ selected: "squats" }),
    [setModal],
  );
  const onDips = useCallback(() => setModal({ selected: "dips" }), [setModal]);
  const onCurls = useCallback(
    () => setModal({ selected: "curls" }),
    [setModal],
  );
  const onJumps = useCallback(
    () => setModal({ selected: "jumps" }),
    [setModal],
  );
  const onJogging = useCallback(
    () => setModal({ selected: "jogging" }),
    [setModal],
  );
  const onCycling = useCallback(
    () => setModal({ selected: "cycling" }),
    [setModal],
  );

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        SELECT WORKOUT
        <hr />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        <MenuPreference name={"push-ups"} state="" onClick={onPushUps} />
        <MenuPreference name={"pull-ups"} state="" onClick={onPullUps} />
        <MenuPreference name={"abs"} state="" onClick={onAbs} />
        <MenuPreference name={"squats"} state="" onClick={onSquats} />
        <MenuPreference name={"dips"} state="" onClick={onDips} />
        <MenuPreference name={"curls"} state="" onClick={onCurls} />
        <MenuPreference name={"jumps"} state="" onClick={onJumps} />
        <MenuPreference name={"jogging"} state="" onClick={onJogging} />
        <MenuPreference name={"cycling"} state="" onClick={onCycling} />
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
  const select10 = useCallback(() => {
    const newLevel = sendWorkout(kind, 10);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);
  const select20 = useCallback(() => {
    const newLevel = sendWorkout(kind, 20);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);
  const select50 = useCallback(() => {
    const newLevel = sendWorkout(kind, 50);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);
  const select100 = useCallback(() => {
    const newLevel = sendWorkout(kind, 100);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);

  const select1km = useCallback(() => {
    const newLevel = sendWorkout(kind, kind === "jogging" ? 100 : 50);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);
  const select2km = useCallback(() => {
    const newLevel = sendWorkout(kind, kind === "jogging" ? 200 : 100);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);
  const select5km = useCallback(() => {
    const newLevel = sendWorkout(kind, kind === "jogging" ? 500 : 250);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);
  const select10km = useCallback(() => {
    const newLevel = sendWorkout(kind, kind === "jogging" ? 1000 : 500);
    if (newLevel) {
      setModal({ levelUp: newLevel });
    } else {
      setModal({ workout: true });
    }
  }, [kind, setModal]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        {kind.toUpperCase()}
        <hr />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
        {kind === "jogging" || kind === "cycling" ? (
          <>
            <MenuPreference name="1 km" state="" onClick={select1km} />
            <MenuPreference name="2 km" state="" onClick={select2km} />
            <MenuPreference name="5 km" state="" onClick={select5km} />
            <MenuPreference name="10 km" state="" onClick={select10km} />
          </>
        ) : (
          <>
            <MenuPreference name="x10" state="" onClick={select10} />
            <MenuPreference name="x20" state="" onClick={select20} />
            <MenuPreference name="x50" state="" onClick={select50} />
            <MenuPreference name="x100" state="" onClick={select100} />
          </>
        )}
      </div>
    </div>
  );
}
