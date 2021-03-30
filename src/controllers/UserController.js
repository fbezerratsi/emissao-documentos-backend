const User = require('../model/User')
const bcrypt = require('bcrypt-nodejs')
const { existsOrErro, notExistsOrErro, equalsOrErro } = require('../model/validacaoUser');
//const { delete } = require('../routes');

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

module.exports =  {

    async getById(req, res) {

        await User.findOne({ where: { id: req.params.id } })
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))

    },
    async get(req, res) {
        await User.findAll()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    },
    async save(req, res) {

        const user = { ...req.body }

        if (req.params.id) user.id = req.params.id
        
        try {
            existsOrErro(user.nome, "Nome não informado")
            existsOrErro(user.cpf, "CPF não informado")
            existsOrErro(user.email, "E-mail não informado")
            existsOrErro(user.password, "Senha não informado")
            existsOrErro(user.confirmPassword, "Confirmação de senha não informada")
            equalsOrErro(user.password, user.confirmPassword, "Senhas não conferem")

            const userFromDB = await User.findOne({ where: { cpf: user.cpf } })
            if (!user.id) {
                notExistsOrErro(userFromDB, "Usuário já cadastrado")
            }
            
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        if (user.id) { // Atualizar um usuário no banco
            await User.update(user, { where: { id: user.id } })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else { // Inserir um usuário no banco
            await User.create(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }
}