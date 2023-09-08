import { Router } from 'express';

import { tokenCreationController } from '../controllers';

const loginRoutes: Router = Router();

loginRoutes.post('', tokenCreationController);

export default loginRoutes;
