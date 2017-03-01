
exports.index = (req, res) => {
    return res.status(200).json({message: "Hello Keyword"});
}

exports.create = (req, res) => {
    return res.status(200).json(req.body);
}