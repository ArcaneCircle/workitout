import { ReceivedStatusUpdate, SendingStatusUpdate } from "@webxdc/types";

import {
  MAX_LEVEL,
  MUSCLEUP_SCORE,
  JOGGING_SCORE,
  CYCLING_SCORE,
  WALKING_SCORE,
} from "~/lib/constants";
import {
  getStatus,
  setStatus,
  setMaxSerial,
  getMaxSerial,
  getScoreboard,
} from "~/lib/storage";

const VERSION = 1;
const state = {
  saved: true,
  leveledUp: false,
  workouts: new Map<WorkoutType, number>(),
  status: getStatus(window.webxdc.selfAddr),
};
let setPlayerState = null as ((player: Player) => void) | null;
let setBoardState = null as ((scores: Score[]) => void) | null;

export function getPlayer(): Player {
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = new Date(today).setDate(new Date(today).getDate() - 1);

  const status = state.status;
  if (status.lastPlayed < yesterday) status.streak = 0;
  if (status.lastPlayed < today) status.today = 0;
  const totalXp = status.lvl === MAX_LEVEL ? 0 : toNextLevelFast(status.lvl);
  return {
    ...status,
    totalXp,
  };
}

export function setBadge(badge: number) {
  state.status.badge = badge;
  if (state.saved) {
    const uid = window.webxdc.selfAddr;
    const update = {
      payload: {
        uid,
        status: state.status,
      },
    };
    window.webxdc.sendUpdate(update, "");
  } else {
    setPlayerState && setPlayerState(getPlayer());
    setStatus(window.webxdc.selfAddr, state.status);
    setBoardState && setBoardState(getScoreboard());
  }
}

export function sendWorkout(kind: WorkoutType, xp: number): number {
  const oldStatus = state.status;
  const { xp: newXp, level: newLevel } = increaseXp(oldStatus, xp);

  const status = {
    name: window.webxdc.selfName,
    lvl: newLevel,
    xp: newXp,
    today: oldStatus.today,
    record: oldStatus.record,
    streak: oldStatus.streak,
    lastPlayed: Date.now(),
    month: oldStatus.month,
    badge: oldStatus.badge,
  };
  const today = new Date(status.lastPlayed).setHours(0, 0, 0, 0);
  const lastDayPlayed = new Date(oldStatus.lastPlayed).setHours(0, 0, 0, 0);
  const date = new Date(today);
  const lastDate = new Date(lastDayPlayed);
  if (
    date.getFullYear() !== lastDate.getFullYear() ||
    date.getMonth() !== lastDate.getMonth()
  ) {
    status.month = xp; // different month, reset
  } else {
    status.month += xp; // same month, increase
  }

  if (lastDayPlayed < today) {
    status.today = xp; // different day, reset
    const yesterday = new Date(today).setDate(new Date(today).getDate() - 1);
    if (lastDayPlayed < yesterday) {
      status.streak = 1;
    } else {
      status.streak += 1;
    }
  } else {
    status.today += xp; // same day, increase
  }
  if (status.today > status.record) {
    status.record = status.today;
  }

  state.leveledUp = state.leveledUp || newLevel > oldStatus.lvl;
  state.workouts.set(kind, (state.workouts.get(kind) || 0) + xp);
  state.status = status;
  state.saved = false;

  setPlayerState && setPlayerState(getPlayer());
  setStatus(window.webxdc.selfAddr, status);
  setBoardState && setBoardState(getScoreboard());
  return newLevel > oldStatus.lvl ? newLevel : 0;
}

export async function initGame(
  playerHook: (player: Player) => void,
  boardHook: (scores: Score[]) => void,
) {
  await window.webxdc.setUpdateListener(processUpdate, getMaxSerial());
  window.addEventListener("visibilitychange", syncState);
  window.addEventListener("beforeunload", syncState);

  setPlayerState = playerHook;
  setBoardState = boardHook;
  setPlayerState(getPlayer());
  setBoardState(getScoreboard());
}

export function exportBackup(): Backup {
  return { version: VERSION, status: state.status };
}

export function importBackup(backup: Backup): boolean {
  if (isValidBackup(backup)) {
    const uid = window.webxdc.selfAddr;
    backup.status.name = window.webxdc.selfName;
    window.webxdc.sendUpdate(
      {
        payload: { uid, status: backup.status },
      },
      "",
    );
    return true;
  }
  return false;
}

function isValidBackup(backup: Backup) {
  return "status" in backup && "version" in backup && backup.version <= VERSION;
}

function syncState() {
  if (state.saved) return;

  const workouts = [];
  for (const [kind, xp] of state.workouts) {
    if (kind === "jogging") {
      workouts.push(`a ${xp / JOGGING_SCORE} km jog`);
    } else if (kind === "walking") {
      workouts.push(`a ${xp / WALKING_SCORE} km walk`);
    } else if (kind === "cycling") {
      workouts.push(`${xp / CYCLING_SCORE} km of cycling`);
    } else if (kind === "muscle-ups") {
      workouts.push(`${xp / MUSCLEUP_SCORE} ${kind}`);
    } else {
      workouts.push(`${xp} ${kind}`);
    }
  }
  let info = `${state.status.name} did ${workouts.join(", ")}`;
  if (state.leveledUp) {
    info += ` and reached level ${state.status.lvl} 🎉`;
  }

  const update = {
    payload: {
      uid: window.webxdc.selfAddr,
      status: state.status,
    },
    href: "index.html", // don't merge info messages
    info,
  } as SendingStatusUpdate<Payload>;

  window.webxdc.sendUpdate(update, "");
  state.saved = true;
}

function processUpdate(update: ReceivedStatusUpdate<Payload>) {
  const payload = update.payload;
  const uid = payload.uid;
  const fromSelf = uid === window.webxdc.selfAddr;
  if ("status" in payload) {
    const status = payload.status;
    const oldStatus = fromSelf ? state.status : getStatus(uid);
    if (status.lastPlayed >= oldStatus.lastPlayed) {
      setStatus(uid, status);
      if (fromSelf) {
        state.saved = true;
        state.leveledUp = false;
        state.workouts = new Map<WorkoutType, number>();
        state.status = status;
        setPlayerState && setPlayerState(getPlayer());
      }
      setBoardState && setBoardState(getScoreboard());
    }
  }

  if (update.serial === update.max_serial) setMaxSerial(update.serial);
}

function increaseXp(status: Status, xp: number): { xp: number; level: number } {
  xp += status.xp;
  let level = status.lvl;
  let totalXp = toNextLevelFast(level);
  while (xp >= totalXp) {
    xp -= totalXp;
    totalXp = toNextLevelFast(++level);
  }
  if (level >= MAX_LEVEL) {
    level = MAX_LEVEL;
    xp = 0;
  }
  return { level, xp };
}

function toNextLevelFast(level: number): number {
  const fastAlg = (lvl: number) => Math.floor((4 * lvl ** 3) / 5);
  if (level === 1) return 100;
  return (level < 25 ? 100 : 0) + (fastAlg(level + 1) - fastAlg(level));
}
