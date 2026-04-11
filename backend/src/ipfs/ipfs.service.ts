import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IpfsService {
  private pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  async uploadFile(file: Buffer, fileName: string) {
    const formData = new FormData();
    formData.append('file', new Blob([file]), fileName);

    const res = await axios.post(this.pinataUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': process.env.PINATA_API_KEY,
        'pinata_secret_api_key': process.env.PINATA_SECRET,
      },
    });

    return res.data.IpfsHash;
  }
}
