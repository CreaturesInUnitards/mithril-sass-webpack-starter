var ref = firebase.database().ref('CrewMonkey/employees')

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
	},
	save: function () {
		var saveObj = State.deepClone(State.current)
		delete saveObj.id
		var empRef = ref.child(State.current.id)
		empRef.update(saveObj)
	}
}

module.exports = State

ref.on('child_added', function(snapshot){
	var obj = snapshot.val()
	obj.id = snapshot.key
	if (!obj.blocks) obj.blocks = []
	State.employees.push(obj)
	m.redraw()
})
