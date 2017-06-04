/***********************************
*
* Detail
*
***********************************/
require('./style.sass')
var Message = require('../Message/code')
var TimeBlock = require('../TimeBlock/code')

var displayName = function () {
	return State.current.firstName + ' ' + State.current.lastName
}

module.exports = {
	message: null,
	view: function (vnode) {
		var clockedIn = State.isClockedIn(State.current)
		return m('.detail.flex'
			, m('.wrapper'
				, m('h3'
					, m('button.back'
						, { onclick: function(){ State.current = null }}
						, '< back'
					)
					, displayName()
				)
				, m('button.clock'
					, {
						class: clockedIn ? 'out' : 'in',
						onclick: State.punchClock
					}
					, clockedIn ? 'Clock Out' : 'Clock In'
				)
				, m(Message)
				, m('.blocks'
					, m('h4', 'Pay Period')
					, m('.pay-period'
						, State.current.blocks.map(function (block) {
							return m(TimeBlock, { block: block })
						})
					)
				)
			)
		)
	}
}

// TODO: TOTAL total
// TODO: must calc overtime for each Mon-Sun
// TODO: must set Pay Period start date
