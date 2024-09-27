const greeting = (req, res) => {
    res.status(200).send(
        '<h1>WELCOME to CLOUDSAND</h1>'
    );
    
    // res.status(200).json({
    //     msg: 'Welcome cloudsand',
    // });
};

module.exports = { greeting };