export const generateSep7PayUrl = (destination: string, amount: string, memo: string) => {
  const baseUrl = 'web+stellar:pay';
  const params = new URLSearchParams({
    destination,
    amount,
    memo,
    msg: 'SkillFlow Milestone Payment',
    network_passphrase: 'Test SDF Network ; September 2015'
  });

  return `\${baseUrl}?\${params.toString()}`;
};

export const generateSep7TxUrl = (xdr: string) => {
  return `web+stellar:tx?xdr=\${encodeURIComponent(xdr)}`;
};
