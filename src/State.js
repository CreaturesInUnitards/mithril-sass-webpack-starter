var Timekeeping = require('./Timekeeping')
var ref = firebase.database().ref('CrewMonkey')

var State = {
	current: null,
	employees: [],
	deepClone: function (object) {
		if (object === null) return null
		var clone = Array.isArray(object) ? [] : {}
		Object.keys(object).forEach(function (key) {
			if (object.hasOwnProperty(key)) {
				var prop = object[key]
				if (typeof prop === 'object') clone[key] = State.deepClone(prop)
				else clone[key] = prop
			}
		})
		return clone
	},
	displayName: function (employee) {
		return employee.firstName + ' ' + employee.lastName
	},
	listSort: function (a, b) {
		if (a.lastName < b.lastName) return -1
		if (a.lastName > b.lastName) return 1

		if (a.firstName < b.firstName) return -1
		if (a.firstName > b.firstName) return 1

		return 0
	},
	lastBlock: function (employee) {
		var blocks = employee.blocks
		if (!blocks.length) return null
		return blocks[blocks.length - 1]
	},
	isClockedIn: function (employee) {
		var lastBlock = State.lastBlock(employee)
		return lastBlock ? lastBlock.in && !lastBlock.out : false
	},
	punchClock: function () {
		var blocks = State.current.blocks
		var now = (new Date()).getTime()
		if (!State.isClockedIn(State.current)) 
			blocks.push({in: now, out: null})
		else
			State.lastBlock(State.current).out = now
		
		State.save()
		State.current = null
	},
	save: function () {
		var saveObj = State.deepClone(State.current)
		delete saveObj.id
		ref.child('employees').child(State.current.id).update(saveObj)
	},
	sendMessage: function () {
		var message = this.message
		return ref.child('messages').push({
			employee: State.displayName(State.current),
			timestamp: (new Date()).toTimeString(),
			message: message
		})
	}
}

module.exports = State

ref.child('periodStart').on('value', function(start){
	Timekeeping.periodStart = start.val()

	ref.child('employees').on('child_added', function(snapshot){
		var obj = snapshot.val()
		obj.id = snapshot.key
		if (!obj.blocks) obj.blocks = []
		State.employees.push(obj)
		m.redraw()
	})
})
