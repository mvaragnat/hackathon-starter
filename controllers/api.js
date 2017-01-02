'use strict'

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  })
}

// /**
//  * GET /api/facebook
//  * Facebook API example.
//  */
// exports.getFacebook = (req, res, next) => {
//   const token = req.user.tokens.find(token => token.kind === 'facebook');
//   graph.setAccessToken(token.accessToken);
//   graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, results) => {
//     if (err) { return next(err); }
//     res.render('api/facebook', {
//       title: 'Facebook API',
//       profile: results
//     });
//   });
// };
//

/**
 * GET /api/stripe
 * Stripe API example.
 */
// exports.getStripe = (req, res) => {
//   res.render('api/stripe', {
//     title: 'Stripe API',
//     publishableKey: process.env.STRIPE_PKEY
//   })
// }

/**
 * POST /api/stripe
 * Make a payment.
 */
// exports.postStripe = (req, res) => {
//   const stripeToken = req.body.stripeToken
//   const stripeEmail = req.body.stripeEmail
//   stripe.charges.create({
//     amount: 395,
//     currency: 'usd',
//     source: stripeToken,
//     description: stripeEmail
//   }, (err) => {
//     if (err && err.type === 'StripeCardError') {
//       req.flash('errors', { msg: 'Your card has been declined.' })
//       return res.redirect('/api/stripe')
//     }
//     req.flash('success', { msg: 'Your card has been successfully charged.' })
//     res.redirect('/api/stripe')
//   })
// }

/**
 * GET /api/upload
 * File Upload API example.
 */

exports.getFileUpload = (req, res) => {
  res.render('api/upload', {
    title: 'File Upload'
  })
}

exports.postFileUpload = (req, res) => {
  req.flash('success', { msg: 'File was uploaded successfully.' })
  res.redirect('/api/upload')
}

/**
 * GET /api/pinterest
 * Pinterest API example.
 */
// exports.getPinterest = (req, res, next) => {
//   const token = req.user.tokens.find(token => token.kind === 'pinterest');
//   request.get({ url: 'https://api.pinterest.com/v1/me/boards/', qs: { access_token: token.accessToken }, json: true }, (err, request, body) => {
//     if (err) { return next(err); }
//     res.render('api/pinterest', {
//       title: 'Pinterest API',
//       boards: body.data
//     });
//   });
// };
//
// /**
//  * POST /api/pinterest
//  * Create a pin.
//  */
// exports.postPinterest = (req, res, next) => {
//   req.assert('board', 'Board is required.').notEmpty();
//   req.assert('note', 'Note cannot be blank.').notEmpty();
//   req.assert('image_url', 'Image URL cannot be blank.').notEmpty();
//
//   const errors = req.validationErrors();
//
//   if (errors) {
//     req.flash('errors', errors);
//     return res.redirect('/api/pinterest');
//   }
//
//   const token = req.user.tokens.find(token => token.kind === 'pinterest');
//   const formData = {
//     board: req.body.board,
//     note: req.body.note,
//     link: req.body.link,
//     image_url: req.body.image_url
//   };
//
//   request.post('https://api.pinterest.com/v1/pins/', { qs: { access_token: token.accessToken }, form: formData }, (err, request, body) => {
//     if (err) { return next(err); }
//     if (request.statusCode !== 201) {
//       req.flash('errors', { msg: JSON.parse(body).message });
//       return res.redirect('/api/pinterest');
//     }
//     req.flash('success', { msg: 'Pin created' });
//     res.redirect('/api/pinterest');
//   });
// };
//
// exports.getGoogleMaps = (req, res) => {
//   res.render('api/google-maps', {
//     title: 'Google Maps API'
//   });
// };
