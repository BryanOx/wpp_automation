class BackConnection {
  #backUrl = '127.0.0.1:3030/';

  isConnected() {
    try {
      fetch(`${this.#backUrl}/client/isConnected`, {
        body: {},
        method: 'POST',
      })
      .then(res => res.json())
      .then(res => {
        console.log({ res });
      })
    } catch (error) {
      console.log({ error: error.message });
    }
  }

  checkForQR() {
    const qrOnDom = document.getElementById('qr-wpp-login');
    const image = document.createElement('img');
    image.src = '../../tmp/qr.svg';
    qrOnDom.append(image);
  };
}
