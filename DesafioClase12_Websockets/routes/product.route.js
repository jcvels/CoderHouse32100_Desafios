const router = require('express').Router();

router.get('/', (req, res) => {
    res.render(`pages/main`);
});

module.exports = router;