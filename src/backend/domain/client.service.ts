import { IClientProps } from "./client.repository";

export default interface ClientService {
  sendMsg({
    name,
    phone,
    money,
  }: IClientProps): Promise<any>;
  closeConnection(): Promise<void>;
  getStatus(): boolean;
}