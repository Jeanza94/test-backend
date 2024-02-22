import express from "express"

const app = express()
app.use(express.json())

const port = 3000

app.get('/ping', (req, res) => {
    console.log('someone pinged here')
    console.log(req)
    res.send('pong')
})

app.listen(port, () => {
    console.log(`Conectados en el puerto ${port}`)
})