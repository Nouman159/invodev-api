const Patient = require('../Models/patient')
const bcrypt = require("bcrypt");

const CreatePatient = async (req, res, next) => {
    try {
        let { name, gender, age, email, password } = req.body;
        password = bcrypt.hashSync(password, 10);
        const patient = await Patient.create({ name, gender, age, email, password })
        res.status(201).json({ responseCode: 201, status: "CREATED", message: "Patient Added Successfully", patient: patient })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const SignInPatient = async (req, res, next) => {
    try {
        let { password, email } = req.body;
        Patient.findOne({ email: email }).then(u => {
            if (u) {
                bcrypt.compare(password, u.password, (err, response) => {
                    if (err) {
                        if (!err.statusCode) {
                            err.statusCode = 500
                        }
                        next(err)
                    }
                    if (response === true) {
                        res.status(200).json({ responseCode: 200, status: "SUCCESS", message: "Login Successful", patient: u })

                    } else {
                        res.status(200).json({ responseCode: 401, status: "FAILED", message: "Invalid Password " })
                    }
                })
            } else {
                res.status(200).json({ responseCode: 404, status: "NOT_EXIST", message: "Email doesn't Exist" })
            }
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}


const SinglePatient = async (req, res, next) => {
    try {
        const { id } = req.params
        const patient = await Patient.findById(id)
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Patient Fetched Successfully", patient: patient })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const AllPatient = async (req, res, next) => {
    try {
        const patients = await Patient.find()
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Patients Fetched Successfully", patients: patients })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

// const UpdatePatient = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const Patient = await Patient.findByIdAndUpdate(id, req.body, { new: true })
//         res.status(202).json({ responseCode: 202, status: "UPDATED", message: "Patient Updated Successfully", Patient: Patient })
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500
//         }
//         next(error)
//     }
// }


// const DeletePatient = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const Patient = await Patient.findByIdAndDelete(id)
//         res.status(202).json({ responseCode: 202, status: "DELETED", message: "Patient Deleted Successfully", Patient: Patient })
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500
//         }
//         next(error)
//     }
// }

module.exports = {
    CreatePatient,
    SignInPatient,
    SinglePatient,
    AllPatient,
    // UpdatePatient,
    // DeletePatient
}