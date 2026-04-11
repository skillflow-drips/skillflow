import { Transaction, Keypair, Networks } from '@stellar/stellar-sdk';

/**
 * Signs a SEP-10 challenge transaction locally.
 * This is used for client-side authentication flow.
 */
export async function signChallenge(challengeXdr: string, userSecret: string, network: string = 'TESTNET') {
  const tx = new Transaction(challengeXdr, network === 'TESTNET' ? Networks.TESTNET : Networks.PUBLIC);
  const keypair = Keypair.fromSecret(userSecret);
  
  tx.sign(keypair);
  
  return tx.toXDR();
}

/**
 * Note: In a real browser environment, we would use a wallet extension 
 * like Freighter or Lobstr instead of requesting the secret key.
 */
