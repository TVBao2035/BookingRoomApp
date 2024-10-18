const db = require('../models');
const UserRouter = require('./UserRouter.js');
const RoomRouter = require('./RoomRouter.js');
const ContractRouter = require('./ContractRouter.js');
const PhotoRouter = require('./PhotoRouter.js');
const GroupRouter = require('./GroupRouter.js');
const HistoryRouter = require('./HistoryRouter.js');
const CommentRouter = require('./CommentRouter.js');
const LikeRouter = require('./LikeRouter.js');
const ServiceRouter = require('./ServiceRouter.js');
const RoomServiceRouter = require('./RoomServiceRouter.js');
const router = (app) => {

    app.use('/user', UserRouter);

    app.use('/room', RoomRouter);
    
    app.use('/contract', ContractRouter);
    
    
    app.use('/photo', PhotoRouter);
    
    app.use('/group', GroupRouter);
  
    app.use('/history', HistoryRouter);
    
    app.use('/role', async (req, res) => {
        const data = await db.Role.findAll({
            include: db.Group
        })
        res.send(data)
    });
    app.use('/comment', CommentRouter);
    app.use(`/like`, LikeRouter);

    app.use(`/service`, ServiceRouter);
    app.use(`/roomService`, RoomServiceRouter);
}

module.exports = router;