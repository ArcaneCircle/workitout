export function getMaxSerial(): number {
  return parseInt(localStorage.maxSerial || "0");
}

export function setMaxSerial(maxSerial: number) {
  localStorage.maxSerial = maxSerial;
}

export function getStatus(uid: string): Status {
  const status = localStorage[uid + ".status"];
  return status
    ? JSON.parse(status)
    : {
        name: window.webxdc.selfName,
        lvl: 1,
        xp: 0,
        today: 0,
        record: 100,
        streak: 0,
        lastPlayed: 0,
        month: 0,
        badge: 0,
      };
}

export function setStatus(uid: string, status: Status) {
  localStorage[uid + ".status"] = JSON.stringify(status);
  const uids = getUids();
  if (uids.indexOf(uid) === -1) {
    uids.push(uid);
    setUids(uids);
  }
}

export function getScoreboard(): Score[] {
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = new Date(today).setDate(new Date(today).getDate() - 1);
  const date = new Date(today);
  let scores = [];
  for (const uid of getUids()) {
    const status = getStatus(uid);
    const lastPlayed = new Date(status.lastPlayed);

    if (
      date.getFullYear() !== lastPlayed.getFullYear() ||
      date.getMonth() !== lastPlayed.getMonth()
    ) {
      continue;
    }

    const score = {
      pos: 0,
      name: status.name,
      lvl: status.lvl,
      streak: status.lastPlayed < yesterday ? 0 : status.streak,
      score: status.month,
      badge: status.badge,
      isMe: uid === window.webxdc.selfAddr,
    };
    scores.push(score);
  }
  scores.sort((score1, score2) => score2.score - score1.score);
  for (let i = 0; i < scores.length; i++) {
    scores[i].pos = i + 1;
  }

  return scores;
}

function setUids(uids: string[]) {
  localStorage.uids = JSON.stringify(uids);
}
function getUids(): string[] {
  return JSON.parse(localStorage.uids || "[]");
}
