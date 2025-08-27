// @ts-ignore
import { Howl } from "howler";

import VictorySmallURL from "@sfx/VictorySmall.mp3";
import vgmenuhighlightURL from "@sfx/vgmenuhighlight.mp3";

export const levelUpSfx = new Howl({
  src: [VictorySmallURL],
});

export const clickSfx = new Howl({
  src: [vgmenuhighlightURL],
});
