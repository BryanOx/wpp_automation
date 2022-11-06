import { Request, Response } from "express";
import { ClientCreate } from '../../application/client.create';

type ClientCtrlMethod = (req: Request, res: Response) => Promise<any>;

class ClientCtrl {
  constructor(private readonly clientCreator: ClientCreate) {};

  public sendCtrl: ClientCtrlMethod = async ({ body }, res) => {
    const { name, phone, money } = body;
    const response = await this.clientCreator.sendMessageAndSave({ name, phone, money });
    res.send(response);
  };

  public isConnectedCtrl: ClientCtrlMethod = async ({ body }, res) => {
    const response = await this.clientCreator.isConnected();
    res.send({ isConnected: response });
  };
};

export default ClientCtrl;
