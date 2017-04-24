var m = require('mithril')
var State = require('../../model/State')
require('./Editor.sass')

module.exports = {
	view: function(){
		return m('.editor'
			, m('h2', 'Edit Item')
			, m('label'
				, 'Item Name:'
				, m('input'
					, {
						value: State.current.name,
						oninput: m.withAttr('value', function (v){
							State.current.name = v
						})
					}
				)
			)
		)
	}
}