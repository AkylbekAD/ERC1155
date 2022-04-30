import { task } from "hardhat/config";

const GunGirls155Address = "0x959a1411Ed13478249B7c45E8bBe862c62AD7Ab6";
// const GunGirls1155Address = "0xD8ceA072312dd2651e05270FF8fE62457ce01015";

task("mint", "Owner mints new token amount to address")
    .addParam("to", "Address new token mint to")
    .addParam("id", "New token to mint")
    .addParam("amount", "Amount of token to mint")
    .addParam("data", "Bytes32 data to input")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        await GunGirls1155Interface.mint(taskArgs.to,taskArgs.id,taskArgs.amount,taskArgs.data)
        console.log(`You have minted ${taskArgs.id} token with ${taskArgs.amount} amount to ${taskArgs.to} address`)
    })

task("mintBatch", "Owner mints batch new token amounts to address")
    .addParam("to", "Address new tokens mint to")
    .addParam("ids", "New tokens to mint")
    .addParam("amounts", "Amounts of tokens to mint")
    .addParam("data", "Bytes32 data to input")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        await GunGirls1155Interface.mintBatch(taskArgs.to,taskArgs.id,taskArgs.amount,taskArgs.data)
        console.log(`You have minted ${taskArgs.id} tokens with ${taskArgs.amount} amounts to ${taskArgs.to} address`)
    })

task("balanceOf", "Gets amount of nfts at account balance")
    .addParam("address", "Address you want to get balance")
    .addParam("id", "Id of token amount you want to get")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        let balance = await GunGirls1155Interface.balanceOf(taskArgs.address, taskArgs.id)
        console.log(`Account ${taskArgs.address} has ${balance} of GunGirls1155 NFT№ ${taskArgs.id} on his balance`)
    })

task("balanceOfBatch", "Gets batch amount of nfts at account balance")
    .addParam("addresses", "Address you want to get balance")
    .addParam("ids", "Ids of token amount you want to get")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        let balance = await GunGirls1155Interface.balanceOfBatch(taskArgs.address, taskArgs.ids)
        console.log(`Accounts ${taskArgs.addresses} has ${balance} of GunGirls1155 on their balance`)
    })

task("uri", "Gets base NFT URI")
    .addParam("tokenid", "Token id you want get URI")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        let uri = await GunGirls1155Interface.tokenURI(taskArgs.tokenid)
        console.log(uri)
    })

task("safeTransferFrom", "Transfering NFT from owner to approved recepient")
    .addParam("from", "Token owner address")
    .addParam("to", "Token recepient address")
    .addParam("id", "Token id you want to transfer")
    .addParam("amount", "Amount of token id you want to transfer")
    .addParam("data", "Bytes32 data you want to add")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        await GunGirls1155Interface.safeTransferFrom(taskArgs.from, taskArgs.to, taskArgs.id, taskArgs.amount, taskArgs.data)
        console.log(`You have transfered NFT №${taskArgs.id} with amount ${taskArgs.amount} to ${taskArgs.to} from ${taskArgs.from}`)
    })

task("safeBatchTransferFrom", "Transfering NFT from owner to approved recepient")
    .addParam("from", "Token owner address")
    .addParam("to", "Token recepient address")
    .addParam("ids", "Tokens id you want to transfer")
    .addParam("amounts", "Amounts of token id you want to transfer")
    .addParam("data", "Bytes32 data you want to add")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        await GunGirls1155Interface.safeBatchTransferFrom(taskArgs.from, taskArgs.to, taskArgs.ids, taskArgs.amounts, taskArgs.data)
        console.log(`You have transfered NFT №${taskArgs.ids} with amount ${taskArgs.amounts} to ${taskArgs.to} from ${taskArgs.from}`)
    })

task("setApprovallForAll", "Approving or revouking transfering all your NFT from your balance to recepient")
    .addParam("operator", "Operator address who you want allow or forbid to transfer all your NFT")
    .addParam("bool", "Boolean value: true - to allow, false - to forbid")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        await GunGirls1155Interface.setApprovallForAll(taskArgs.operator, taskArgs.bool)
        console.log(`Now you set approved value to ${taskArgs.bool} to ${taskArgs.operator} operator`)
    })

task("setBaseTokenURI", "Setting new base token URI")
    .addParam("uri", "New token URI owner want to set")
    .setAction(async (taskArgs, hre) => {
        const GunGirls1155Interface = await hre.ethers.getContractAt("GunGirls1155", GunGirls155Address)
        await GunGirls1155Interface.setBaseTokenURI(taskArgs.uri)
        console.log(`Now base token URI is ${taskArgs.uri}`)
    })