var m = require('mithril')
var Model = require('../../model/Model')
var State = require('../../model/State')
require('./Menu.sass')

module.exports = {
	view: function(){
		return m('menu'
			, Model.things.map(function(thing){
				return m('.menu-item'
					, {
						onclick: function(){
							State.current = thing
						}
					}
					, thing.name
				)
			})
		)
	}
}