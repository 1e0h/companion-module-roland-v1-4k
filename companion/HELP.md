# Roland V-1-4K

This module controls the **Roland V-1-4K Streaming Video Switcher** over a LAN (TCP) connection.

## Configuration

| Setting | Description | Default |
|---|---|---|
| IP Address | The IP address of the V-1-4K | (required) |
| TCP Port | TCP port number | 8023 |
| Password | Network password configured on V-1-4K | (required) |
| Enable Polling | Periodically request device status | ON |
| Polling Rate | Polling interval in milliseconds | 1000 |
| Verbose Logging | Enable detailed debug logging | OFF |

### Network Setup on V-1-4K

1. Press **MENU** on the V-1-4K
2. Navigate to **NETWORK** → **LAN SETUP**
3. Set the IP address (or use DHCP)
4. Set the **NETWORK PASSWORD** (8 characters)
5. Connect via LAN CONTROL port (TCP port 8023)

## Available Actions

### Video
- **PGM/PST Source Select** – HDMI 1-5, STILL 1-2, INPUT 1-8
- **AUTO Transition** – with optional source and transition time
- **CUT Transition** – with optional source
- **Video Fader Level** – 0 to 4095
- **Transition Type** – MIX / WIPE
- **Transition Time** – per target (MIX, WIPE, DSK, Output Fade)
- **Input Assign** – assign HDMI/STILL/BLACK to INPUT channels
- **Output Assign** – HDMI OUT 3/4 to PGM, PVW, or INPUT 1-8

### PinP
- **PinP PGM/PVW Toggle/Set** – ON/OFF
- **PinP Position** – horizontal and vertical

### DSK
- **DSK PGM/PVW Toggle/Set** – ON/OFF
- **DSK Fill Source** – HDMI 1-5, STILL 1-2, INPUT 1-8
- **DSK Level / Gain** – 0 to 255

### SPLIT
- **SPLIT Toggle/Set** – ON/OFF
- **SPLIT Position** – PGM/A Center, PST/B Center, Center Position

### ROI (V-1-4K Specific)
- **ROI Mode** – ON/OFF
- **ROI Zoom** – 100.0% to 400.0% (ROI 1-4)
- **ROI Position** – H/V (ROI 1-4)

### Output Fade
- **Output Fade (FTB) Toggle/Set** – ON/OFF

### Still Capture
- **Capture Still Image** – from HDMI IN 1-5 to STILL 1-2
- **Delete Still Image** – STILL 1, STILL 2, or ALL

### Audio
- **Audio Input Level** – XLR1, USB, HDMI 1-5
- **Audio Input Mute/Solo** – toggle or set
- **Audio Input HPF / Gate / Delay**
- **Audio Output Level** – MAIN, AUX 1-2, USB
- **Audio Output Mute**
- **Audio Output Assign**
- **Auto Mixing** – toggle or set

### Scene Memory
- **Load Scene Memory** – MEMORY 1-8

### Camera Control
- **Pan/Tilt** – Camera 1-5, Left/Stop/Right, Down/Stop/Up
- **Pan/Tilt Speed** – 1 to 24
- **Zoom** – Wide Fast/Slow, Stop, Tele Slow/Fast
- **Zoom Reset**
- **Focus** – Near/Stop/Far
- **Auto Focus / Auto Exposure** – ON/OFF
- **Preset Recall** – Preset 1-100

### Auto Switching
- **Auto Switching Toggle/Set** – ON/OFF
- **Input Scan** – Normal, Reverse, Random

### System
- **HDCP** – ON/OFF
- **Test Pattern** – OFF / Color Bar
- **Test Tone** – OFF / -20dB / -10dB / 0dB
- **Custom Command** – send any raw command

## Feedbacks

- Tally state (PGM / PST / PGM+PST)
- PGM / PST source match
- PinP PGM/PVW on air
- DSK PGM/PVW on air
- Output Fade active
- SPLIT on
- ROI mode on
- Transition type (MIX/WIPE)
- Output assign
- Auto Switching on
- Auto Mixing on
- Auto Transition active
- Memory loaded

## Variables

- Model, Version
- PGM/PST source
- Video fader level
- Tally status per input
- PinP/DSK/SPLIT/ROI state
- Output assignments
- Memory names (1-8)
- Current/last memory
