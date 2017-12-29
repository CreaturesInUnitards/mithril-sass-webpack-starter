window.m = require('mithril')
var Header = require('./components/Header/Header')
var State = require('./model/State')
require('./globals.sass')

var App = {
	view: function(){
		return [
			, m(Header)
			, m('main', 'your stuff could be different...')
		]
	}
}

m.mount(document.body, App)