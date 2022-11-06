import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from 'qr-image';
import ClientService from "../../domain/client.service";
import { IClientProps, ISendMessageParams } from "../../domain/client.repository";

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

    this.on('message', (message) => {
      console.log({ author: message.from, body: message.body });
      switch(message.body.toLowerCase()) {
        case 'ping!':
          this.sendMsg({ name: '', phone: message.from, message: 'Pong!' });
          break;
        case 'te amo':
          this.sendMsg({ name: '', phone: message.from, message: 'Te amo mass!' });
          break;
        default:
          this.sendMsg({ name: '', phone: message.from, message: 'Mensaje automático de respuesta' });
          break;
      };
    })
  };

  async sendMsg({ name, phone, message: msg }: any): Promise<any> {
      try {
        const isSerialized = phone.endsWith('@c.us')
        if (!this.status) return Promise.resolve({ error: 'ESPERANDO LOGIN' });
        const message = msg ? msg : this.generateMessage(name);
        console.log(`Intentando obtener el numberId de: ${phone}`);
        const phoneDetails = await this.getNumberId(phone);
        console.log({ phoneDetails, phone });
        const response = await this.sendMessage(isSerialized ? phone : phoneDetails?._serialized!, message)
        return { id: response.id.id };
      } catch (error: any) {
        return Promise.resolve({ error: error.message });
      };
  };

  getStatus(): boolean {
    return this.status;
  };

  closeConnection(): Promise<void> {
    return this.logout();
  };

  private generateImage = (base64: string) => {
    const path = `${process.cwd()}/../shared/tmp`;
    console.log({ path });
    let qr_svg = imageQr(base64, { type: 'svg', margin: 4 });
    qr_svg.pipe(require('fs').createWriteStream(`${path}/qr.svg`));
    console.log('QR Se regenera cada 60 segúndos');
    // TODO: Create event emitters to listen and update in the front the QR Code
  };

  private generateMessage = (name: string): string => {
    return `Hola ${name}, como estás?
Te escribo para recordarte que hoy tendrías que cambiar el prefiltro de tu purificador PSA!
Cualquier cosa que necesites a las ordenes!
Que tengas un lindo día ☺️ Saludos,
Sabrina.
`;
  };
};

export default WPPTransporter;
