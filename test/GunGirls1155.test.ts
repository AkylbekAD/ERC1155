import chai from "chai"
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { solidity } from "ethereum-waffle"

chai.use(solidity);

describe("ERC1155 contract", function () {
  let GunGirls1155;
  let GunGirls1155Interface: Contract;
  let owner: SignerWithAddress;
  let acc1: SignerWithAddress;
  let acc2: SignerWithAddress;
  let bytes32: string = "0x736f6d65646174610000000000000000000000000000000000000000000000";

  beforeEach(async function() {
    GunGirls1155 = await ethers.getContractFactory("GunGirls1155");
    [owner, acc1, acc2] = await ethers.getSigners();    
    GunGirls1155Interface = await GunGirls1155.deploy("GunGirls1155", "GGS");
    await GunGirls1155Interface.deployed();

    testMintBatch(owner, owner.address, [1,2,3,4,5], [10,20,30,40,50], bytes32);
  });

    async function testMintBatch (account: SignerWithAddress, to: string, ids: number[], amount: number[], data: string) {
      const minting = await GunGirls1155Interface.connect(account).mintBatch(to,ids,amount,data);
      await minting.wait();
    }

  describe("Deployment 5 NFT minting", function() {
    it("Should return owner balance of all 5 ids of NFT, as a result of mintBatch by owner", async function() {
      expect(await GunGirls1155Interface.balanceOf(owner.address,1)).to.equal("10")
      expect(await GunGirls1155Interface.balanceOf(owner.address,2)).to.equal("20")
      expect(await GunGirls1155Interface.balanceOf(owner.address,3)).to.equal("30")
      expect(await GunGirls1155Interface.balanceOf(owner.address,4)).to.equal("40")
      expect(await GunGirls1155Interface.balanceOf(owner.address,5)).to.equal("50")
    })
  })

  describe("Getter public functions", function() {
    it("Should return base URI from 'uri' getter function", async function() {
      expect(await GunGirls1155Interface.uri(1)).to.equal("https://gateway.pinata.cloud/ipfs/QmSKqYVzHgSUNRQgDXcHxdst3LoUN3ij6Li5HaYd9P1Uz4/{id}")
    })

    it("Should return contract name from 'name' getter function", async function() {
        expect(await GunGirls1155Interface.name()).to.equal("GunGirls1155")
    })
    
    it("Should return contract symbol from 'symbol' getter function", async function() {
        expect(await GunGirls1155Interface.symbol()).to.equal("GGS")
    })
    
    it("Should return contract tokenSupply from 'tokenSupply' getter function", async function() {
        expect(await GunGirls1155Interface.tokenSupply(1)).to.equal("10")
    })
  })

  describe("Only owner functions", function() {
    describe("mint funtion", function() {
        it("Only owner could mint new NFT", async function() {
            expect(GunGirls1155Interface.connect(acc1).mint(acc1.address,[1],[10],bytes32)).to.be.revertedWith("Ownable: caller is not the owner")
        })
        
        it("Owner could mint new NFT to his address", async function() {
            await GunGirls1155Interface.connect(owner).mint(owner.address,[1],[10],bytes32)
            expect(await GunGirls1155Interface.balanceOf(owner.address, 1)).to.equal("20")
        })
    })

    describe("mintBatch funtion", function() {
        it("Only owner could mint batch new NFT", async function() {
            expect(GunGirls1155Interface.connect(acc1).mintBatch(acc1.address,[1,2],[10,20],bytes32)).to.be.revertedWith("Ownable: caller is not the owner")
        })
        
        it("Owner could mint batch new NFT to his address", async function() {
            await GunGirls1155Interface.connect(owner).mintBatch(owner.address,[1,2],[10,20],bytes32)
            const result = await GunGirls1155Interface.balanceOfBatch([owner.address, owner.address], [1,2])
            const token1 = ethers.utils.formatUnits(result[0], 0)
            const token2 = ethers.utils.formatUnits(result[1], 0)
            expect(token1).to.equal("20")
            expect(token2).to.equal("40")
        })
    })

    describe("setBaseTokenURI funtion", function() {
        it("Only owner could set new base token URI", async function() {
            expect(GunGirls1155Interface.connect(acc1).setBaseTokenURI("myNewURI")).to.be.revertedWith("Ownable: caller is not the owner")
        })

        it("Owner could set new base token URI", async function() {
            await GunGirls1155Interface.connect(owner).setBaseTokenURI("myNewURI")
            expect(await GunGirls1155Interface.uri(1)).to.equal("myNewURI")
        })
    })

    describe("burn funtion", function() {
        it("Only owner could burn token amount", async function() {
            expect(GunGirls1155Interface.connect(acc1).burn(owner.address,[1],[10])).to.be.revertedWith("Ownable: caller is not the owner")
        })

        it("Owner could burn token amount", async function() {
            await GunGirls1155Interface.connect(owner).burn(owner.address,[1],[10])
            expect(await GunGirls1155Interface.balanceOf(owner.address, 1)).to.equal("0")
        })
    })

    describe("burnBatch funtion", function() {
        it("Only owner could burn batch NFT", async function() {
            expect(GunGirls1155Interface.connect(acc1).burnBatch(owner.address,[1,2],[10,20])).to.be.revertedWith("Ownable: caller is not the owner")
        })
        
        it("Owner could burn batch NFT to his address", async function() {
            await GunGirls1155Interface.connect(owner).burnBatch(owner.address,[1,2],[5,10])
            const result = await GunGirls1155Interface.balanceOfBatch([owner.address, owner.address], [1,2])
            const token1 = ethers.utils.formatUnits(result[0], 0)
            const token2 = ethers.utils.formatUnits(result[1], 0)
            expect(token1).to.equal("5")
            expect(token2).to.equal("10")
        })
    })
})

  describe("Setting approval for all NFTs", function() {
    it("Only owner can approve transfering all his NFT to certain operator", async function() {
        expect(GunGirls1155Interface.connect(acc1).setApprovalForAll(acc1.address, true)).to.be.revertedWith("ERC1155: setting approval status for self")
        expect(await GunGirls1155Interface.isApprovedForAll(owner.address, acc1.address)).to.equal(false)
    })

    it("Owner can approve transfering all his NFT to certain operator", async function() {
        await GunGirls1155Interface.connect(owner).setApprovalForAll(acc1.address, true)
        expect(await GunGirls1155Interface.isApprovedForAll(owner.address, acc1.address)).to.equal(true)
        })

    it("After approving by owner, operator can transfer NFT to other addresses", async function() {
        await GunGirls1155Interface.connect(owner).setApprovalForAll(acc1.address, true)
        await GunGirls1155Interface.connect(acc1).safeTransferFrom(owner.address, acc1.address, 1, 10, bytes32)
        await GunGirls1155Interface.connect(acc1).safeTransferFrom(owner.address, acc2.address, 2, 10, bytes32)
        expect(await GunGirls1155Interface.balanceOf(acc1.address, 1)).to.be.equal("10")
        expect(await GunGirls1155Interface.balanceOf(acc2.address, 2)).to.be.equal("10")
      })
  })
})