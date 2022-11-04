import ClientService from "../domain/client.service";
import ClientRepository, { IClientProps } from "../domain/client.repository";

export class ClientCreate {
  private clientRepository: ClientRepository;
  private clientService: ClientService;
  
  constructor(repositories: [ClientRepository, ClientService]) {
    const [clientRepository, clientService] = repositories;
    this.clientRepository = clientRepository;
    this.clientService = clientService;
  }

  public async sendMessageAndSave({
    name,
    phone,
    money,
  }: IClientProps) {
    phone = phone.startsWith('598') ? phone : `598${phone}`; // * Phone UY code adition (if doesn't have it yet)
    const responseDBSave = await  this.clientRepository.save({ name, phone, money });
    const responseExSave = await this.clientService.sendMsg({ name, phone, money });
    return { responseDBSave, responseExSave };
  };

  public async isConnected() {
    return this.clientService.getStatus();
  };

  public async logOut() {
    await this.clientService.closeConnection();
  };
};
