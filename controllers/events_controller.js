const {getAllEvents, getEventById, addEvent, deleteEvent, updateEvent} = require("../utils/events_utilities")
const { restart } = require("nodemon")

const getEvents = function (req, res) {
    getAllEvents().exec((err, events) => {

        if (err) {
            res.status(500)
        return res.json({
            error: err.message
        })
        }
        res.send(events)
    })
}

const getEvent = function (req, res) {
    getEventById(req.params.id).exec((err, event) => {
        if (err) {
            res.status(404)
            return res.send("Event not found!")
        }
        res.send(event)
    })
}

const postEvent = function (req, res) {
    // Save the Event Instance from addEvent
    addEvent(req.body).save((err, event) => {
        if (err) {
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.status(201)
        res.send(event)
    })
}

const removeEvent = function (req, res) {
    deleteEvent(req.params.id).exec((err) => {
        if (err) {
            res.status(500)
            return res.json({
                error: err.message
            })
        }
        res.sendStatus(204)
    })
}

const changeEvent = function (req, res) {
    updateEvent(req).exec((err, event) => {
        if (err) {
            res.status(500)
            return res.json ({
                error: err.message
            })
        }
        res.status(200)
        res.send(event)
    })
}

const userAuthenticated = function(req,res,next){
    if (req.isAuthenticated()){
        next()
    }else{
        res.sendStatus(403)
    }
}

module.exports = {getEvents, getEvent, postEvent, removeEvent, changeEvent, userAuthenticated}