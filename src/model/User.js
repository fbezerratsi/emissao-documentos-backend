const { Model, DataTypes } = require('sequelize')


class User extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
        }, {
            sequelize: connection
        })
    }
    //static associate(models) {
    //    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' })
    //    this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
    //}
}

module.exports = User