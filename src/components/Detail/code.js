/***********************************
*
* Detail
*
***********************************/
require('./style.sass')
var TimeBlock = require('../TimeBlock/code')

var displayName = function () {
	return State.current.firstName + ' ' + State.current.lastName
}

module.exports = {
	view: function () {
		var clockedIn = State.isClockedIn(State.current)
		return m('.detail.flex'
			, m('.wrapper'
				, m('h3', displayName())
				, m('.blocks'
					, m('h4', 'Pay Period')
					, m('.pay-period'
						, State.current.blocks.map(function (block) {
							return m(TimeBlock, { block: block })
						})
					)
				)
				, m('button.clock'
					, {
						onclick: State.punchClock
					}
					, clockedIn ? 'Clock Out' : 'Clock In'
				)
				, m('button'
					, { onclick: function(){ State.current = null }}
					, '< back'
				)
			)
		)
	}
}