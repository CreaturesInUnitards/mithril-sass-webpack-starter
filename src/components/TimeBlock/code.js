/***********************************
*
* TimeBlock
*
***********************************/
require('./style.sass')
var Timekeeping = require('../../Timekeeping')


var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function displayDate (ms) {
	var now = new Date(ms)
	return days[now.getDay()] + 
		' ' + Timekeeping.twoDigit(now.getMonth() + 1) + 
		'/' + Timekeeping.twoDigit(now.getDate()) + 
		' ' + Timekeeping.twoDigit(now.getHours()) + 
		':' + Timekeeping.twoDigit(now.getMinutes()) + 
		':' + Timekeeping.twoDigit(now.getSeconds())
}

module.exports = {
	view: function (vnode) {
		var block = vnode.attrs.block
		return m('.block'
			, m('span.in'
				, m('label', 'in: ')
				, displayDate(block.in)
			)
			, block.out 
				? [
					, m('span.out'
						, m('label', 'out: ')
						, displayDate(block.out)
					)
					, m('span.block-total'
						, m('label', 'total: ')
						, Timekeeping.elapsedTime(block.out - block.in)
					)
				]
				: m('span.active', 'active')
		)
	}
}
