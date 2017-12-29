require('./Header.sass')

module.exports = {
	view: function(){
		return m('header'
			, m('.headline', 'Getting Started')
			, m('img', { src: './images/logo.png'})
		)
	}
}