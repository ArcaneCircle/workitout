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
  | "chin-ups"
  | "muscle-ups"
  | "reverse muscle-ups"
  | "sit-ups"
  | "curl-ups"
  | "bicycle crunches"
  | "hanging knee raises"
  | "leg raises"
  | "squats"
  | "squat thrusts"
  | "burpees"
  | "calf raises"
  | "lunges"
  | "dips"
  | "bicep curls"
  | "rows"
  | "inverted rows"
  | "jumps"
  | "box jumps"
  | "jumping jacks"
  | "plank"
  | "side plank"
  | "hollow hold"
  | "superman hold"
  | "stretching"
  | "handstand"
  | "L-sit"
  | "walking"
  | "jogging"
  | "cycling";

declare interface Backup {
  version: number;
  status: Status;
}
