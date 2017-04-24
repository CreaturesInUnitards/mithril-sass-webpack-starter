var m = require('mithril')
var Header = require('./components/Header/Header')
var Menu = require('./components/Menu/Menu')
var Editor = require('./components/Editor/Editor')
var State = require('./model/State')
require('./globals.sass')

var App = {
	view: function(){
		return [
			m(Header),
			m('main'
				, m(Menu)
				, State.current
					? m(Editor)
					: m('.editor', 'nothing selected')
			)
		]
	}
}

m.mount(document.body, App)