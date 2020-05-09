const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { secret } = require('./../config');

const User = require('./../models/User');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});


// We are letting passport know that they can now authenticate users using 'jwt' as their string
// when they call passport.authenticate('jwt')
passport.use(jwtAuth);

