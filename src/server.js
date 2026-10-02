// src/server.js
// Só monta o app: middlewares globais, routers e middleware de erro.
import express from 'express'
import emprestimosRouter from "./routes/emprestimos.routes.js"
// import usersRouter from './routes/users.routes.js'
// import productsRouter from './routes/products.routes.js' // novo

const app = express()

function logger(req, res, next) {
    const inicio = Date.now()

    // 'finish' dispara quando a resposta já foi enviada ao cliente
    res.on('finish', () => {
        const ms = Date.now() - inicio
        console.log(`${req.method} ${req.url} — ${ms}ms`)
    })

    next() // o fluxo segue IMEDIATAMENTE, sem esperar o log
}

app.use(express.json()) // traduz o corpo JSON da requisição
app.use(logger)
app.use("/emprestimos", emprestimosRouter)

app.use((req, res) => {
    res.status(404).json({ erro: 'rota não encontrada' })
})

// src/server.js (trecho)
app.use((err, req, res, next) => {
    const status = err.status ?? 500
    res.status(status).json({ erro: err.message })
})

app.listen(3000)