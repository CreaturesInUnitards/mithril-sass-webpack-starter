/***********************************
*
* TimeBlock
*
***********************************/
require('./style.sass')

var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function twoDigit(n){
	return (n < 10 ? '0' : '') + n 
}

function displayDate (ms) {
	var now = new Date(ms)
	return days[now.getDay()] + 
		' ' + twoDigit(now.getMonth() + 1) + 
		'/' + twoDigit(now.getDate()) + 
		' ' + twoDigit(now.getHours()) + 
		':' + twoDigit(now.getMinutes()) + 
		':' + twoDigit(now.getSeconds())
}

function elapsedTime(block) {
	var ms = block.out - block.in
	var hours = parseInt(ms/1000/60/60)
	var remMinutes = ms - (hours * 1000 * 60 * 60)
	var minutes = parseInt(remMinutes/1000/60)
	var remSeconds = remMinutes - (minutes * 1000 * 60)
	var seconds = parseInt(remSeconds/1000)
	return twoDigit(hours) + ':' + twoDigit(minutes) + ':' + twoDigit(seconds) 
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
						, elapsedTime(block)
					)
				]
				: m('span.active', 'active')
		)
	}
}
