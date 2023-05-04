import functions from "firebase-functions"
import express from 'express'
import cors from 'cors'
import { getAnalysis } from "./src/utils.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/test', (req, res) => res.send('Hello World!'))
app.post('/sentiment', getAnalysis)

export const api = functions.https.onRequest(app)