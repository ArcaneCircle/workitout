import { useState, useMemo } from "react";

import { initGame } from "~/lib/game";

import Home from "~/pages/Home";

// @ts-ignore
import "@fontsource/jersey-10";
import "./App.css";

export default function App() {
  const [player, setPlayer] = useState(null as Player | null);
  const [scores, setScores] = useState(null as Score[] | null);
  useMemo(() => initGame(setPlayer, setScores), []);

  return player && scores && <Home player={player} scores={scores} />;
}
