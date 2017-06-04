/***********************************
*
* Message
*
***********************************/
require('./style.sass')

module.exports = {
	message: '',
	view: function (vnode) {
		return m('.message'
			, m('textarea[placeholder=something to say?]'
				, {
					value: vnode.state.message,
					oninput: m.withAttr('value', function(v) { vnode.state.message = v })
				}
			)
			, vnode.state.message
				? m('button.send-message'
					, {
						onclick: function () {
							State.sendMessage.call({message: vnode.state.message})
								.then(function () {
									vnode.state.message = ''
									m.redraw()
									alert('message sent.')
								})
						}
					}
					, 'send message'
				)
				: null

		)
	}
}
