import { Injectable } from '@nestjs/common';
import { WebAuth, Networks } from '@stellar/stellar-sdk';

@Injectable()
export class Sep10Service {
  private webAuth = new WebAuth(
    Networks.TESTNET,
    process.env.TREASURY_SECRET,
    process.env.TREASURY_ADDRESS,
    'skillflow.app'
  );

  async generateChallenge(address: string) {
    // Generates a cryptographically secure 48-hour challenge transaction
    return this.webAuth.generateChallenge(address);
  }

  async verifySignature(signedXdr: string) {
    try {
      // Verifies that the client signature matches the challenge's expected public key
      const { tx } = await this.webAuth.verifyChallengeTxSigners(signedXdr);
      return true;
    } catch (e) {
      return false;
    }
  }
}
