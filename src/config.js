const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				default: '',
				width: 6,
				regex: Regex.IP,
			},
			{
				type: 'number',
				id: 'port',
				label: 'TCP Port',
				default: 8023,
				width: 6,
				min: 1,
				max: 65535,
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				default: '',
				width: 6,
			},
			{
				type: 'checkbox',
				id: 'polling',
				label: 'Enable Polling',
				default: true,
				width: 3,
			},
			{
			type: 'number',
			id: 'pollingrate',
			label: 'Polling Rate (ms)',
			default: 3000,
			width: 3,
			min: 1000,
			max: 30000,
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false,
				width: 3,
			},
		]
	},
}
