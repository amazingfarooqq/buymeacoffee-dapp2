import { InjectedConnector } from "@web3-react/injected-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// MetaMask
export const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});


// export const WalletConnect = new WalletConnectConnector({
//   rpc: {
//     1: "https://mainnet.infura.io/v3/7a93b9ef35c1445482ba26cc4b8c16f0",
//     4: "https://rinkeby.infura.io/v3/7a93b9ef35c1445482ba26cc4b8c16f0",
//   },
//   infuraId: "7a93b9ef35c1445482ba26cc4b8c16f0",
//   bridge: "https://bridge.walletconnect.org",
//   chainId: 4,
//   qrcode: true,
//   pollingInterval: 12000,
// })