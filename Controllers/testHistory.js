const TestHistory = require('../Models/testHistory')

const CreateTestHistory = async (req, res, next) => {
    try {
        const testHistory = await TestHistory.create(req.body)
        res.status(201).json({ responseCode: 201, status: "CREATED", message: "TestHistory Added Successfully", testHistory: testHistory })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const SingleTestHistory = async (req, res, next) => {
    try {
        const { id } = req.params
        const testHistory = await TestHistory.findById(id)
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "TestHistory Fetched Successfully", testHistory: testHistory })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const AllTestHistory = async (req, res, next) => {
    try {
        const testHistorys = await TestHistory.find()
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "TestHistorys Fetched Successfully", testHistorys: testHistorys })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const UpdateTestHistory = async (req, res, next) => {
    try {
        const { id } = req.params
        const testHistory = await TestHistory.findByIdAndUpdate(id, req.body, { new: true })
        res.status(202).json({ responseCode: 202, status: "UPDATED", message: "TestHistory Updated Successfully", testHistory: testHistory })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


const DeleteTestHistory = async (req, res, next) => {
    try {
        const { id } = req.params
        const testHistory = await TestHistory.findByIdAndDelete(id)
        res.status(202).json({ responseCode: 202, status: "DELETED", message: "TestHistory Deleted Successfully", testHistory: testHistory })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

module.exports = {
    CreateTestHistory,
    SingleTestHistory,
    AllTestHistory,
    UpdateTestHistory,
    DeleteTestHistory
}