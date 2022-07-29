import Web3 from 'web3'
import abi from './abi'
import * as Web3Utils from 'web3-utils';
import getContractsAddress from './contractsAddress';

const provider = () => {
    // 1. Try getting newest provider
    const { ethereum } = window
    if (ethereum) return ethereum

    // 2. Try getting legacy provider
    const { web3 } = window
    if (web3 && web3.currentProvider) return web3.currentProvider
}

let contractInstance

if (provider()) {
    const web3 = new Web3(provider())
    contractInstance = web3.eth.net.getId().then(id => {
        const address = getContractsAddress(id)
        const contractInstance = new web3.eth.Contract(abi, address)
        return {
            async userDeposit(sender, amount) {
                try {
                    const bnbAmount = Web3Utils.toWei(amount, 'ether');
                    return contractInstance.methods.userDeposit().send({
                        'from': sender,
                        'value': bnbAmount
                    })
                } catch (e) {
                    console.log(e)
                }
            },
            async userWithdrawTokens(sender) {
                try {
                    return contractInstance.methods.userWithdrawTokens().send({
                        'from': sender
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
    })
}

export default contractInstance
