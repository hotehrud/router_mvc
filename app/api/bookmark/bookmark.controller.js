const Bookmark = require('../../models')['Bookmark'];

exports.index = (req, res) => {
    res.status(200).json({'msg': 'Hello bookmark'});
}

exports.show = (req, res) => {
    let id = req.params.id;
    let user = req.user;

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    Bookmark.findOne({
        where: {
            bookmark_id: id
        }
    })
        .then(result => {

            return result ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        });
}

exports.list = (req, res) => {
    let pageno = req.query.pageno ? req.query.pageno * 10 : 0;
    let user = req.user;

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    Bookmark.findAll({
        offset: pageno,
        limit: 10
    })
        .then(result => {

            return result.length ? res.status(200).json(result) : res.status(200).json({message: 'empty'})

        })
}

exports.destroy = (req, res) => {
    let id = req.params.id;
    let user = req.user;

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    Bookmark.destroy({
        where: {
            bookmark_id: id,
            bookmark_user: user
        }
    })
        .then(bookmark => {
            if (!bookmark) {
                return res.status(404).json({error: 'No Bookmark'});
            }
            return res.status(204).send();
        });
}

exports.create = (req, res) => {
    let id = req.body.search_seq;
    let user = req.user;

    if (!user) {
        return res.status(401).json({msg: 'You need login'});
    }

    Bookmark.findOne({
        where: {
            bookmark_id: id
        }
    })
        .then(data => {
            if (!data) {

                Bookmark.create({
                    bookmark_id: id,
                    bookmark_user: user
                })
                    .then(data => {
                        return res.status(200).json({msg: 'success', value: JSON.stringify(data)});
                    })

            } else {
                return res.status(404).json({msg: 'not page found'});
            }
        })
}