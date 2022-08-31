const parts = [
    { id: 1, name: 'abul' },
    { id: 2, name: 'kabul' },
    { id: 3, name: 'babul' },
    { id: 4, name: 'habul' },
]

module.exports.getAllParts = async (req, res, next) => {
    const { limit, page } = req.query;
    res.json(parts)
};

module.exports.saveParts = async (req, res) => {
    console.log(req.body)
    parts.push(req.body);
    res.send(parts)
}

module.exports.partsDetail = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    // const filter = { _id: id }
    const foundPart = parts.find(part => part.id == id)
    res.status(200).send({
        success: true,
        messages: 'Success',
        data: foundPart
    });
    // res.status(500).send({
    //     success: false,
    //     error: 'Internal server error'
    // })
}