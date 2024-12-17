// import express from 'express';
// import { clerkWebHook } from '../controllers/webhook.controller.js';
// import bodyParser from 'body-parser';

// const router = express.Router();

// // router.post("/clerk", bodyParser.raw({type: 'application/json'}), clerkWebHook);
// router.post("/clerk", express.raw({ type: 'application/json' }), // Parse raw JSON for svix verification
//     clerkWebHook
// );

// export default router;

import express from 'express';
import { clerkWebHook } from '../controllers/webhook.controller.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Apply bodyParser.raw only for Clerk's webhook route
router.post("/clerk", bodyParser.raw({ type: 'application/json' }), clerkWebHook);

export default router;
