const admin = (role) => {
    return (req, res, next) => {
        const user = req.user;

        if (user.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = admin