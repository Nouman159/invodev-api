const Doctor = require('../Models/doctor')
const bcrypt = require("bcrypt");

const CreateDoctor = async (req, res, next) => {
    try {
        let { name, phone_no, designation, specialization, email, password } = req.body;
        password = bcrypt.hashSync(password, 10);
        const doctor = await Doctor.create({ name, phone_no, designation, specialization, email, password })
        res.status(201).json({ responseCode: 201, status: "CREATED", message: "Doctor Added Successfully", doctor: doctor })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const SignInDoctor = async (req, res, next) => {
    try {
        let { password, email } = req.body;
        Doctor.findOne({ email: email }).then(u => {
            if (u) {
                bcrypt.compare(password, u.password, (err, response) => {
                    if (err) {
                        if (!err.statusCode) {
                            err.statusCode = 500
                        }
                        next(err)
                    }
                    if (response === true) {
                        res.status(200).json({ responseCode: 200, status: "SUCCESS", message: "Login Successful", doctor: u })

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


const SingleDoctor = async (req, res, next) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findById(id)
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Doctor Fetched Successfully", doctor: doctor })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

const AllDoctor = async (req, res, next) => {
    try {
        const doctors = await Doctor.find()
        res.status(200).json({ responseCode: 200, status: "FETCHED", message: "Doctors Fetched Successfully", doctors: doctors })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

// const UpdateDoctor = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const Doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true })
//         res.status(202).json({ responseCode: 202, status: "UPDATED", message: "Doctor Updated Successfully", Doctor: Doctor })
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500
//         }
//         next(error)
//     }
// }


// const DeleteDoctor = async (req, res, next) => {
//     try {
//         const { id } = req.params
//         const Doctor = await Doctor.findByIdAndDelete(id)
//         res.status(202).json({ responseCode: 202, status: "DELETED", message: "Doctor Deleted Successfully", Doctor: Doctor })
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500
//         }
//         next(error)
//     }
// }

module.exports = {
    CreateDoctor,
    SignInDoctor,
    SingleDoctor,
    AllDoctor,
    // UpdateDoctor,
    // DeleteDoctor
}