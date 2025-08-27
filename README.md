# <img src="./public/icon.png" width="32px"> WorkItOut

Motivate your group to move — log reps in-chat, share progress,
spark friendly challenges.

WorkItOut turns your chat into a live, motivating workout feed.
Instead of exercising alone, every push‑up, squat, or plank you
log appears for the whole group — celebrating progress, fueling
friendly competition, and building momentum together.

## Contributing

### Installing Dependencies

After cloning this repo, install dependencies:

```
pnpm i
```

### Checking code format

```
pnpm check
```

### Generate sentences

To generate the list of sentences from the raw .tsv data file:

```
pnpm generate
```

### Testing the app in the browser

To test your work in your browser (with hot reloading!) while developing:

```
pnpm start
```

### Building

To package the WebXDC file:

```
pnpm build
```

To package the WebXDC with developer tools inside to debug in Delta Chat, set the `NODE_ENV`
environment variable to "debug":

```
NODE_ENV=debug pnpm build
```

The resulting optimized `.xdc` file is saved in `dist-xdc/` folder.

### Releasing

To automatically build and create a new GitHub release with the `.xdc` file:

```
git tag -a v1.0.1
git push origin v1.0.1
```

### Credits

- UI Icons from "Pixel Icon" by [HackerNoon](https://github.com/hackernoon/pixel-icon-library) ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))

- Badges from https://opengameart.org/content/m-tokens-minecraft-themed-icons (CC0 - public domain)

- Level-up SFX is "VictorySmall.wav" from https://opengameart.org/content/8-bit-sound-fx (CC0 - public domain)

- Click/select SFX is "vgmenuhighlight.ogg" from https://opengameart.org/content/8bit-menu-highlight (CC0 - public domain)
