require('./style.sass')

function lastFirstName (employee) {
	return employee.lastName + ', ' + employee.firstName
}

function email (employee) {
	return (employee.firstName + employee.lastName).toLowerCase() + '@crewmonkey.com'
}

function signIn (state) {
	trying = true
	firebase.auth().signInWithEmailAndPassword(email(state.selected), state.password)
		.then(function () {
			State.current = state.selected
			trying = false
			m.redraw()
		})
		.catch(function (e) {
			state.password = ''
			trying = false
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

var trying = false

module.exports = {
	selected: null,
	password: '',
	view: function (vnode) {
		return m('.list.flex'
			, { onclick: function () { clear(vnode.state) } 
			}
			, State.employees
				.sort(State.listSort)
				.map(function (employee) {
					return m('.list-item'
						, {
							class: State.isClockedIn(employee) ? 'active' : '',
							onclick: function (e) {
								e.stopPropagation()
								vnode.state.selected = vnode.state.selected === employee ? null : employee
								vnode.state.password = ''
							}
						}
						, vnode.state.selected === employee
							? m('input[type=password][placeholder=password]'
								, {
									oncreate: function (vn) { vn.dom.focus() },
									value: vnode.state.password, 
									oninput: m.withAttr('value', function(v){ vnode.state.password = v }),
									onkeyup: listen.bind(vnode.state),
									onclick: function (e) { e.stopPropagation() }
								}
							)
							: lastFirstName(employee)
					)
				})
			, trying ? m('.loader') : null
		)
	}
}
