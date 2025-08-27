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
  | "abs"
  | "squats"
  | "dips"
  | "curls"
  | "jogging"
  | "jumps"
  | "cycling";
