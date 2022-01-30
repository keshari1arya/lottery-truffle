import { ethers } from 'ethers';
import Lottery from "../contracts/Lottery.json";

const lotteryAddress = "0xd69A07fc4c7cddE4Cb86D75d35A40c5c03038A63";
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
            return +balance.toString();
        } catch (error) {
            console.error(error);
            return -1;
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
    },

    async getWinnerList() {
        try {
            const provider = new ethers.providers.Web3Provider(eth);
            const signer = provider.getSigner();
            var lotteryContract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
            const data = +(await lotteryContract.totalPlayed()).toString();
            let result = [];
            for (let i = 0; i < +data; i++) {
               let record = {
                    spin:i,
                    winners:[],
                }
                for (let j = 0; j < 3; j++) {
                    const winner = await lotteryContract.winners(i, j);
                    console.log(winner);
                    var playerAddr = winner.player.toString();
                    record.winners.push({
                        position: j,
                        address:`${playerAddr.substring(0,4)}... ${playerAddr.substring(playerAddr.length-4,playerAddr.length-1)}`,
                        amount: winner.amount.toString() + " Wei",
                    });
                }
                result.push(record);
            }

            return result;
        } catch (error) {
            console.error(error);
        }
    },

    async totalSpin() {
        try {
            const provider = new ethers.providers.Web3Provider(eth);
            const signer = provider.getSigner();
            var lotteryContract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
            const data = await lotteryContract.totalPlayed();
            return +data.toString();
        } catch (error) {
            console.error(error);
            return -1;
        }
    }
}

export default LotteryService;