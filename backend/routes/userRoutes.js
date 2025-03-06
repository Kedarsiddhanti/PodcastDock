const express = require('express');
const router = express.Router();


const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};

router.get('/', (req, res) => {
  res.json(mockUser);
});

module.exports = router;