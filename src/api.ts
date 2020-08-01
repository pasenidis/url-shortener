import express, { Request, Response } from 'express';
import { sanitizeUrl } from '@braintree/sanitize-url';
import monk from 'monk';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import { URLSearchParams } from 'url';
dotenv.config();

const db = monk(String(process.env.DB_CONNECTION));
const links = db.get('links');

const router = express.Router();
router.use(express.json());

router.get('/:id', (req: Request, res: Response) => {
    links.findOne({ link_id: req.params.id })
        .then(docs => {
            return res.status(200).json({ docs });
        })
        .catch(err => {
            return res.status(500).json({ err });
        })
});

router.post('/', (req: Request, res: Response) => {
    if (!req.body.link)
        return res.status(400).json({ message: 'Bad request. Please provide more info in the JSON body.'});
    
    const sanitized = sanitizeUrl(req.body.link);
    links.insert({ link: sanitized, link_id: nanoid() });
    return res.status(200).json({ message: 'Link is shortened successfully! Thank you!'});
});

export default router;