const express = require('express');
const partsControllers = require('../../controllers/parts.controller');
const viewCount = require('../../middleware/viewCount');
const router = express.Router();

// router.get('/', async (req, res) => {
//     res.send('Tools found')
// });

// router.post('/', async (req, res) => {
//     res.send('tool added')
// });


router
    .route('/')
    /**
         * @api {get} /parts All parts
         * @apiDescription Get all the tools
         * @apiPermission admin
         *
         * @apiHeader {String} Authorization   User's access token
         *
         * @apiParam  {Number{1-}}         [page=1]     List page
         * @apiParam  {Number{1-100}}      [limit=10]  Users per page
         *
         * @apiSuccess {Object[]} all the tools.
         *
         * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
         * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .get(partsControllers.getAllParts)
    .post(partsControllers.saveParts);
router.route('/:id').get(viewCount, partsControllers.partsDetail);

module.exports = router;