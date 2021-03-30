/* 
    Se o valor não existir vai dar um erro...
    Lógica: ou existe ou gera um erro
 */
function existsOrErro(value, msg) {
    if (!value) throw msg
    if (Array.isArray(value) && value.length === 0) throw msg
    if (typeof value === 'string' && !value.trim()) throw msg
}
/* 
    Se o valor existir vai gerar um ERRO
*/
function notExistsOrErro(value, msg) {
    try {
        existsOrErro(value, msg)
    } catch (msg) {
        return
    }
    throw msg
}
/* 
    Testa 2 valores se são iguais
*/
function equalsOrErro(valueA, valueB, msg) {
    if (valueA !== valueB) throw msg
}

module.exports = { existsOrErro, notExistsOrErro, equalsOrErro }