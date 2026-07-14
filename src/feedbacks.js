const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks: function () {
		let self = this

		const feedbacks = {}

		feedbacks['tally'] = {
			type: 'boolean',
			name: 'Tally State',
			description: 'Change button style based on tally state',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 0,
					choices: self.TALLYDATA.map((t) => ({ id: t.id, label: t.label })),
				},
				{
					type: 'dropdown',
					label: 'State',
					id: 'state',
					default: 1,
					choices: [
						{ id: 1, label: 'PGM' },
						{ id: 2, label: 'PST' },
						{ id: 3, label: 'PGM & PST' },
					],
				},
			],
			callback: (feedback) => {
				let tally = self.TALLYDATA.find((t) => t.id == feedback.options.source)
				if (tally) {
					return tally.status == feedback.options.state
				}
				return false
			},
		}

		feedbacks['pgm_source'] = {
			type: 'boolean',
			name: 'PGM Source',
			description: 'Change button style when source is on PGM',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'HDMI1',
					choices: self.CHOICES_INPUTS,
				},
			],
			callback: (feedback) => {
				return self.DATA.pgmSource === feedback.options.source || self.DATA.pgmInput === feedback.options.source
			},
		}

		feedbacks['pst_source'] = {
			type: 'boolean',
			name: 'PST Source',
			description: 'Change button style when source is on PST',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Source',
					id: 'source',
					default: 'HDMI1',
					choices: self.CHOICES_INPUTS,
				},
			],
			callback: (feedback) => {
				return self.DATA.pstSource === feedback.options.source || self.DATA.pstInput === feedback.options.source
			},
		}

		feedbacks['pinp_pgm_on'] = {
			type: 'boolean',
			name: 'PinP PGM On Air',
			description: 'Change button style when PinP is on PGM',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.pinpPgm === 'ON'
			},
		}

		feedbacks['pinp_pvw_on'] = {
			type: 'boolean',
			name: 'PinP PVW On',
			description: 'Change button style when PinP is on PVW',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.DATA.pinpPvw === 'ON'
			},
		}

		feedbacks['dsk_pgm_on'] = {
			type: 'boolean',
			name: 'DSK PGM On Air',
			description: 'Change button style when DSK is on PGM',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.dskPgm === 'ON'
			},
		}

		feedbacks['dsk_pvw_on'] = {
			type: 'boolean',
			name: 'DSK PVW On',
			description: 'Change button style when DSK is on PVW',
			defaultStyle: {
				bgcolor: combineRgb(0, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.DATA.dskPvw === 'ON'
			},
		}

		feedbacks['output_fade'] = {
			type: 'boolean',
			name: 'Output Fade Active',
			description: 'Change button style when Output Fade (FTB) is active',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.outputFade === 'ON' || self.DATA.outputFade === 'FADEOUT'
			},
		}

		feedbacks['split_on'] = {
			type: 'boolean',
			name: 'SPLIT On',
			description: 'Change button style when SPLIT is ON',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => {
				return self.DATA.splitStatus === 'ON'
			},
		}

		feedbacks['roi_mode_on'] = {
			type: 'boolean',
			name: 'ROI Mode On',
			description: 'Change button style when ROI mode is ON',
			defaultStyle: {
				bgcolor: combineRgb(0, 128, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.roiMode === 'ON'
			},
		}

		feedbacks['transition_type'] = {
			type: 'boolean',
			name: 'Transition Type',
			description: 'Change button style based on current transition type',
			defaultStyle: {
				bgcolor: combineRgb(0, 128, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Type',
					id: 'type',
					default: 'MIX',
					choices: self.CHOICES_TRANSITION_TYPES,
				},
			],
			callback: (feedback) => {
				return self.DATA.transitionType === feedback.options.type
			},
		}

		feedbacks['output_assign'] = {
			type: 'boolean',
			name: 'Output Assign',
			description: 'Change button style based on output assignment',
			defaultStyle: {
				bgcolor: combineRgb(0, 128, 255),
				color: combineRgb(255, 255, 255),
			},
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
			callback: (feedback) => {
				return self.DATA[`outputAssign_${feedback.options.port}`] === feedback.options.assign
			},
		}

		feedbacks['auto_switching_on'] = {
			type: 'boolean',
			name: 'Auto Switching On',
			description: 'Change button style when Auto Switching is ON',
			defaultStyle: {
				bgcolor: combineRgb(255, 128, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.autoSwitching === 'ON'
			},
		}

		feedbacks['auto_mixing_on'] = {
			type: 'boolean',
			name: 'Auto Mixing On',
			description: 'Change button style when Auto Mixing is ON',
			defaultStyle: {
				bgcolor: combineRgb(128, 0, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.autoMixing === 'ON'
			},
		}

		feedbacks['auto_transition'] = {
			type: 'boolean',
			name: 'Auto Transition Active',
			description: 'Change button style when auto transition is in progress',
			defaultStyle: {
				bgcolor: combineRgb(255, 128, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.DATA.autoTransition === 'ON'
			},
		}

		feedbacks['memory_loaded'] = {
			type: 'boolean',
			name: 'Memory Loaded',
			description: 'Change button style when a specific memory is loaded',
			defaultStyle: {
				bgcolor: combineRgb(0, 128, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Memory',
					id: 'memory',
					default: 'MEMORY1',
					choices: self.CHOICES_MEMORIES,
				},
			],
			callback: (feedback) => {
				return self.DATA.currentMemory === feedback.options.memory
			},
		}

		self.setFeedbackDefinitions(feedbacks)
	},
}
