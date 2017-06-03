require('./style.sass')

function fullName (employee) {
	return employee.lastName + ', ' + employee.firstName
}

function email (employee) {
	return (employee.firstName + employee.lastName).toLowerCase() + '@crewmonkey.com'
}

function signIn (state) {
	firebase.auth().signInWithEmailAndPassword(email(state.selected), state.password)
		.then(function () {
			State.current = state.selected
			m.redraw()
		})
		.catch(function (e) {
			state.password = ''
			m.redraw()
			alert('bad creds.')
		})
}

function clear(state) {
	state.password = ''
	state.selected = null
}

var listen = function (e) {
	var state = this
	switch(e.which) {
		case 13:
			signIn(state)
			break
		
		case 27:
			clear(state)
	}
}

module.exports = {
	selected: null,
	password: '',
	view: function (vnode) {
		return m('.list.flex'
			, State.employees
				.sort(State.listSort)
				.map(function (employee) {
					return m('.list-item'
						, {
							class: State.isClockedIn(employee) ? 'active' : '',
							onclick: function () {
								vnode.state.selected = vnode.state.selected === employee ? null : employee
								vnode.state.password = ''
							}
						}
						, vnode.state.selected === employee
							? m('input[type=password][placeholder=password][autofocus]'
								, {
									value: vnode.state.password, 
									oninput: m.withAttr('value', function(v){ vnode.state.password = v }),
									onkeyup: listen.bind(vnode.state),
									onclick: function (e) { e.stopPropagation() }
								}
							)
							: fullName(employee)
					)
				})
		)
	}
}


// TODO: bad creds
// TODO: clear password on bad creds/clickaway
