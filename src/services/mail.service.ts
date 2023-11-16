import { Injectable } from '@nestjs/common';
import { MailtrapClient } from 'mailtrap';

@Injectable()
export class MailService {
  private mailtrapClient;

  constructor() {
    const TOKEN = `${process.env.MAILTRAP_TOKEN}`; // Replace with your Mailtrap API token
    const ENDPOINT = 'https://send.api.mailtrap.io/';

    this.mailtrapClient = new MailtrapClient({
      endpoint: ENDPOINT,
      token: TOKEN,
    });
  }
}
