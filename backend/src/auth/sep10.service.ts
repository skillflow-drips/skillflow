import { Injectable } from '@nestjs/common';
import { Keypair } from '@stellar/stellar-sdk';

@Injectable()
export class Sep10Service {
  async generateChallenge(address: string) {
    Keypair.fromPublicKey(address);

    return Buffer.from(
      JSON.stringify({
        address,
        domain: 'skillflow.app',
        nonce: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      }),
    ).toString('base64url');
  }

  async verifySignature(signedXdr: string) {
    try {
      return signedXdr.length > 0;
    } catch (e) {
      return false;
    }
  }
}
