import { v4 } from "uuid";
import { Client } from "../../domain/client";
import ClientRepository, { IClientProps } from "../../domain/client.repository";

class MockRepository implements ClientRepository {
  save({ name, phone, money, }: IClientProps): Promise<Client> {
    const MOCK_CLIENT: Client = {
      uuid: v4(),
      name: name,
      phone: phone,
    };
    return Promise.resolve(MOCK_CLIENT);
  }
  getDetail(id: string): Promise<Client> {
    throw new Error("Method not implemented.");
  }

}

export default MockRepository;
