require('dotenv').config();

const functions = require('firebase-functions');
const express = require('express')
const mongoose = require('mongoose')



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rest-api-5jkty.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true })

const app = express()

const Pets = require('./Pets')


const createServer = () => {
    app.get('/pets', (req, res) => {
        const pet = new Pets({
            nombre: 'cabezon!',
            tipo: 'gato',
            descripcion: 'muy mañoso',
        })
        pet.save()
        res.send('datos se guardaron los datos prueba!')
    })

    app.post('/pets', (req, res) => {
        res.send('creando mascota')
    })

    app.get('/pets/:id/daralta', (req, res) => {
        res.send('dar el alta')
    })

    return app
}
exports.api = functions.https.onRequest(createServer());
