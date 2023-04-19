import 'module-alias/register';
import UserController from '@/controllers/user.controller';
import config from '@/core/config';
import App from '@/core/app';

const app = new App([UserController], config.port);
app.listen();