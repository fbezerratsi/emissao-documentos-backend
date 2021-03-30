const User = require('../model/User')

const authSecret = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = {
    async signin (req, res) {
        if (!req.body.cpf || !req.body.password) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await User.findOne({ where: { cpf: req.body.cpf } })

        if (!user) return res.status(400).send('Usuário não encontrado!') 

        const isMatch = bcrypt.compareSync(req.body.password, user.password)

        if (!isMatch) return res.status(401).send('Cpf/Senha inválidos!')

        
        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            emitido_em: now,
            expira: now + (60 * 60 * 24 * 3)
        }

        return res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    },

    validateToken(req, res) {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com token
            console.log("authSecret diferente")
        }

        return res.send(false)
    }

    //return { signin, validateToken }
}