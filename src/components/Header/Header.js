var m = require('mithril')
require('./Header.sass')

module.exports = {
	view: function(){
		return m('header'
			, m('.headline', "Getting Started")
		)
	}
}