# FT5D - Controller CPS by HamTech M0FXB

An independent browser-based FT5D programming workspace with a real Yaesu product photograph, interactive local VFO display and read-only radio-file inspection.

**Development version: actual SCU-19 radio read/write is not implemented. This is not a complete CPS or a live radio remote controller.**

## Run

No installation or build is required. Extract the ZIP and open `index.html` in your browser. Keep all files and the `assets` directory together.

For a local web server, if Python is installed:

```sh
python -m http.server 8000
```

Then open http://localhost:8000. Serial port selection requires a compatible desktop browser (such as Chrome or Edge) and a secure context, normally HTTPS or localhost. The selector identifies a device only; it does not open its port or transfer radio data.

## Included features

- Official FT5D photograph with an overlaid, changing local frequency display.
- Resizable radio, A/B selection, single/dual draft display and tuning steps.
- Draft memory creation, editing, deletion and recall to the local display.
- Local JSON project import/export and generic memory CSV export.
- Draft settings and Bluetooth, GPS, APRS and broadcast shortcuts.
- Read-only file inspection for recognised ADMS-14 `.ft5d` byte-array layouts and selected FT5D SD-card layouts.
- Decoded channel number, name, RX/TX frequency, mode, step, repeater shift, squelch type, CTCSS, DCS, power, narrow setting, skip code and bank membership.
- Download of the unchanged original file and CSV of decoded channels.
- Copy of basic channel details into an editable local draft.

## Current limitations

- No SCU-19 cloning, programming, radio data transfer or live tuning.
- No edited binary `.ft5d` / `.dat` export; JSON and CSV are not radio programming files.
- No complete FT5D settings coverage or live Bluetooth/GPS/APRS control.
- GPS display has no radio telemetry. No audio features are included.
- Supported file sizes and structural checks do not prove compatibility with every firmware or regional variant.
- A real ADMS-14 1.0.1.0 sample contained a 130,752-byte AH82M image. Its trailer did not match the simple additive checksum candidate. This is reported as unresolved, not treated as a valid transfer checksum.
- Copying decoded channels into the draft retains only channel number, name, frequency and basic mode. Digital DN/VW map to the draft's C4FM mode; other unsupported modes map to FM. The original decoded file remains unchanged.

Radio files are processed in memory in the browser; the app does not upload them. Drafts use browser local storage. Export a JSON project to keep a separate copy. Do not commit personal radio backups or configuration files to a public repository.

## Share on GitHub

1. Create an empty repository on GitHub.
2. Extract this ZIP and upload the **contents** of `FT5D-Controller-CPS` to the repository root. Include `.gitignore` and `.nojekyll` when using Git.
3. Commit the files.
4. To host the interface, open **Settings → Pages**, choose **Deploy from a branch**, select your branch (usually `main`) and **/(root)**, then save.

There are no dependencies, secrets or build steps. GitHub Pages provides HTTPS, although browser/OS restrictions may still prevent serial port selection.

## Tests

With Node.js installed:

```sh
node tests/radio-file.test.cjs
```

The tests cover malformed files, byte-array bounds/model identification, sparse channel numbering, frequency decoding, checksum reporting and preservation of original bytes. The optional private-sample test is specific to the file used during development; that sample is not included.

Browser interaction and actual radio transfers have not been hardware-tested.

## Development work still required

Before enabling write operations, verify the current FT5D wire protocol and image layout against an original radio-generated backup; implement model/variant matching, checksum validation, transfer timeouts and error handling; then test reads and writes with an FT5D and SCU-19. Remote-control functions must be checked separately from clone programming.

## Credits and licence

Application code is provided under the MIT licence in `LICENSE`. Yaesu's photograph and trademarks are excluded from that licence; see `THIRD_PARTY_NOTICES.md`.

Independent software; not affiliated with or endorsed by Yaesu.
