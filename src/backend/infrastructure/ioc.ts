import { ContainerBuilder } from "node-dependency-injection";
import { ClientCreate } from "../application/client.create";
import ClientCtrl from "./controller/client.ctrl";
import MockRepository from './repositories/mock.repository';
import WPPTransporter from './service/wpp.service';

const container = new ContainerBuilder();

container.register("wpp.transporter", WPPTransporter);
const wppTransporter = container.get('wpp.transporter');

container.register("db.repository", MockRepository);
const dbRepository = container.get('db.repository');

container
  .register('client.creator', ClientCreate)
  .addArgument([dbRepository, wppTransporter]);

const clientCreator = container.get('client.creator');

container.register('client.ctrl', ClientCtrl).addArgument(clientCreator);

export default container;
