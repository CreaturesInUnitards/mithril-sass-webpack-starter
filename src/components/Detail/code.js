/***********************************
*
* Detail
*
***********************************/
require('./style.sass')
var Message = require('../Message/code')
var PayPeriod = require('../PayPeriod/code')

module.exports = {
	view: function () {
		var clockedIn = State.isClockedIn(State.current)
		return m('.detail.flex'
			, m('.wrapper'
				, m(''
					, m('h3.employee-name'
						, m('button.back', { onclick: function(){ State.current = null }})
						, State.displayName(State.current)
					)
					, m('button.clock'
						, {
							class: clockedIn ? 'out' : 'in',
							onclick: State.punchClock
						}
						, clockedIn ? 'Clock Out' : 'Clock In'
					)
					, m(Message)
				)
				, m(PayPeriod)
			)
		)
	}
}
