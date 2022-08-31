let count = 0;
const viewCount = (req, res, next) => {
    count++;
    console.log(count);

    // res.send('parts found')

    next();
};

module.exports = viewCount;