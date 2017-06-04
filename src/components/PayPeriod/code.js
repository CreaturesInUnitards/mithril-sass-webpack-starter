/***********************************
*
* PayPeriod
*
***********************************/
require('./style.sass')
var Timekeeping = require('../../Timekeeping')
var TimeBlock = require('../TimeBlock/code')

module.exports = {
	view: function () {
		var subTotals = Timekeeping.subTotals(State.current)
		var totalTotals = Timekeeping.totalTotals(subTotals)
		return 	m('.blocks'
			, m('h4', 'Pay Period')
			, m('.pay-period'
				, State.current.blocks.map(function (block) {
					return m(TimeBlock, { block: block })
				})
			)
			, m('h4.totals-heading', 'Week 1 Totals:')
			, m('.total'
				, m('span', 'Week 1 Regular: ')
				, m('.sum', Timekeeping.elapsedTime(subTotals.week1.regular))
			)
			, m('.total'
				, m('span', 'Week 1 Overtime: ')
				, m('.sum', Timekeeping.elapsedTime(subTotals.week1.overtime))
			)
			, m('h4.totals-heading', 'Week 2 Totals:')
			, m('.total'
				, m('span', 'Week 2 Regular: ')
				, m('.sum', Timekeeping.elapsedTime(subTotals.week2.regular))
			)
			, m('.total'
				, m('span', 'Week 2 Overtime: ')
				, m('.sum', Timekeeping.elapsedTime(subTotals.week2.overtime))
			)
			, m('h4.totals-heading', 'Total Totals:')
			, m('.total'
				, m('span', 'Total Regular: ')
				, m('.sum', Timekeeping.elapsedTime(totalTotals.regular))
			)
			, m('.total'
				, m('span', 'Total Overtime: ')
				, m('.sum', Timekeeping.elapsedTime(totalTotals.overtime))
			)
		)
	}
}
