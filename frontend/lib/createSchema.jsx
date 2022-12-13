import { Polybase } from '@polybase/client'
import Wallet from 'ethereumjs-wallet'
import { ethPersonalSign } from '@polybase/eth'

export async function createCollection (pvt, name) {
    const db = new Polybase({
    signer: async (data) => {
      const wallet = Wallet.fromPrivateKey(Buffer.from(pvt, 'hex'))
      return { h: 'eth-personal-sign', sig: ethPersonalSign(wallet.getPrivateKey(), data) }
    },
  })

  if (!pvt) {
    throw new Error('No private key provided')
  }

  await db.applySchema(`
  collection members {
    id: string; 
    memberaddress: string;
    coffeePrice: string;

    constructor (pagename: string, memberaddress: string, coffeePrice: string) {
      this.id = pagename;
      this.memberaddress = memberaddress;
      this.coffeePrice = coffeePrice;
    }

    updateCoffeePrice(coffeePrice: string){
      this.coffeePrice == coffeePrice;
    }

  }

  collection contributers {
    id: string; 
    pagename: string;
    contributername: string;
    contributermessage: string;
    contributercoffees: string;
    contributerAddress: string;
  
    constructor (id: string,pagename: string, contributername: string, contributermessage: string, contributercoffees: string,contributerAddress:string) {
      this.id = id;
      this.pagename = pagename;
      this.contributername = contributername;
      this.contributermessage = contributermessage;
      this.contributercoffees = contributercoffees;
      this.contributerAddress = contributerAddress;
    }
  }
  `, name)

  return 'Schema loaded'
}
