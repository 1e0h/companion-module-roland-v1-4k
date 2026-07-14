const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets: function () {
		let self = this

		const presets = {}

		// PGM source buttons
		for (let i = 0; i < self.CHOICES_INPUTS.length; i++) {
			let input = self.CHOICES_INPUTS[i]
			presets[`pgm_${input.id}`] = {
				type: 'button',
				category: 'PGM Select',
				name: `PGM ${input.label}`,
				style: {
					text: `PGM\\n${input.label}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [{ actionId: 'select_pgm', options: { source: input.id } }],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'pgm_source',
						options: { source: input.id },
						style: {
							bgcolor: combineRgb(255, 0, 0),
							color: combineRgb(255, 255, 255),
						},
					},
				],
			}
		}

		// PST source buttons
		for (let i = 0; i < self.CHOICES_INPUTS.length; i++) {
			let input = self.CHOICES_INPUTS[i]
			presets[`pst_${input.id}`] = {
				type: 'button',
				category: 'PST Select',
				name: `PST ${input.label}`,
				style: {
					text: `PST\\n${input.label}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [{ actionId: 'select_pst', options: { source: input.id } }],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'pst_source',
						options: { source: input.id },
						style: {
							bgcolor: combineRgb(0, 255, 0),
							color: combineRgb(0, 0, 0),
						},
					},
				],
			}
		}

		// PVW source buttons
		for (let i = 0; i < self.CHOICES_INPUTS.length; i++) {
			let input = self.CHOICES_INPUTS[i]
			presets[`pvw_${input.id}`] = {
				type: 'button',
				category: 'PVW Select',
				name: `PVW ${input.label}`,
				style: {
					text: `PVW\\n${input.label}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [{ actionId: 'select_pvw', options: { source: input.id } }],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'pst_source',
						options: { source: input.id },
						style: {
							bgcolor: combineRgb(0, 255, 0),
							color: combineRgb(0, 0, 0),
						},
					},
				],
			}
		}

		// AUTO / CUT
		presets['auto_take'] = {
			type: 'button',
			category: 'Transition',
			name: 'AUTO',
			style: {
				text: 'AUTO',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'auto_take', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'auto_transition',
					options: {},
					style: {
						bgcolor: combineRgb(255, 128, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		presets['cut'] = {
			type: 'button',
			category: 'Transition',
			name: 'CUT',
			style: {
				text: 'CUT',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'cut', options: {} }],
					up: [],
				},
			],
			feedbacks: [],
		}

		// FTB
		presets['ftb'] = {
			type: 'button',
			category: 'Transition',
			name: 'FTB',
			style: {
				text: 'FTB',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'output_fade_toggle', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'output_fade',
					options: {},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		// Transition Type
		presets['trans_mix'] = {
			type: 'button',
			category: 'Transition',
			name: 'MIX',
			style: {
				text: 'MIX',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'set_transition_type', options: { type: 'MIX' } }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'transition_type',
					options: { type: 'MIX' },
					style: {
						bgcolor: combineRgb(0, 128, 255),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		presets['trans_wipe'] = {
			type: 'button',
			category: 'Transition',
			name: 'WIPE',
			style: {
				text: 'WIPE',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'set_transition_type', options: { type: 'WIPE' } }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'transition_type',
					options: { type: 'WIPE' },
					style: {
						bgcolor: combineRgb(0, 128, 255),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		// PinP
		presets['pinp_pgm'] = {
			type: 'button',
			category: 'PinP & DSK',
			name: 'PinP PGM',
			style: {
				text: 'PinP\\nPGM',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'pinp_pgm_toggle', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'pinp_pgm_on',
					options: {},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		// DSK
		presets['dsk_pgm'] = {
			type: 'button',
			category: 'PinP & DSK',
			name: 'DSK PGM',
			style: {
				text: 'DSK\\nPGM',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'dsk_pgm_toggle', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'dsk_pgm_on',
					options: {},
					style: {
						bgcolor: combineRgb(255, 0, 0),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		// SPLIT
		presets['split_toggle'] = {
			type: 'button',
			category: 'SPLIT & ROI',
			name: 'SPLIT',
			style: {
				text: 'SPLIT',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'split_toggle', options: {} }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'split_on',
					options: {},
					style: {
						bgcolor: combineRgb(255, 255, 0),
						color: combineRgb(0, 0, 0),
					},
				},
			],
		}

		// ROI
		presets['roi_mode_toggle'] = {
			type: 'button',
			category: 'SPLIT & ROI',
			name: 'ROI Mode',
			style: {
				text: 'ROI\\nMode',
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [{ actionId: 'roi_mode', options: { state: 'ON' } }],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'roi_mode_on',
					options: {},
					style: {
						bgcolor: combineRgb(0, 128, 255),
						color: combineRgb(255, 255, 255),
					},
				},
			],
		}

		// Still Capture
		let captureTargets = [
			{ id: '00', label: 'STILL 1' },
			{ id: '01', label: 'STILL 2' },
		]
		let captureSources = [
			{ id: '00', label: 'HDMI 1' },
			{ id: '01', label: 'HDMI 2' },
			{ id: '02', label: 'HDMI 3' },
			{ id: '03', label: 'HDMI 4' },
			{ id: '04', label: 'HDMI 5' },
		]
		for (let t = 0; t < captureTargets.length; t++) {
			for (let s = 0; s < captureSources.length; s++) {
				presets[`capture_${captureTargets[t].id}_${captureSources[s].id}`] = {
					type: 'button',
					category: 'Still Capture',
					name: `Capture ${captureSources[s].label} → ${captureTargets[t].label}`,
					style: {
						text: `CAP\\n${captureSources[s].label}\\n→${captureTargets[t].label}`,
						size: 'auto',
						color: combineRgb(255, 255, 255),
						bgcolor: combineRgb(128, 0, 0),
					},
					steps: [
						{
							down: [
								{
									actionId: 'capture_still',
									options: { source: captureSources[s].id, target: captureTargets[t].id },
								},
							],
							up: [],
						},
					],
					feedbacks: [],
				}
			}
		}

		// Memories
		for (let i = 0; i < self.CHOICES_MEMORIES.length; i++) {
			let mem = self.CHOICES_MEMORIES[i]
			presets[`memory_${mem.id}`] = {
				type: 'button',
				category: 'Memory',
				name: mem.label,
				style: {
					text: `MEM\\n${i + 1}`,
					size: 'auto',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [{ actionId: 'load_memory', options: { memory: mem.id } }],
						up: [],
					},
				],
				feedbacks: [
					{
						feedbackId: 'memory_loaded',
						options: { memory: mem.id },
						style: {
							bgcolor: combineRgb(0, 128, 255),
							color: combineRgb(255, 255, 255),
						},
					},
				],
			}
		}

		self.setPresetDefinitions(presets)
	},
}
