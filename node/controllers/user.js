const User = require('../modals/user')
const Picture = require('../modals/picture')
const jwt = require('jsonwebtoken')
const request = require("request");
const callAPI = () => {
    const options = {
        method: "GET",
        url:
            "https://api.nasa.gov/planetary/apod?api_key=u2EroGUnCCLLeZKF25NvatW8wXcJkQXwGmBHeAPx"
    };
    return new Promise(function (resolve, reject) {
        request(options, function (err, res, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
           
            }
        });
    });
}

const createUser = async (req, res) => {

    let user = new User(req.body)
    user.save().then((user) => {
        callAPI()
            .then((body) => {
                let parsedData = JSON.parse(body);
                let picture = new Picture({
                    date: parsedData.date,
                    explanation: parsedData.explanation,
                    hdurl: parsedData.hdurl,
                    media_type: parsedData.media_type,
                    service_version: parsedData.service_version,
                    title: parsedData.title,
                    url: parsedData.url,
                    open:false,
                    userId: user._id
                })
                picture.save().then((newPicture) => {

                    user.pictures.push(newPicture._id)
                    user.save().then(() => {
                        Picture.find({ userId: user._id }).populate('userId')
                            .then((pic) => {
                                let token = jwt.sign(req.body, process.env.SECERT)
                                res.status(200).json({ picture: newPicture, user: user, pic: pic, token: token })
                            })
                    })
                })
            })

    })
        .catch((err) => {

            res.status(500).json({ "err": err })
        })
}
const loginUser = async (req, res) => {
    let { password, email } = req.body
    User.findOne({ password: password, email: email })
        .then((user) => {
            if (user === null) {
              return   res.status(500).json({ err: "Incorrect username and password" })
            }
            let token = jwt.sign(req.body, process.env.SECERT)
            callAPI()
                .then((body) => {
                    let parsedData = JSON.parse(body);
                    let picture = new Picture({
                        date: parsedData.date,
                        explanation: parsedData.explanation,
                        hdurl: parsedData.hdurl,
                        media_type: parsedData.media_type,
                        service_version: parsedData.service_version,
                        title: parsedData.title,
                        url: parsedData.url,
                        open:false,
                        userId: user._id
                    })
                    Picture.findOne({ userId: user._id, url: picture.url }).then((findPicture) => {
                        if (findPicture !== null) {
                            Picture.find({ userId: user._id }).populate('userId')
                                .then((pic) => {
                                  return  res.status(200).json({ picture: findPicture, user: user, token: token, pic: pic })
                                })
                        } else {
                            picture.save().then((newPicture) => {
                                user.pictures.push(newPicture._id)
                                user.save().then(() => {
                                    Picture.find({ userId: user._id }).populate('userId')
                                        .then((pic) => {
                                            res.status(200).json({ picture: newPicture, user: user, token: token, pic: pic })
                                        })
                                })
                            })
                        }
                    })

                })
        })
        .catch((err) => {
            res.status(500).json("err")
        })
}


module.exports = { createUser, loginUser }