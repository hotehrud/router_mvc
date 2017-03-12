const bookmark = require('../../models')['Bookmark'];

exports.index = (req, res) => {
    res.status(200).json({'msg': 'Hello bookmark'});
}

exports.show = (req, res) => {

}

exports.list = (req, res) => {

}

exports.destroy = (req, res) => {

}

exports.create = (req, res) => {
    let id = req.body.search_seq;

    if (!req.user) {
        return res.status(401).json({msg: 'You need login'});
    }

    bookmark.findOne({
        where: {
            bookmark_id: id
        }
    })
        .then(data => {
            if (!data) {

                bookmark.create({
                    bookmark_id: id,
                    bookmark_user: req.user
                })
                    .then(data => {
                        return res.status(200).json({msg: 'success', value: JSON.stringify(data)});
                    })

            } else {
                return res.status(404).json({msg: 'not page found'});
            }
        })
}