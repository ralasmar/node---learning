const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).res.json({ message: err.message })
    }
})

//getting one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(req.subscriber)
})

//creating subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber ({
        name: req.body.name,
        subscribedToChannel: 
        req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).res.json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//updating subscriber
//patch updates just the info that is passed instead of all info like put
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        req.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err){
        res.status(400).json({ message: err.message})
    }
})

//deleting subscriber
router.delete('/:id', getSubscriber, async (req,res) => {
    try {
        await res.subscriber.remove()
    } catch (err) {
        res.status(500).json({ message: err.message })
        res.json({ message: "Deleted Subscriber"})
    }
})

//middleware function, next says if we call this move on to next section of code
async function getSubscriber(req, res, next){
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.susbscriber = subscriber
    next ()
}

module.exports = router