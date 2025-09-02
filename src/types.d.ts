declare type Payload = { uid: string } & {
  status: Status;
};

declare interface Status {
  lastPlayed: number;
  name: string;
  lvl: number;
  xp: number;
  today: number;
  record: number;
  streak: number;
  month: number;
  badge: number;
}

declare type Player = Status & { totalXp: number };

declare interface Score {
  pos: number;
  name: string;
  lvl: number;
  streak: number;
  score: number;
  badge: number;
  isMe: boolean;
}

declare type WorkoutType =
  | "push-ups"
  | "pull-ups"
  | "muscle-ups"
  | "abs"
  | "squats"
  | "dips"
  | "curls"
  | "rows"
  | "inverted rows"
  | "jumps"
  | "plank"
  | "hollow hold"
  | "stretching"
  | "walking"
  | "jogging"
  | "cycling";

declare interface Backup {
  version: number;
  status: Status;
}
