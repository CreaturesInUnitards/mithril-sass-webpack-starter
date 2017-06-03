window.m = require('mithril')
window.State = require('./State')
var List = require('./components/List/code')
var Detail = require('./components/Detail/code')

require('./globals.sass')

var App = {
	view: function(){
		return State.current
			? m(Detail)
			: m(List)
	}
}

m.mount(document.body, App)