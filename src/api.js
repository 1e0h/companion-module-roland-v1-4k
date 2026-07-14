const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	initConnection: function () {
		let self = this

		if (self.socket !== undefined) {
			self.socket.destroy()
			delete self.socket
		}

		if (self.config.port === undefined) {
			self.config.port = 8023
		}

		if (self.config.host) {
			self.log('info', `Opening connection to ${self.config.host}:${self.config.port}`)

			self.socket = new TCPHelper(self.config.host, self.config.port)
			self.receiveBuffer = ''

			self.socket.on('error', function (err) {
				if (self.config.verbose) {
					self.log('warn', 'Error: ' + err)
				}
				clearInterval(self.INTERVAL)
				self.handleError(err)
			})

			self.socket.on('connect', function () {
				self.log('info', 'Connected')
				self.updateStatus(InstanceStatus.Ok)
			})

			self.socket.on('data', function (buffer) {
				let indata = buffer.toString('utf8')
				self.processIncomingData(indata)
			})
		}
	},

	processIncomingData: function (data) {
		let self = this

		self.receiveBuffer += data

		if (self.receiveBuffer.includes('Enter password:')) {
			self.updateStatus(InstanceStatus.Connecting, 'Authenticating')
			self.log('info', 'Sending password...')
			self.socket.send(self.config.password + '\n')
			self.receiveBuffer = ''
			return
		}

		if (self.receiveBuffer.includes('Welcome to V-1-4K.')) {
			self.updateStatus(InstanceStatus.Ok)
			self.log('info', 'Authenticated.')
			self.receiveBuffer = ''
			self.sendSimpleCommand('VER;')
			self.startInterval()
			self.subscribeToTally()
			return
		}

		let lines = self.receiveBuffer.split('\n')
		self.receiveBuffer = lines.pop()

		for (let i = 0; i < lines.length; i++) {
			let line = lines[i].trim()
			if (line.length > 0) {
				self.updateData(line)
			}
		}
	},

	updateData: function (data) {
		let self = this

		if (self.config.verbose) {
			self.log('debug', 'Received: ' + data)
		}

		// V-1-4K LAN responses may have stx (0x02) prefix
		data = data.replace(/\x02/g, '')

		if (data.trim() === 'ERR:0;' || data.trim() === 'ERR:4;' || data.trim() === 'ERR:5;') {
			if (self.config.verbose) {
				self.log('warn', 'Device returned error: ' + data.trim())
			}
			return
		}

		try {
			let segments = data.split(';')

			for (let s = 0; s < segments.length; s++) {
				let segment = segments[s].trim()
				if (segment === '' || segment === 'ACK') continue

				let colonIndex = segment.indexOf(':')
				if (colonIndex === -1) continue

				let prefix = segment.substring(0, colonIndex).trim()
				let paramStr = segment.substring(colonIndex + 1).trim()
				let params = paramStr.split(',')

				self.parseResponse(prefix, params)
			}

			self.checkFeedbacks()
		} catch (error) {
			self.log('error', 'Error parsing data: ' + error)
			self.log('error', 'Data: ' + data)
		}
	},

	parseResponse: function (prefix, params) {
		let self = this

		switch (prefix) {
			case 'VER':
				if (params.length >= 2) {
					self.MODEL = params[0]
					self.VERSION = params[1]
					self.setVariableValues({ model: self.MODEL, version: self.VERSION })
				}
				break

			case 'PGM':
				if (params.length >= 1) {
					self.DATA.pgmSource = params[0]
					if (params.length >= 2) {
						self.DATA.pgmInput = params[1]
					}
					self.setVariableValues({ pgm_source: self.DATA.pgmSource })
				}
				break

			case 'PST':
				if (params.length >= 1) {
					self.DATA.pstSource = params[0]
					if (params.length >= 2) {
						self.DATA.pstInput = params[1]
					}
					self.setVariableValues({ pst_source: self.DATA.pstSource })
				}
				break

			case 'TLY':
				if (params.length >= 15) {
					for (let i = 0; i < Math.min(params.length, self.TALLYDATA.length); i++) {
						self.TALLYDATA[i].status = parseInt(params[i])
					}
					self.updateTallyVariables()
				}
				break

			case 'VFL':
				if (params.length >= 1) {
					self.DATA.videoFaderLevel = parseInt(params[0])
					self.setVariableValues({ video_fader_level: self.DATA.videoFaderLevel })
				}
				break

			case 'ATG':
				if (params.length >= 1) {
					self.DATA.autoTransition = params[0]
					self.setVariableValues({ auto_transition: self.DATA.autoTransition })
				}
				break

			case 'TRS':
				if (params.length >= 1) {
					self.DATA.transitionType = params[0]
					self.setVariableValues({ transition_type: self.DATA.transitionType })
				}
				break

			case 'TIM':
				if (params.length >= 2) {
					let target = params[0]
					let time = parseInt(params[1])
					self.DATA[`transTime_${target}`] = time
				}
				break

			case 'FTB':
				if (params.length >= 1) {
					self.DATA.outputFade = params[0]
					self.setVariableValues({ output_fade: self.DATA.outputFade })
				}
				break

			case 'PPS':
				if (params.length >= 2) {
					self.DATA.pinpPgm = params[1]
					self.setVariableValues({ pinp_pgm: self.DATA.pinpPgm })
				}
				break

			case 'PPW':
				if (params.length >= 2) {
					self.DATA.pinpPvw = params[1]
					self.setVariableValues({ pinp_pvw: self.DATA.pinpPvw })
				}
				break

			case 'DSK':
				if (params.length >= 2) {
					self.DATA.dskPgm = params[1]
					self.setVariableValues({ dsk_pgm: self.DATA.dskPgm })
				}
				break

			case 'DVW':
				if (params.length >= 2) {
					self.DATA.dskPvw = params[1]
					self.setVariableValues({ dsk_pvw: self.DATA.dskPvw })
				}
				break

			case 'DSS':
				if (params.length >= 2) {
					self.DATA.dskSource = params[1]
					if (params.length >= 3) {
						self.DATA.dskSourceInput = params[2]
					}
					self.setVariableValues({ dsk_source: self.DATA.dskSource })
				}
				break

			case 'KYL':
				if (params.length >= 2) {
					self.DATA.dskLevel = parseInt(params[1])
				}
				break

			case 'KYG':
				if (params.length >= 2) {
					self.DATA.dskGain = parseInt(params[1])
				}
				break

			case 'SPS':
				if (params.length >= 2) {
					self.DATA.splitStatus = params[1]
					self.setVariableValues({ split_status: self.DATA.splitStatus })
				}
				break

			case 'ROISW':
				if (params.length >= 1) {
					self.DATA.roiMode = params[0]
					self.setVariableValues({ roi_mode: self.DATA.roiMode })
				}
				break

			case 'VOS':
				if (params.length >= 2) {
					let port = params[0]
					let assign = params[1]
					self.DATA[`outputAssign_${port}`] = assign
					if (port === 'HDMI3') self.setVariableValues({ hdmi3_assign: assign })
					if (port === 'HDMI4') self.setVariableValues({ hdmi4_assign: assign })
				}
				break

			case 'MEM':
				if (params.length >= 1) {
					self.DATA.currentMemory = params[0]
					self.setVariableValues({ current_memory: self.DATA.currentMemory })
				}
				break

			case 'ASW':
				if (params.length >= 1) {
					self.DATA.autoSwitching = params[0]
					self.setVariableValues({ auto_switching: self.DATA.autoSwitching })
				}
				break

			case 'ATM':
				if (params.length >= 1) {
					self.DATA.autoMixing = params[0]
					self.setVariableValues({ auto_mixing: self.DATA.autoMixing })
				}
				break

			case 'IAM':
				if (params.length >= 2) {
					self.DATA[`audioMute_${params[0]}`] = params[1]
				}
				break

			case 'OAM':
				if (params.length >= 2) {
					self.DATA[`outputMute_${params[0]}`] = params[1]
				}
				break

			case 'HCP':
				if (params.length >= 1) {
					self.DATA.hdcp = params[0]
				}
				break

			case 'DTH':
				self.parseDTHResponse(params)
				break
		}
	},

	parseDTHResponse: function (params) {
		let self = this

		if (params.length < 2) return

		let address = params[0]
		let value = params[1]

		if (address.length === 6) {
			let p1 = address.substring(0, 2)
			let p2 = address.substring(2, 4)
			let p3 = address.substring(4, 6)

			if (p1 === '0C' && p2 === '00') {
				let tallyIndex = parseInt(p3, 16)
				if (tallyIndex >= 0 && tallyIndex < self.TALLYDATA.length) {
					self.TALLYDATA[tallyIndex].status = parseInt(value, 16)
				}
			}

			if (p1 === '60') {
				let memoryNumber = parseInt(p2, 16)
				let charIndex = parseInt(p3, 16)
				if (memoryNumber >= 0 && memoryNumber < 8) {
					if (!self.DATA[`memoryName_${memoryNumber}`]) {
						self.DATA[`memoryName_${memoryNumber}`] = '        '
					}
					let name = self.DATA[`memoryName_${memoryNumber}`]
					let charCode = parseInt(value, 16)
					let char = charCode > 0 ? String.fromCharCode(charCode) : ' '
					name = name.substring(0, charIndex) + char + name.substring(charIndex + 1)
					self.DATA[`memoryName_${memoryNumber}`] = name
					let varObj = {}
					varObj[`memoryname_${memoryNumber + 1}`] = name.trim()
					self.setVariableValues(varObj)
				}
			}

			if (p1 === '0A' && p2 === '00' && p3 === '03') {
				let memNum = parseInt(value, 16)
				self.DATA.lastMemoryNumber = memNum
				let memName = self.DATA[`memoryName_${memNum}`] || ''
				self.setVariableValues({
					last_memory_number: memNum,
					last_memory_name: memName.trim(),
				})
			}

			self.DATA[`sysex_${address}`] = value
		}
	},

	updateTallyVariables: function () {
		let self = this

		let varObj = {}
		for (let i = 0; i < self.TALLYDATA.length; i++) {
			let label = self.TALLYDATA[i].label.toLowerCase()
			let statusText = 'OFF'
			if (self.TALLYDATA[i].status === 1) statusText = 'PGM'
			else if (self.TALLYDATA[i].status === 2) statusText = 'PST'
			else if (self.TALLYDATA[i].status === 3) statusText = 'PGM+PST'
			varObj[`tally_${label}`] = statusText
		}
		self.setVariableValues(varObj)
	},

	handleError: function (err) {
		let self = this

		try {
			let error = err.toString()
			let printedError = false

			Object.keys(err).forEach(function (key) {
				if (key === 'code') {
					if (err[key] === 'ECONNREFUSED') {
						self.log('error', 'デバイスに接続できません。接続が拒否されました。IPアドレスを確認してください。')
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection Refused')
						printedError = true
					} else if (err[key] === 'ETIMEDOUT') {
						self.log('error', 'デバイスに接続できません。タイムアウトしました。IPアドレスを確認してください。')
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection Timed Out')
						printedError = true
					} else if (err[key] === 'ECONNRESET') {
						self.log('error', '接続がリセットされました。')
						self.updateStatus(InstanceStatus.ConnectionFailure, 'Connection Reset')
						printedError = true
					}

					if (self.socket !== undefined) {
						self.socket.destroy()
					}
					self.startReconnectInterval()
				}
			})

			if (!printedError) {
				self.log('error', `Error: ${error}`)
			}
		} catch (error) {
			self.log('error', 'Error handling error: ' + error)
		}
	},

	startReconnectInterval: function () {
		let self = this

		self.updateStatus(InstanceStatus.ConnectionFailure, 'Reconnecting')

		if (self.RECONNECT_INTERVAL !== undefined) {
			clearTimeout(self.RECONNECT_INTERVAL)
			self.RECONNECT_INTERVAL = undefined
		}

		self.log('info', '30秒後に再接続を試みます...')
		self.RECONNECT_INTERVAL = setTimeout(self.initConnection.bind(self), 30000)
	},

	startInterval: function () {
		let self = this

		self.pollQueue = []
		self.pollTimer = null
		self.memoryNamesLoaded = false

		if (self.config.polling) {
			let rate = parseInt(self.config.pollingrate) || 3000
			if (rate < 1000) rate = 1000
			self.log('info', `Polling interval: ${rate}ms`)
			self.INTERVAL = setInterval(self.getData.bind(self), rate)
		}
	},

	getData: function () {
		let self = this

		let commands = [
			'QPGM;', 'QPST;', 'TLY;', 'QVFL;', 'QATG;', 'QTRS;', 'QFTB;',
			'QPPS:PinP1;', 'QPPW:PinP1;', 'QDSK:DSK1;', 'QDVW:DSK1;', 'QDSS:DSK1;',
			'QSPS:SPLIT1;', 'QROISW;', 'QVOS:HDMI3;', 'QVOS:HDMI4;',
			'QMEM;', 'QASW;', 'QATM;',
		]

		self.pollQueue = commands.slice()

		if (!self.memoryNamesLoaded) {
			for (let i = 0; i < 8; i++) {
				let hexMem = i.toString(16).padStart(2, '0').toUpperCase()
				for (let j = 0; j < 8; j++) {
					let hexChar = j.toString(16).padStart(2, '0').toUpperCase()
					self.pollQueue.push('RQH:60' + hexMem + hexChar + ',000001;')
				}
			}
			self.memoryNamesLoaded = true
		}

		self.processQueue()
	},

	processQueue: function () {
		let self = this

		if (self.pollTimer) {
			clearTimeout(self.pollTimer)
			self.pollTimer = null
		}

		if (self.pollQueue.length === 0) return

		let cmd = self.pollQueue.shift()
		self.sendRawCommand(cmd)

		if (self.pollQueue.length > 0) {
			self.pollTimer = setTimeout(self.processQueue.bind(self), 50)
		}
	},

	subscribeToTally: function () {
		let self = this
		self.sendRawCommand('DTH:0C0100,01;')
	},

	getMemoryNames: function () {
		let self = this

		self.memoryNamesLoaded = false
	},

	sendSimpleCommand: function (command) {
		let self = this

		if (!command.endsWith(';')) {
			command = command + ';'
		}

		let cmd = command + '\n'

		if (self.socket !== undefined && self.socket.isConnected) {
			if (self.config.verbose) {
				self.log('debug', 'Sending: ' + command)
			}
			self.socket.send(cmd)
		} else {
			if (self.config.verbose) {
				self.log('warn', 'Socket not connected, cannot send.')
			}
		}
	},

	sendRawCommand: function (command) {
		let self = this

		if (!command.endsWith(';')) {
			command = command + ';'
		}

		let cmd = command + '\n'

		if (self.socket !== undefined && self.socket.isConnected) {
			if (self.config.verbose) {
				self.log('debug', 'Sending raw: ' + command)
			}
			self.socket.send(cmd)
		}
	},

	sendCommand: function (address, value) {
		let self = this
		self.sendRawCommand('DTH:' + address + ',' + value + ';')
	},
}
