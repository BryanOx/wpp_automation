import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from 'qr-image';
import ClientService from "../../domain/client.service";
import { IClientProps } from "../../domain/client.repository";

class WPPTransporter extends Client implements ClientService {
  private status = false;

  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true },
    });

    console.log('Iniciando...');

    this.initialize();
    this.on('ready', () => {
      this.status = true;
      console.log('LOGUEADO CORRECTAMENTE');
    });

    this.on('auth_failure', () => {
      this.status = false;
      console.log('HUBO UN FALLO AL LOGUEARTE');
    });

    this.on('qr', (qr) => {
      this.generateImage(qr);
    });
  };

  async sendMsg({ name, phone, money, }: IClientProps): Promise<any> {
      try {
        if (!this.status) return Promise.resolve({ error: 'ESPERANDO LOGIN' });
        const message = this.generateMessage(name, money);
        console.log(`Intentando obtener el numberId de: ${phone}`);
        const phoneDetails = await this.getNumberId(phone);
        console.log({ phoneDetails, phone });
        const response = await this.sendMessage(phoneDetails?._serialized!, message)
        return { id: response.id.id };
      } catch (error: any) {
        return Promise.resolve({ error: error.message });
      };
  }

  getStatus(): boolean {
    return this.status;
  };

  closeConnection(): Promise<void> {
    return this.logout();
  };

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/tmp`;
    let qr_svg = imageQr(base64, { type: 'svg', margin: 4 });
    qr_svg.pipe(require('fs').createWriteStream(`${path}/qr.svg`));
    console.log('QR Se regenera cada 60 segúndos');
    // TODO: Create event emitters to listen and update in the front the QR Code
  };

  private generateMessage = (name: string, money: string): string => {
    return `Hola ${name}, como estás?
Te escribo para recordarte que hoy tendrías que cambiar el prefiltro de tu purificador PSA!
Cualquier cosa que necesites a las ordenes!
Que tengas un lindo día ☺️ Saludos,
Sabrina.
`;
  };
};

export default WPPTransporter;
