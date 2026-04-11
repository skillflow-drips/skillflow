import { Injectable } from '@nestjs/common';
import { TransactionBuilder, Networks, Contract, xdr, Address } from '@stellar/stellar-sdk';

@Injectable()
export class StellarService {
  private contractId = process.env.CONTRACT_ID;

  async buildFundEscrowXdr(clientAddress: string, jobId: number, budget: string) {
    const contract = new Contract(this.contractId);
    
    // Constructing the Fund Escrow invocation
    const tx = new TransactionBuilder(
      { sequence: "0", fee: "100" },
      { networkPassphrase: Networks.TESTNET }
    ).addOperation(
      contract.call(
        "fund_escrow",
        xdr.ScVal.scvAddress(Address.fromString(clientAddress).toScAddress()),
        xdr.ScVal.scvU64(xdr.Uint64.fromString(jobId.toString())),
        xdr.ScVal.scvI128(xdr.Int128.fromString(budget))
      )
    ).build();

    return tx.toXDR();
  }
}
