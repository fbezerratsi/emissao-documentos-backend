const User = require('../model/User')

const authSecret = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = {
    passaporte() {

        const params = {
            secretOrKey: authSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }

        const strategy = new Strategy(params, (payload, done) => {
            User.findOne({
                where: {
                    id: payload.id
                }
            }).then(user => done(null, user ? { ...payload } : false )).catch(err => done(err, false))
        })

        passport.use(strategy)

        return {
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    }
}