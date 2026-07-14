const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const upgrades = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')
const api = require('./src/api')
const constants = require('./src/constants')

class V14KInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...api,
			...constants,
		})

		this.INTERVAL = null
		this.RECONNECT_INTERVAL = undefined

		this.MODEL = 'V-1-4K'
		this.VERSION = ''

		this.DATA = {}
	}

	async init(config) {
		this.configUpdated(config)
	}

	async destroy() {
		try {
			if (this.socket !== undefined) {
				this.socket.destroy()
			}

			clearInterval(this.INTERVAL)

			if (this.RECONNECT_INTERVAL !== undefined) {
				clearTimeout(this.RECONNECT_INTERVAL)
			}

			this.log('debug', 'Module destroyed')
		} catch (error) {
			this.log('error', 'Error during destroy: ' + error)
		}
	}

	async configUpdated(config) {
		this.config = config

		if (this.socket !== undefined) {
			this.socket.destroy()
			delete this.socket
		}

		clearInterval(this.INTERVAL)

		if (this.RECONNECT_INTERVAL !== undefined) {
			clearTimeout(this.RECONNECT_INTERVAL)
			this.RECONNECT_INTERVAL = undefined
		}

		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.checkFeedbacks()
		this.checkVariables()

		this.initConnection()
	}
}

runEntrypoint(V14KInstance, upgrades)
