const { assert } = require('chai');

const Lottery = artifacts.require("Lottery");

require('chai')
  .use(require('chai-as-promised'))
  .should()

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Lottery", (accounts) => {
  let contract;
  beforeEach(async () => {
    contract = await Lottery.deployed();
  });

  it("should create a Lottery contract", async () => {
    return assert.isTrue(contract.address !== undefined);
  });

  it("should have an initial balance of 0", async () => {
    return assert.equal(await contract.balance(), 0);
  });

  it("should allow a user to deposit only 1 ether and add participent to players' list", async () => {
    const one_eth = web3.utils.toWei("1", "ether");
    await web3.eth.sendTransaction({ from: accounts[1], to: contract.address, value: one_eth });
    assert.equal(await contract.balance(), web3.utils.toWei("1", "ether"), "balance should be 1 ether");
    assert.equal(await contract.players(0), accounts[1], "accounts[1] should be in players' list");
  })


  it("should accept at least 10 participent to make a spin", async () => {
    let currentContract;
    currentContract = await purchage10Tickets(currentContract, accounts);

    assert.equal(await web3.eth.getBalance(currentContract.address), web3.utils.toWei("10", "ether"), "balance should be 10 ether");

    for (let index = 0; index < 10; index++) {
      assert.equal(await currentContract.players(index), accounts[index + 1], `accounts ${index} should be in players' list`);
    }

    await currentContract.play();

    let winner = await currentContract.winners[0];
    assert.isNotNull(winner, "winner should be not null");
  });

  it("should not allow non admin to make a draw", async () => {
    contract = await purchage10Tickets(contract, accounts);
    try {
      await contract.play({ from: accounts[1] });
    } catch (error) {
      assert.equal(error.reason, "Only admin can start a spin.")
    }
  });

  it("should not allow to make a draw if there are no participents", async () => {
    contract = await Lottery.new();
    try {
      await contract.play();
    } catch (error) {
      assert.equal(error.reason, "Few more tickets to be sold.")
    }
  })

  it("should not allow to make a draw if there are less than 10 participents", async () => {
    contract = await Lottery.new();
    await web3.eth.sendTransaction({ from: accounts[1], to: contract.address, value: web3.utils.toWei("1", "ether") });
    try {
      await contract.play();
    } catch (error) {
      assert.equal(error.reason, "Few more tickets to be sold.")
    }
  })

  it("should select 1st winner and send 4 ether", async () => {
    let currentContract;
    currentContract = await purchage10Tickets(contract, accounts);
    let previouBalance = await currentContract.balance();
    await currentContract.play();
    let laterBalance = await currentContract.balance();
    assert.isTrue(previouBalance >= laterBalance + web3.utils.fromWei('4', 'ether'), "balance should be less");
  })



  it("should not allow a user to deposit multiple ethers", async () => {
    const two_eth = web3.utils.toWei("4", "ether");
    try {
      await web3.eth.sendTransaction({ from: accounts[0], to: contract.address, value: two_eth })
    } catch (error) {
      assert.isNotNull(error, "Please send only one ether.")
    }
  });
});


async function purchage10Tickets(contract, accounts) {
  contract = await Lottery.new();
  const one_eth = web3.utils.toWei("1", "ether");

  for (let index = 1; index <= 10; index++) {
    await web3.eth.sendTransaction({ from: accounts[index], to: contract.address, value: one_eth });
  }
  return contract;
}

