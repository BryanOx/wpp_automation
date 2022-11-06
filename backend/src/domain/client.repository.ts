import { Client } from "./client";

export interface IClientProps {
  name: string;
  phone: string;
  money: string;
};

export type ISendMessageParams = IClientProps & Omit<IClientProps, 'money'>

export default interface ClientRepository {
  save({
    name,
    phone,
    money,
  }: IClientProps): Promise<Client | undefined | null>;
  getDetail(id: string): Promise<Client | undefined | null>;
}