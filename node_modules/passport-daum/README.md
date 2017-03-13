# passport-daum


[Passport](http://passportjs.org/) strategy for authenticating with [Daum](http://daum.net/)
using the OAuth 1.0a API.

This module lets you authenticate using Twitter in your Node.js applications.
By plugging into Passport, daum authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-daum

## Usage

#### Configure Strategy

The daum authentication strategy authenticates users using a daum account
and OAuth tokens.  The strategy requires a `verify` callback, which receives the
access token and corresponding secret as arguments, as well as `profile` which
contains the authenticated user's daum nickname.   The `verify` callback must
call `done` providing a user to complete authentication.

In order to identify your application to daum, specify the consumer key,
consumer secret, and callback URL within `options`.  The consumer key and secret
are obtained by [creating an application](http://dna.daum.net) site.

    passport.use(new DaumStrategy({
        userKey: '--insert-daum-user-key-here--'
        , nonce: '--insert-daum-secret-key-here--'
        , callbackURL: "http://127.0.0.1:3000/auth/daum/callback"
      },
      function(userKey, profile, done) {
        User.findOrCreate(profile, function (err, user) {
          done(err, user);
        });
      }
    ));
  

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'daum'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/daum', passport.authenticate('daum'));

     app.get('/auth/daum/callback',
      passport.authenticate('daum', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [signin example](https://github.com/uiandwe/passport-daum-example).


## Credits

  - [Jay Hyeon]

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 uiandwe@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
