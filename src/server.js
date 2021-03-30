const express = require('express')
const app = express()
const routes = require('./routes')


require('./config/db')

app.use(express.json())
app.use(routes)
app.disable('x-powered-by') // Remover da resposta HTTP (header: x-powered-by) a referência de que o Express/Node compõem a lista de tecnologias utilizadas, isso irá afastar rotinas mais simples de varredura e ataques automatizados
app.listen(3000, () => {
    console.log('Executando...') 
})

