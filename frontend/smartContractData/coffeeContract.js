
     export const coffeeContractAddress = "0x6A98e7030382FCE2C9Ae2E43458036996395e212"
     export const coffeeContractjson = {
  "_format": "hh-sol-artifact-1",
  "contractName": "CoffeContract",
  "sourceName": "contracts/CoffeContract.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_pagename",
          "type": "string"
        }
      ],
      "name": "RegisterPage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_pageid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_coffePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "coffees",
          "type": "uint256"
        }
      ],
      "name": "buyCoffee",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "checkpageaddress",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "checkpagename",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pageaddress",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pageid",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pagename",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405260018055336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610fb5806100576000396000f3fe6080604052600436106100705760003560e01c8063897d282e1161004e578063897d282e1461011a578063cb21c12814610157578063e4bf293714610180578063f8f37572146101bd57610070565b80635e609fb31461007557806364447806146100b257806367382e8c146100ef575b600080fd5b34801561008157600080fd5b5061009c60048036038101906100979190610899565b6101d9565b6040516100a99190610aa6565b60405180910390f35b3480156100be57600080fd5b506100d960048036038101906100d49190610858565b61020c565b6040516100e69190610ac1565b60405180910390f35b3480156100fb57600080fd5b50610104610242565b6040516101119190610b9e565b60405180910390f35b34801561012657600080fd5b50610141600480360381019061013c9190610899565b610248565b60405161014e9190610adc565b60405180910390f35b34801561016357600080fd5b5061017e60048036038101906101799190610858565b6102e8565b005b34801561018c57600080fd5b506101a760048036038101906101a2919061082f565b610509565b6040516101b49190610ac1565b60405180910390f35b6101d760048036038101906101d291906108c2565b610529565b005b60056020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6002818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b60015481565b6004602052806000526040600020600091509050805461026790610d37565b80601f016020809104026020016040519081016040528092919081815260200182805461029390610d37565b80156102e05780601f106102b5576101008083540402835291602001916102e0565b820191906000526020600020905b8154815290600101906020018083116102c357829003601f168201915b505050505081565b6002816040516102f89190610a7a565b908152602001604051809103902060009054906101000a900460ff1615610354576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034b90610b1e565b60405180910390fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156103e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d890610b7e565b60405180910390fd5b60016002826040516103f39190610a7a565b908152602001604051809103902060006101000a81548160ff0219169083151502179055506001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508060046000600154815260200190815260200160002090805190602001906104999291906106fa565b503360056000600154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600081548092919061050190610d9a565b919050555050565b60036020528060005260406000206000915054906101000a900460ff1681565b60006005600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000828461056f9190610c41565b9050803410156105b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ab90610afe565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156106b85760008273ffffffffffffffffffffffffffffffffffffffff168260405161062c90610a91565b60006040518083038185875af1925050503d8060008114610669576040519150601f19603f3d011682016040523d82523d6000602084013e61066e565b606091505b50509050806106b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a990610b5e565b60405180910390fd5b506106f3565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ea90610b3e565b60405180910390fd5b5050505050565b82805461070690610d37565b90600052602060002090601f016020900481019282610728576000855561076f565b82601f1061074157805160ff191683800117855561076f565b8280016001018555821561076f579182015b8281111561076e578251825591602001919060010190610753565b5b50905061077c9190610780565b5090565b5b80821115610799576000816000905550600101610781565b5090565b60006107b06107ab84610bde565b610bb9565b9050828152602081018484840111156107c857600080fd5b6107d3848285610cf5565b509392505050565b6000813590506107ea81610f51565b92915050565b600082601f83011261080157600080fd5b813561081184826020860161079d565b91505092915050565b60008135905061082981610f68565b92915050565b60006020828403121561084157600080fd5b600061084f848285016107db565b91505092915050565b60006020828403121561086a57600080fd5b600082013567ffffffffffffffff81111561088457600080fd5b610890848285016107f0565b91505092915050565b6000602082840312156108ab57600080fd5b60006108b98482850161081a565b91505092915050565b6000806000606084860312156108d757600080fd5b60006108e58682870161081a565b93505060206108f68682870161081a565b92505060406109078682870161081a565b9150509250925092565b61091a81610cad565b82525050565b61092981610cbf565b82525050565b600061093a82610c0f565b6109448185610c25565b9350610954818560208601610d04565b61095d81610e70565b840191505092915050565b600061097382610c0f565b61097d8185610c36565b935061098d818560208601610d04565b80840191505092915050565b60006109a6601b83610c25565b91506109b182610e81565b602082019050919050565b60006109c9601283610c25565b91506109d482610eaa565b602082019050919050565b60006109ec601283610c25565b91506109f782610ed3565b602082019050919050565b6000610a0f601483610c25565b9150610a1a82610efc565b602082019050919050565b6000610a32600083610c1a565b9150610a3d82610f25565b600082019050919050565b6000610a55601583610c25565b9150610a6082610f28565b602082019050919050565b610a7481610ceb565b82525050565b6000610a868284610968565b915081905092915050565b6000610a9c82610a25565b9150819050919050565b6000602082019050610abb6000830184610911565b92915050565b6000602082019050610ad66000830184610920565b92915050565b60006020820190508181036000830152610af6818461092f565b905092915050565b60006020820190508181036000830152610b1781610999565b9050919050565b60006020820190508181036000830152610b37816109bc565b9050919050565b60006020820190508181036000830152610b57816109df565b9050919050565b60006020820190508181036000830152610b7781610a02565b9050919050565b60006020820190508181036000830152610b9781610a48565b9050919050565b6000602082019050610bb36000830184610a6b565b92915050565b6000610bc3610bd4565b9050610bcf8282610d69565b919050565b6000604051905090565b600067ffffffffffffffff821115610bf957610bf8610e41565b5b610c0282610e70565b9050602081019050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000610c4c82610ceb565b9150610c5783610ceb565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610c9057610c8f610de3565b5b828202905092915050565b6000610ca682610ccb565b9050919050565b6000610cb882610ccb565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015610d22578082015181840152602081019050610d07565b83811115610d31576000848401525b50505050565b60006002820490506001821680610d4f57607f821691505b60208210811415610d6357610d62610e12565b5b50919050565b610d7282610e70565b810181811067ffffffffffffffff82111715610d9157610d90610e41565b5b80604052505050565b6000610da582610ceb565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610dd857610dd7610de3565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f496e73756666696369656e742045746865722070726f76696465640000000000600082015250565b7f7061676520616c72656164792065786973740000000000000000000000000000600082015250565b7f4e6f2070616765206e616d652065786973740000000000000000000000000000600082015250565b7f4661696c656420746f2073656e64204d6f6e6579000000000000000000000000600082015250565b50565b7f6164647265737320616c72656164792065786973740000000000000000000000600082015250565b610f5a81610c9b565b8114610f6557600080fd5b50565b610f7181610ceb565b8114610f7c57600080fd5b5056fea264697066735822122053bc6dcd16e45ca9e497fdc0f2eed5facde95f086199608d7ffec684bf50166764736f6c63430008040033",
  "deployedBytecode": "0x6080604052600436106100705760003560e01c8063897d282e1161004e578063897d282e1461011a578063cb21c12814610157578063e4bf293714610180578063f8f37572146101bd57610070565b80635e609fb31461007557806364447806146100b257806367382e8c146100ef575b600080fd5b34801561008157600080fd5b5061009c60048036038101906100979190610899565b6101d9565b6040516100a99190610aa6565b60405180910390f35b3480156100be57600080fd5b506100d960048036038101906100d49190610858565b61020c565b6040516100e69190610ac1565b60405180910390f35b3480156100fb57600080fd5b50610104610242565b6040516101119190610b9e565b60405180910390f35b34801561012657600080fd5b50610141600480360381019061013c9190610899565b610248565b60405161014e9190610adc565b60405180910390f35b34801561016357600080fd5b5061017e60048036038101906101799190610858565b6102e8565b005b34801561018c57600080fd5b506101a760048036038101906101a2919061082f565b610509565b6040516101b49190610ac1565b60405180910390f35b6101d760048036038101906101d291906108c2565b610529565b005b60056020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6002818051602081018201805184825260208301602085012081835280955050505050506000915054906101000a900460ff1681565b60015481565b6004602052806000526040600020600091509050805461026790610d37565b80601f016020809104026020016040519081016040528092919081815260200182805461029390610d37565b80156102e05780601f106102b5576101008083540402835291602001916102e0565b820191906000526020600020905b8154815290600101906020018083116102c357829003601f168201915b505050505081565b6002816040516102f89190610a7a565b908152602001604051809103902060009054906101000a900460ff1615610354576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034b90610b1e565b60405180910390fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156103e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d890610b7e565b60405180910390fd5b60016002826040516103f39190610a7a565b908152602001604051809103902060006101000a81548160ff0219169083151502179055506001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508060046000600154815260200190815260200160002090805190602001906104999291906106fa565b503360056000600154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600081548092919061050190610d9a565b919050555050565b60036020528060005260406000206000915054906101000a900460ff1681565b60006005600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000828461056f9190610c41565b9050803410156105b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ab90610afe565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156106b85760008273ffffffffffffffffffffffffffffffffffffffff168260405161062c90610a91565b60006040518083038185875af1925050503d8060008114610669576040519150601f19603f3d011682016040523d82523d6000602084013e61066e565b606091505b50509050806106b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106a990610b5e565b60405180910390fd5b506106f3565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ea90610b3e565b60405180910390fd5b5050505050565b82805461070690610d37565b90600052602060002090601f016020900481019282610728576000855561076f565b82601f1061074157805160ff191683800117855561076f565b8280016001018555821561076f579182015b8281111561076e578251825591602001919060010190610753565b5b50905061077c9190610780565b5090565b5b80821115610799576000816000905550600101610781565b5090565b60006107b06107ab84610bde565b610bb9565b9050828152602081018484840111156107c857600080fd5b6107d3848285610cf5565b509392505050565b6000813590506107ea81610f51565b92915050565b600082601f83011261080157600080fd5b813561081184826020860161079d565b91505092915050565b60008135905061082981610f68565b92915050565b60006020828403121561084157600080fd5b600061084f848285016107db565b91505092915050565b60006020828403121561086a57600080fd5b600082013567ffffffffffffffff81111561088457600080fd5b610890848285016107f0565b91505092915050565b6000602082840312156108ab57600080fd5b60006108b98482850161081a565b91505092915050565b6000806000606084860312156108d757600080fd5b60006108e58682870161081a565b93505060206108f68682870161081a565b92505060406109078682870161081a565b9150509250925092565b61091a81610cad565b82525050565b61092981610cbf565b82525050565b600061093a82610c0f565b6109448185610c25565b9350610954818560208601610d04565b61095d81610e70565b840191505092915050565b600061097382610c0f565b61097d8185610c36565b935061098d818560208601610d04565b80840191505092915050565b60006109a6601b83610c25565b91506109b182610e81565b602082019050919050565b60006109c9601283610c25565b91506109d482610eaa565b602082019050919050565b60006109ec601283610c25565b91506109f782610ed3565b602082019050919050565b6000610a0f601483610c25565b9150610a1a82610efc565b602082019050919050565b6000610a32600083610c1a565b9150610a3d82610f25565b600082019050919050565b6000610a55601583610c25565b9150610a6082610f28565b602082019050919050565b610a7481610ceb565b82525050565b6000610a868284610968565b915081905092915050565b6000610a9c82610a25565b9150819050919050565b6000602082019050610abb6000830184610911565b92915050565b6000602082019050610ad66000830184610920565b92915050565b60006020820190508181036000830152610af6818461092f565b905092915050565b60006020820190508181036000830152610b1781610999565b9050919050565b60006020820190508181036000830152610b37816109bc565b9050919050565b60006020820190508181036000830152610b57816109df565b9050919050565b60006020820190508181036000830152610b7781610a02565b9050919050565b60006020820190508181036000830152610b9781610a48565b9050919050565b6000602082019050610bb36000830184610a6b565b92915050565b6000610bc3610bd4565b9050610bcf8282610d69565b919050565b6000604051905090565b600067ffffffffffffffff821115610bf957610bf8610e41565b5b610c0282610e70565b9050602081019050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000610c4c82610ceb565b9150610c5783610ceb565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610c9057610c8f610de3565b5b828202905092915050565b6000610ca682610ccb565b9050919050565b6000610cb882610ccb565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015610d22578082015181840152602081019050610d07565b83811115610d31576000848401525b50505050565b60006002820490506001821680610d4f57607f821691505b60208210811415610d6357610d62610e12565b5b50919050565b610d7282610e70565b810181811067ffffffffffffffff82111715610d9157610d90610e41565b5b80604052505050565b6000610da582610ceb565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610dd857610dd7610de3565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f496e73756666696369656e742045746865722070726f76696465640000000000600082015250565b7f7061676520616c72656164792065786973740000000000000000000000000000600082015250565b7f4e6f2070616765206e616d652065786973740000000000000000000000000000600082015250565b7f4661696c656420746f2073656e64204d6f6e6579000000000000000000000000600082015250565b50565b7f6164647265737320616c72656164792065786973740000000000000000000000600082015250565b610f5a81610c9b565b8114610f6557600080fd5b50565b610f7181610ceb565b8114610f7c57600080fd5b5056fea264697066735822122053bc6dcd16e45ca9e497fdc0f2eed5facde95f086199608d7ffec684bf50166764736f6c63430008040033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
     