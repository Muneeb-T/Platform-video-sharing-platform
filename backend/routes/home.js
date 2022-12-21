import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    res.send('Hello - Welcome to Platform video sharing platform');
});
export default router;
