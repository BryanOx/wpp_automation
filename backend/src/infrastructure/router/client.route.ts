import { Router } from "express";
import ClientCtrl from '../controller/client.ctrl';
import container from '../ioc';

const router: Router = Router();

const clientCtrl: ClientCtrl = container.get('client.ctrl');
router.post('/sendMessage', clientCtrl.sendCtrl);
router.post('/isConnected', clientCtrl.isConnectedCtrl);

export { router };
