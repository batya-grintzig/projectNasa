const User = require('../modals/user')
const Picture = require('../modals/picture')

const upLoadImage = async (req, res) => {
    let picture = new Picture({
        date: new Date().getUTCFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        title: "The image was uploaded from your computer",
        // url: `${process.cwd()}/${req.file.path}`.replace('\\','/'),
        url: `http://localhost:3400/${req.file.path}`,
        explanation: "The image was uploaded from your computer",
        media_type: "image",
        open:false,
        userId: req.userId
    })
    picture.save().then((picture) => {
        User.findById(picture.userId).populate('userId').then((user) => {
            user.pictures.push(picture._id)
            user.save().then((user) => {
                Picture.find({ userId: user._id }).populate('userId').then((pictures) => {
                    res.status(200).json({ "pictures": pictures, "user": user })
                })
            })
        })
    })
        .catch((err) => {
            res.status(500).json("err")
        })
}

module.exports = { upLoadImage}