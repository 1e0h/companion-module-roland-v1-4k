module.exports = {
	initVariables: function () {
		let self = this

		let variables = [
			{ variableId: 'model', name: 'Model' },
			{ variableId: 'version', name: 'Version' },
			{ variableId: 'pgm_source', name: 'PGM Source' },
			{ variableId: 'pst_source', name: 'PST Source' },
			{ variableId: 'video_fader_level', name: 'Video Fader Level' },
			{ variableId: 'auto_transition', name: 'Auto Transition State' },
			{ variableId: 'transition_type', name: 'Transition Type' },
			{ variableId: 'output_fade', name: 'Output Fade State' },
			{ variableId: 'pinp_pgm', name: 'PinP PGM State' },
			{ variableId: 'pinp_pvw', name: 'PinP PVW State' },
			{ variableId: 'dsk_pgm', name: 'DSK PGM State' },
			{ variableId: 'dsk_pvw', name: 'DSK PVW State' },
			{ variableId: 'dsk_source', name: 'DSK Source' },
			{ variableId: 'split_status', name: 'SPLIT State' },
			{ variableId: 'roi_mode', name: 'ROI Mode' },
			{ variableId: 'hdmi3_assign', name: 'HDMI3 Output Assign' },
			{ variableId: 'hdmi4_assign', name: 'HDMI4 Output Assign' },
			{ variableId: 'current_memory', name: 'Current Memory' },
			{ variableId: 'auto_switching', name: 'Auto Switching State' },
			{ variableId: 'auto_mixing', name: 'Auto Mixing State' },
			{ variableId: 'last_memory_number', name: 'Last Memory Number' },
			{ variableId: 'last_memory_name', name: 'Last Memory Name' },
		]

		for (let i = 0; i < self.TALLYDATA.length; i++) {
			let label = self.TALLYDATA[i].label.toLowerCase()
			variables.push({
				variableId: `tally_${label}`,
				name: `Tally ${self.TALLYDATA[i].label}`,
			})
		}

		for (let i = 1; i <= 8; i++) {
			variables.push({
				variableId: `memoryname_${i}`,
				name: `Memory ${i} Name`,
			})
		}

		self.setVariableDefinitions(variables)
	},
}
