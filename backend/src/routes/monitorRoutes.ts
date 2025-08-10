import express from 'express'
import { Request, Response } from 'express'
const router = express.Router();


// 1. Create a new monitor (name, URL, interval) - POST '/'
router.post('/', (req: Request, res: Response) => {

})

// 2. List all monitors with their latest status. - GET /
router.get('/', (req: Request, res: Response) => {

})
// 3. Get details of a single monitor (no history). - GET /:id
router.get('/:id', (req: Request, res: Response) => {

})
// 4. Get full ping history for that monitor. - GET /:id/history
router.get('/:id/history', (req: Request, res: Response) => {

})
// 5. Remove a monitor (and optionally its history).DELETE /:id
router.delete('/:id', (req: Request, res: Response) => {

})
