# companion-module-roland-v1-4k

Bitfocus Companion module for the Roland V-1-4K Streaming Video Switcher.

## Features

- PGM/PST source selection (HDMI 1-5, STILL 1-2, INPUT 1-8)
- AUTO/CUT transitions with configurable time
- Transition type (MIX/WIPE) control
- PinP & Key control
- DSK control
- Split mode control
- ROI (Region of Interest) control
- Output Fade (FTB)
- Audio input/output level and mute control
- Scene Memory load (1-8)
- PTZ Camera control (Camera 1-5)
- Auto Switching control
- Tally feedback
- Video Fader control

## Configuration

1. Set the IP address of the V-1-4K
2. Set the network password configured on the V-1-4K
3. Default TCP port is 8023

## Protocol

Uses LAN simple control commands over TCP (Telnet-style on port 8023).

See [HELP.md](HELP.md) and [LICENSE](LICENSE) for more information.
