import { Injectable } from '@nestjs/common';

@Injectable()
export class StellarService {
  private contractId = process.env.CONTRACT_ID;

  async buildFundEscrowXdr(clientAddress: string, jobId: number, budget: string) {
    return Buffer.from(
      JSON.stringify({
        network: 'TESTNET',
        contractId: this.contractId,
        method: 'fund_escrow',
        args: { clientAddress, jobId, budget },
      }),
    ).toString('base64url');
  }
}
