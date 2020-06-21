require('dotenv').config();

const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rest-api-5jkty.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true })

const app = express()

const Pets = require('./Pets')


const createServer = () => {
    app.get('/pets', async (req, res) => {
        const result = await Pets.find({}).exec()
        res.send(result)
    })

    app.post('/pets', async (req, res) => {
        const { body } = req //nombre, tipo y descripcion

        const pet = new Pets(body)
        await pet.save()
        res.sendStatus(204)
    })

    app.get('/pets/:id/daralta', (req, res) => {
        res.send('dar el alta')
    })

    return app
}
exports.api = functions.https.onRequest(createServer());
