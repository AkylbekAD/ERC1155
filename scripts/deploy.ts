import hre from 'hardhat';
const ethers = hre.ethers;

async function main() {
    const [owner] = await ethers.getSigners()
    const ERC1155 = await ethers.getContractFactory('GunGirls1155', owner)
    const erc1155 = await ERC1155.deploy()
    await erc1155.deployed()
    console.log(erc1155.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

