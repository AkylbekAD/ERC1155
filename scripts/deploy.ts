import hre from 'hardhat';
const ethers = hre.ethers;

const GunGirls155Address = "0x959a1411Ed13478249B7c45E8bBe862c62AD7Ab6";
const GunGirls1155Address = "0xD8ceA072312dd2651e05270FF8fE62457ce01015";

async function main() {
    const [owner] = await ethers.getSigners()
    const ERC1155 = await ethers.getContractFactory('GunGirls1155', owner)
    const erc1155 = await ERC1155.deploy("GunGirls1155", "GGS")
    await erc1155.deployed()
    console.log(erc1155.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

