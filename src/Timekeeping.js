var MILLIS_PER_WEEK = 1000 * 60 * 60 * 24 * 7 // per: sec * min * hr * day * wk
var MILLIS_PER_40 = 1000 * 60 * 60 * 40

var Timekeeping = {
	periodStart: null,
	elapsedTime: function (ms) {
		var hours = parseInt(ms/1000/60/60)
		var remMinutes = ms - (hours * 1000 * 60 * 60)
		var minutes = parseInt(remMinutes/1000/60)
		var remSeconds = remMinutes - (minutes * 1000 * 60)
		var seconds = parseInt(remSeconds/1000)
		return Timekeeping.twoDigit(hours) + ':' + Timekeeping.twoDigit(minutes) + ':' + Timekeeping.twoDigit(seconds)
	},
	twoDigit: function(n){
		return (n < 10 ? '0' : '') + n
	},
	subTotals: function(employee) {
		var week1 = [], week2 = []
		var week2Start = Timekeeping.periodStart + MILLIS_PER_WEEK

		employee.blocks.forEach(function(block){
			(block.in < week2Start ? week1 : week2).push(block) 
		})
		
		var week1Total = weeklyTotal(week1)
		var week2Total = weeklyTotal(week2)

		var week1Overtime = week1Total > MILLIS_PER_40 ? week1Total - MILLIS_PER_40 : 0
		var week2Overtime = week2Total > MILLIS_PER_40 ? week2Total - MILLIS_PER_40 : 0
			
		return {
			week1: {
				regular: week1Overtime ? MILLIS_PER_40 : week1Total,
				overtime: week1Overtime
			},
			week2: {
				regular: week2Overtime ? MILLIS_PER_40 : week2Total,
				overtime: week2Overtime
			}
		}

		function weeklyTotal(week) {
			return week.reduce(function (prev, current) {
				if (!current.out) return prev
				return prev + (current.out - current.in)
			}, 0)
		}
	},
	totalTotals: function (subtotals) {
		return {
			regular: subtotals.week1.regular + subtotals.week2.regular,
			overtime: subtotals.week1.overtime + subtotals.week2.overtime
		}
	}
}

module.exports = Timekeeping
