const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');


function from4BytesHexToInt(param) {
  const byteArray = new Uint8Array(param.match(/.{1,2}/g).map(byte => { parseInt(byte, 16) })); // convert hex string to Uint8Array
  const first20Bytes = byteArray.slice(0, 20); // get the first 20 bytes

  const dataView = new DataView(first20Bytes.buffer);
  const value = dataView.getUint32(0);

  return value;
}
describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    // good luck
    threshold = from4BytesHexToInt("00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf")

    const repeat = true;
    let signer;
    while (repeat) {
      signer = ethers.Wallet.createRandom();
      signerValue = from4BytesHexToInt(signer.address.slice(2));
      if (signerValue < threshold) {
        repeat = false;
      }
    }
    await game.connect(signer).win();
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
