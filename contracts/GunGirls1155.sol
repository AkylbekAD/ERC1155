//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GunGirls1155 is ERC1155, Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private currentTokenId;

    // Contract name
    string public name;
    // Contract symbol
    string public symbol;
    mapping (uint256 => uint256) public tokenSupply;

    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC1155("https://gateway.pinata.cloud/ipfs/QmSKqYVzHgSUNRQgDXcHxdst3LoUN3ij6Li5HaYd9P1Uz4/{id}") 
    {
        name = _name;
        symbol = _symbol;
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) external onlyOwner {
        tokenSupply[id] += amount;
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external onlyOwner {
        for (uint i = 0; i < ids.length; i++) {
            tokenSupply[ids[i]] += amounts[i];
        }
        _mintBatch(to, ids, amounts, data);
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) external onlyOwner {
        _setURI(_newBaseTokenURI);
    }

    function burn(address account, uint256 id, uint256 amount) external onlyOwner {
        tokenSupply[id] -= amount;
        _burn(account, id, amount);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) external onlyOwner {
        for (uint i = 0; i < ids.length; i++) {
            tokenSupply[ids[i]] -= amounts[i];
        }
        _burnBatch(account, ids, amounts);
    }
}
