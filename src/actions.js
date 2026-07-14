module.exports = {
	initActions: function () {
		let self = this

		let actions = {}

		// ── VIDEO: PGM / PST / Transition ──

		actions['select_pgm'] = {
			name: 'PGM Source Select',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'INPUT1',
					choices: self.CHOICES_INPUTS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`PGM:${event.options.source};`)
			},
		}

		actions['select_pst'] = {
			name: 'PST Source Select',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'INPUT1',
					choices: self.CHOICES_INPUTS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`PST:${event.options.source};`)
			},
		}

		actions['select_pvw'] = {
			name: 'PVW Source Select',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'INPUT1',
					choices: self.CHOICES_INPUTS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`PST:${event.options.source};`)
			},
		}

		actions['auto_take'] = {
			name: 'AUTO Transition',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('ATO;')
			},
		}

		actions['auto_take_source'] = {
			name: 'AUTO Transition (with source)',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'INPUT1',
					choices: self.CHOICES_INPUTS,
				},
				{
					type: 'number',
					label: 'Transition Time (0.1sec units, -1=use setting)',
					id: 'time',
					default: -1,
					min: -1,
					max: 40,
				},
			],
			callback: async (event) => {
				if (event.options.time === -1) {
					self.sendSimpleCommand(`ATO:${event.options.source};`)
				} else {
					self.sendSimpleCommand(`ATO:${event.options.source},${event.options.time};`)
				}
			},
		}

		actions['cut'] = {
			name: 'CUT Transition',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('CUT;')
			},
		}

		actions['cut_source'] = {
			name: 'CUT Transition (with source)',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'INPUT1',
					choices: self.CHOICES_INPUTS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CUT:${event.options.source};`)
			},
		}

		// ── VIDEO FADER ──

		actions['set_video_fader'] = {
			name: 'Video Fader Level',
			options: [
				{
					type: 'number',
					label: 'Fader Level (0-4095)',
					id: 'level',
					default: 0,
					min: 0,
					max: 4095,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`VFL:${event.options.level};`)
			},
		}

		// ── TRANSITION TYPE / TIME ──

		actions['set_transition_type'] = {
			name: 'Transition Type (MIX/WIPE)',
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'type',
					default: 'MIX',
					choices: self.CHOICES_TRANSITION_TYPES,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`TRS:${event.options.type};`)
			},
		}

		actions['set_transition_time'] = {
			name: 'Transition Time',
			options: [
				{
					type: 'dropdown',
					label: 'Target',
					id: 'target',
					default: 'MIX',
					choices: self.CHOICES_TRANSITION_TIME_TARGETS,
				},
				{
					type: 'number',
					label: 'Time (0.1sec units, 0-40 = 0.0-4.0sec)',
					id: 'time',
					default: 10,
					min: 0,
					max: 40,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`TIM:${event.options.target},${event.options.time};`)
			},
		}

		// ── OUTPUT FADE (FTB) ──

		actions['output_fade_toggle'] = {
			name: 'Output Fade Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('FTB;')
			},
		}

		actions['output_fade_set'] = {
			name: 'Output Fade Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`FTB:${event.options.state};`)
			},
		}

		// ── INPUT ASSIGN ──

		actions['input_assign'] = {
			name: 'Input Assign',
			options: [
				{
					type: 'dropdown',
					label: 'Input Channel',
					id: 'input',
					default: 'INPUT1',
					choices: [
						{ id: 'INPUT1', label: 'INPUT 1' },
						{ id: 'INPUT2', label: 'INPUT 2' },
						{ id: 'INPUT3', label: 'INPUT 3' },
						{ id: 'INPUT4', label: 'INPUT 4' },
						{ id: 'INPUT5', label: 'INPUT 5' },
						{ id: 'INPUT6', label: 'INPUT 6' },
						{ id: 'INPUT7', label: 'INPUT 7' },
						{ id: 'INPUT8', label: 'INPUT 8' },
					],
				},
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'HDMI',
					choices: self.CHOICES_INPUT_ASSIGN_SOURCES,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`VIS:${event.options.input},${event.options.source};`)
			},
		}

		// ── OUTPUT ASSIGN ──

		actions['output_assign'] = {
			name: 'Output Assign',
			options: [
				{
					type: 'dropdown',
					label: 'Output Port',
					id: 'port',
					default: 'HDMI3',
					choices: self.CHOICES_OUTPUT_PORTS,
				},
				{
					type: 'dropdown',
					label: 'Assign',
					id: 'assign',
					default: 'PGM',
					choices: self.CHOICES_OUTPUT_ASSIGN,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`VOS:${event.options.port},${event.options.assign};`)
			},
		}

		// ── PinP ──

		actions['pinp_pgm_toggle'] = {
			name: 'PinP PGM Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('PPS:PinP1;')
			},
		}

		actions['pinp_pgm_set'] = {
			name: 'PinP PGM Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`PPS:PinP1,${event.options.state};`)
			},
		}

		actions['pinp_pvw_toggle'] = {
			name: 'PinP PVW Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('PPW:PinP1;')
			},
		}

		actions['pinp_pvw_set'] = {
			name: 'PinP PVW Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`PPW:PinP1,${event.options.state};`)
			},
		}

		actions['pinp_position'] = {
			name: 'PinP Position',
			options: [
				{
					type: 'number',
					label: 'Position H (-500 to 500 = -50.0% to 50.0%)',
					id: 'h',
					default: 0,
					min: -500,
					max: 500,
				},
				{
					type: 'number',
					label: 'Position V (-500 to 500 = -50.0% to 50.0%)',
					id: 'v',
					default: 0,
					min: -500,
					max: 500,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`PIP:PinP1,${event.options.h},${event.options.v};`)
			},
		}

		// ── DSK ──

		actions['dsk_pgm_toggle'] = {
			name: 'DSK PGM Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('DSK:DSK1;')
			},
		}

		actions['dsk_pgm_set'] = {
			name: 'DSK PGM Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`DSK:DSK1,${event.options.state};`)
			},
		}

		actions['dsk_pvw_toggle'] = {
			name: 'DSK PVW Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('DVW:DSK1;')
			},
		}

		actions['dsk_pvw_set'] = {
			name: 'DSK PVW Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`DVW:DSK1,${event.options.state};`)
			},
		}

		actions['dsk_source'] = {
			name: 'DSK Fill Source',
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'HDMI1',
					choices: self.CHOICES_DSK_SOURCES,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`DSS:DSK1,${event.options.source};`)
			},
		}

		actions['dsk_level'] = {
			name: 'DSK Level',
			options: [
				{
					type: 'number',
					label: 'Level (0-255)',
					id: 'level',
					default: 128,
					min: 0,
					max: 255,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`KYL:DSK1,${event.options.level};`)
			},
		}

		actions['dsk_gain'] = {
			name: 'DSK Gain',
			options: [
				{
					type: 'number',
					label: 'Gain (0-255)',
					id: 'gain',
					default: 128,
					min: 0,
					max: 255,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`KYG:DSK1,${event.options.gain};`)
			},
		}

		// ── SPLIT ──

		actions['split_toggle'] = {
			name: 'SPLIT Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('SPS:SPLIT1;')
			},
		}

		actions['split_set'] = {
			name: 'SPLIT Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`SPS:SPLIT1,${event.options.state};`)
			},
		}

		actions['split_position'] = {
			name: 'SPLIT Position',
			options: [
				{
					type: 'number',
					label: 'PGM/A Center (-500 to 500)',
					id: 'pgm',
					default: 0,
					min: -500,
					max: 500,
				},
				{
					type: 'number',
					label: 'PST/B Center (-500 to 500)',
					id: 'pst',
					default: 0,
					min: -500,
					max: 500,
				},
				{
					type: 'number',
					label: 'Center Position (-500 to 500)',
					id: 'center',
					default: 0,
					min: -500,
					max: 500,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`SPT:SPLIT1,${event.options.pgm},${event.options.pst},${event.options.center};`)
			},
		}

		// ── ROI (V-1-4K specific) ──

		actions['roi_mode'] = {
			name: 'ROI Mode',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`ROISW:${event.options.state};`)
			},
		}

		actions['roi_zoom'] = {
			name: 'ROI Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'ROI',
					id: 'roi',
					default: 'ROI1',
					choices: self.CHOICES_ROI,
				},
				{
					type: 'number',
					label: 'Zoom (1000-4000 = 100.0%-400.0%)',
					id: 'zoom',
					default: 1000,
					min: 1000,
					max: 4000,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`ROIZM:${event.options.roi},${event.options.zoom};`)
			},
		}

		actions['roi_position'] = {
			name: 'ROI Position',
			options: [
				{
					type: 'dropdown',
					label: 'ROI',
					id: 'roi',
					default: 'ROI1',
					choices: self.CHOICES_ROI,
				},
				{
					type: 'number',
					label: 'Position H (-1920 to 1920)',
					id: 'h',
					default: 0,
					min: -1920,
					max: 1920,
				},
				{
					type: 'number',
					label: 'Position V (-1080 to 1080)',
					id: 'v',
					default: 0,
					min: -1080,
					max: 1080,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`ROIPT:${event.options.roi},${event.options.h},${event.options.v};`)
			},
		}

		// ── SCENE MEMORY ──

		actions['load_memory'] = {
			name: 'Load Scene Memory',
			options: [
				{
					type: 'dropdown',
					label: 'Memory',
					id: 'memory',
					default: 'MEMORY1',
					choices: self.CHOICES_MEMORIES,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`MEM:${event.options.memory};`)
			},
		}

		// ── AUTO SWITCHING ──

		actions['auto_switching_toggle'] = {
			name: 'Auto Switching Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('ASW;')
			},
		}

		actions['auto_switching_set'] = {
			name: 'Auto Switching Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`ASW:${event.options.state};`)
			},
		}

		actions['input_scan'] = {
			name: 'Input Scan',
			options: [
				{
					type: 'dropdown',
					label: 'Sequence',
					id: 'sequence',
					default: 'NORMAL',
					choices: self.CHOICES_SCAN_SEQUENCE,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`INSC:${event.options.sequence};`)
			},
		}

		// ── AUDIO INPUT ──

		actions['audio_input_level'] = {
			name: 'Audio Input Level',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
				{
					type: 'number',
					label: 'Level (-800 to 100 = -80.0 to 10.0dB, or -801 for -INF)',
					id: 'level',
					default: 0,
					min: -801,
					max: 100,
				},
			],
			callback: async (event) => {
				let levelStr = event.options.level <= -801 ? '-INF' : event.options.level.toString()
				self.sendSimpleCommand(`IAL:${event.options.input},${levelStr};`)
			},
		}

		actions['audio_input_mute_toggle'] = {
			name: 'Audio Input Mute Toggle',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`IAM:${event.options.input};`)
			},
		}

		actions['audio_input_mute_set'] = {
			name: 'Audio Input Mute Set',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`IAM:${event.options.input},${event.options.state};`)
			},
		}

		actions['audio_input_solo_toggle'] = {
			name: 'Audio Input Solo Toggle',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`IAS:${event.options.input};`)
			},
		}

		actions['audio_input_hpf'] = {
			name: 'Audio Input HPF',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`HPF:${event.options.input},${event.options.state};`)
			},
		}

		actions['audio_input_gate'] = {
			name: 'Audio Input Gate',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`GATE:${event.options.input},${event.options.state};`)
			},
		}

		actions['audio_input_delay'] = {
			name: 'Audio Input Delay Time',
			options: [
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: 'XLR1',
					choices: self.CHOICES_AUDIO_INPUTS,
				},
				{
					type: 'number',
					label: 'Delay (0-5000 = 0.0-500.0ms)',
					id: 'delay',
					default: 0,
					min: 0,
					max: 5000,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`ADT:${event.options.input},${event.options.delay};`)
			},
		}

		// ── AUDIO OUTPUT ──

		actions['audio_output_level'] = {
			name: 'Audio Output Level',
			options: [
				{
					type: 'dropdown',
					label: 'Output Bus',
					id: 'output',
					default: 'MAIN',
					choices: self.CHOICES_AUDIO_OUTPUT_BUSES,
				},
				{
					type: 'number',
					label: 'Level (-800 to 100 = -80.0 to 10.0dB, or -801 for -INF)',
					id: 'level',
					default: 0,
					min: -801,
					max: 100,
				},
			],
			callback: async (event) => {
				let levelStr = event.options.level <= -801 ? '-INF' : event.options.level.toString()
				self.sendSimpleCommand(`OAL:${event.options.output},${levelStr};`)
			},
		}

		actions['audio_output_mute'] = {
			name: 'Audio Output Mute',
			options: [
				{
					type: 'dropdown',
					label: 'Output Bus',
					id: 'output',
					default: 'MAIN',
					choices: self.CHOICES_AUDIO_OUTPUT_BUSES,
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`OAM:${event.options.output},${event.options.state};`)
			},
		}

		actions['audio_output_assign'] = {
			name: 'Audio Output Assign',
			options: [
				{
					type: 'dropdown',
					label: 'Output Port',
					id: 'port',
					default: 'HDMI1',
					choices: self.CHOICES_AUDIO_OUTPUT_PORTS,
				},
				{
					type: 'dropdown',
					label: 'Assign',
					id: 'assign',
					default: 'MAIN',
					choices: self.CHOICES_AUDIO_OUTPUT_ASSIGN,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`AOS:${event.options.port},${event.options.assign};`)
			},
		}

		// ── AUDIO AUTO MIXING ──

		actions['auto_mixing_toggle'] = {
			name: 'Auto Mixing Toggle',
			options: [],
			callback: async () => {
				self.sendSimpleCommand('ATM;')
			},
		}

		actions['auto_mixing_set'] = {
			name: 'Auto Mixing Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`ATM:${event.options.state};`)
			},
		}

		// ── CAMERA CONTROL ──

		actions['camera_pt'] = {
			name: 'Camera Pan/Tilt',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'dropdown',
					label: 'Pan',
					id: 'pan',
					default: 'STOP',
					choices: [
						{ id: 'LEFT', label: 'Left' },
						{ id: 'STOP', label: 'Stop' },
						{ id: 'RIGHT', label: 'Right' },
					],
				},
				{
					type: 'dropdown',
					label: 'Tilt',
					id: 'tilt',
					default: 'STOP',
					choices: [
						{ id: 'DOWN', label: 'Down' },
						{ id: 'STOP', label: 'Stop' },
						{ id: 'UP', label: 'Up' },
					],
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMPT:${event.options.camera},${event.options.pan},${event.options.tilt};`)
			},
		}

		actions['camera_pt_speed'] = {
			name: 'Camera Pan/Tilt Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'number',
					label: 'Speed (1-24)',
					id: 'speed',
					default: 12,
					min: 1,
					max: 24,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMPTS:${event.options.camera},${event.options.speed};`)
			},
		}

		actions['camera_zoom'] = {
			name: 'Camera Zoom',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'dropdown',
					label: 'Zoom',
					id: 'zoom',
					default: 'STOP',
					choices: [
						{ id: 'WIDE_FAST', label: 'Wide (Fast)' },
						{ id: 'WIDE_SLOW', label: 'Wide (Slow)' },
						{ id: 'STOP', label: 'Stop' },
						{ id: 'TELE_SLOW', label: 'Tele (Slow)' },
						{ id: 'TELE_FAST', label: 'Tele (Fast)' },
					],
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMZM:${event.options.camera},${event.options.zoom};`)
			},
		}

		actions['camera_zoom_reset'] = {
			name: 'Camera Zoom Reset',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMZMR:${event.options.camera};`)
			},
		}

		actions['camera_focus'] = {
			name: 'Camera Focus',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'dropdown',
					label: 'Focus',
					id: 'focus',
					default: 'STOP',
					choices: [
						{ id: 'NEAR', label: 'Near' },
						{ id: 'STOP', label: 'Stop' },
						{ id: 'FAR', label: 'Far' },
					],
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMFC:${event.options.camera},${event.options.focus};`)
			},
		}

		actions['camera_auto_focus'] = {
			name: 'Camera Auto Focus',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMAFC:${event.options.camera},${event.options.state};`)
			},
		}

		actions['camera_auto_exposure'] = {
			name: 'Camera Auto Exposure',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMAEP:${event.options.camera},${event.options.state};`)
			},
		}

		actions['camera_preset_recall'] = {
			name: 'Camera Preset Recall',
			options: [
				{
					type: 'dropdown',
					label: 'Camera',
					id: 'camera',
					default: 'CAMERA1',
					choices: self.CHOICES_CAMERAS,
				},
				{
					type: 'number',
					label: 'Preset (1-100)',
					id: 'preset',
					default: 1,
					min: 1,
					max: 100,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`CAMPR:${event.options.camera},PRESET${event.options.preset};`)
			},
		}

		// ── STILL CAPTURE ──

		actions['capture_still'] = {
			name: 'Capture Still Image',
			description: 'Capture a still image from an HDMI input and store it',
			options: [
				{
					type: 'dropdown',
					label: 'Capture Source',
					id: 'source',
					default: '00',
					choices: [
						{ id: '00', label: 'HDMI IN 1' },
						{ id: '01', label: 'HDMI IN 2' },
						{ id: '02', label: 'HDMI IN 3' },
						{ id: '03', label: 'HDMI IN 4' },
						{ id: '04', label: 'HDMI IN 5' },
					],
				},
				{
					type: 'dropdown',
					label: 'Target Storage',
					id: 'target',
					default: '00',
					choices: [
						{ id: '00', label: 'STILL 1' },
						{ id: '01', label: 'STILL 2' },
					],
				},
			],
			callback: async (event) => {
				self.sendCommand('0A0500', event.options.source)
				self.sendCommand('0A0501', event.options.target)
				setTimeout(() => {
					self.sendCommand('0A0502', '01')
				}, 100)
			},
		}

		actions['delete_still'] = {
			name: 'Delete Still Image',
			description: 'Delete a still image from storage',
			options: [
				{
					type: 'dropdown',
					label: 'Target',
					id: 'target',
					default: '00',
					choices: [
						{ id: '7F', label: 'ALL' },
						{ id: '00', label: 'STILL 1' },
						{ id: '01', label: 'STILL 2' },
					],
				},
			],
			callback: async (event) => {
				self.sendCommand('0A0505', event.options.target)
				setTimeout(() => {
					self.sendCommand('0A0503', '01')
				}, 100)
			},
		}

		// ── SYSTEM ──

		actions['hdcp_set'] = {
			name: 'HDCP Set',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 'ON',
					choices: self.CHOICES_ONOFF,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`HDCP:${event.options.state};`)
			},
		}

		actions['test_pattern'] = {
			name: 'Test Pattern',
			options: [
				{
					type: 'dropdown',
					label: 'Pattern',
					id: 'pattern',
					default: 'OFF',
					choices: self.CHOICES_TEST_PATTERN,
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`TPT:${event.options.pattern};`)
			},
		}

		actions['test_tone'] = {
			name: 'Test Tone',
			options: [
				{
					type: 'dropdown',
					label: 'Level',
					id: 'level',
					default: 'OFF',
					choices: [
						{ id: 'OFF', label: 'OFF' },
						{ id: '-20', label: '-20dB' },
						{ id: '-10', label: '-10dB' },
						{ id: '0dB', label: '0dB' },
					],
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(`TTN:${event.options.level};`)
			},
		}

		// ── CUSTOM COMMAND ──

		actions['custom_command'] = {
			name: 'Send Custom Command',
			options: [
				{
					type: 'textinput',
					label: 'Command (e.g. PGM:HDMI1;)',
					id: 'command',
					default: '',
				},
			],
			callback: async (event) => {
				self.sendSimpleCommand(event.options.command)
			},
		}

		self.setActionDefinitions(actions)
	},
}
