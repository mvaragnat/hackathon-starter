/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  })
}

exports.pricing = (req, res) => {
  res.render('pricing', {
    title: 'Pricing'
  })
}
