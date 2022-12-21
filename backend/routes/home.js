import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.send('Hello - Welcome to Platform');
});
export default router;
