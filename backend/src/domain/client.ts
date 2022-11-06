import { v4 as uuid } from 'uuid';
import { IClientProps } from './client.repository';

export class Client {
  readonly uuid: string;
  readonly name: string;
  readonly phone: string;

  constructor({ name, phone }: IClientProps) {
    this.uuid = uuid();
    this.name = name;
    this.phone = phone;
  };
};
