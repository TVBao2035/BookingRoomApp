const checkAdmin = (req, res, next) => {
    try {
        const groupId = req.user.decode.groupId;
        if (groupId === 1) {
            next();
            return;
        }

        res.status(200).json({
            status: 404,
            message: "You don't have permission!"
        })
    } catch (error) {
        res.status(404).json({
            status: 404,
            message: "You don't have permission!",
            messageError: error
        })
    }
}

module.exports = checkAdmin;