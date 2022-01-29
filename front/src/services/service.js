import { ethers } from 'ethers';
import Lottery from "../contracts/Lottery.json";

const lotteryAddress = "0xB27daA9623FE17AfF846fDD74afaC820B6b65Ab4";
const eth = window.ethereum;
const LotteryService = {

    async purchaseTicket() {

        const provider = new ethers.providers.Web3Provider(eth);
        const signer = provider.getSigner();
        var transaction = await signer.sendTransaction({
            to: lotteryAddress,
            value: ethers.utils.parseEther("1"),
        })
        return transaction;
    },

    async getBalance() {
        try {
            const provider = new ethers.providers.Web3Provider(eth);
            var lotteryContract = new ethers.Contract(lotteryAddress, Lottery.abi, provider);
            const balance = await lotteryContract.balance();
            console.log(await lotteryContract.admin());
            return +balance.toString();
        } catch (error) {
            console.error(error);
            return NaN;
        }
    },

    async spinTheWheel() {
        try {
            const provider = new ethers.providers.Web3Provider(eth);
            const signer = provider.getSigner();
            var lotteryContract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
            const data = await lotteryContract.play();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

}

export default LotteryService;