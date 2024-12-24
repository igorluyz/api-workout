import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const app = express();

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000

app.post('/usuarios', async (req, res) => {
    
    await prisma.training.create({
        data: {
            name: req.body.name,
            muscle: req.body.muscle,
            activationArea: req.body.activationArea,
            currentLoad: req.body.currentLoad,
            series: req.body.series,
            repetitions: req.body.repetitions,
            trainingVolume: req.body.trainingVolume,
            trainingDay: req.body.trainingDay
        }
    })

    res.status(201).json({ message: "Treino cadastrado" })
})

app.get('/usuarios', async (req, res) => {

    let trainings = []

    if (req.query) {
        trainings = await prisma.training.findMany({
            where: {
            name: req.query.name,
            muscle: req.query.muscle,
            activationArea: req.query.activationArea,
            currentLoad: req.query.currentLoad,
            series: req.query.series,
            repetitions: req.query.repetitions,
            trainingVolume: req.query.trainingVolume,
            trainingDay: req.query.trainingDay
            }
        })
    }else {
        trainings = await prisma.training.findMany()
    }

    res.status(200).json(trainings)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.training.update({
        where: {
            id: req.params.id
        },
        data: {
            name: req.body.name,
            muscle: req.body.muscle,
            activationArea: req.body.activationArea,
            currentLoad: req.body.currentLoad,
            series: req.body.series,
            repetitions: req.body.repetitions,
            trainingVolume: req.body.trainingVolume,
            trainingDay: req.body.trainingDay
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.training.delete({
        where: { 
            id: req.params.id
        }
    })

    res.status(200).json({message: 'Usuário deletado'})
})

app.listen(port, () => {
    console.log(`App rodando na porta: ${port}`)
})