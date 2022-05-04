//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GunGirls1155 is ERC1155, Ownable, AccessControl{
    string public name = "GunGirls1155";
    string public symbol = "GGS";
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    mapping (uint256 => uint256) public tokenSupply;

    constructor()
        ERC1155("https://ipfs.io/ipfs/QmSKqYVzHgSUNRQgDXcHxdst3LoUN3ij6Li5HaYd9P1Uz4/{id}") 
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    modifier isAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "You dont have ADMIN rights");
        _;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) external isAdmin {
        tokenSupply[id] += amount;
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) external isAdmin {
        for (uint i = 0; i < ids.length; i++) {
            tokenSupply[ids[i]] += amounts[i];
        }
        _mintBatch(to, ids, amounts, data);
    }

    function setBaseTokenURI(string memory _newBaseTokenURI) external onlyOwner {
        _setURI(_newBaseTokenURI);
    }

    function burn(address account, uint256 id, uint256 amount) external isAdmin {
        tokenSupply[id] -= amount;
        _burn(account, id, amount);
    }

    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts) external isAdmin {
        for (uint i = 0; i < ids.length; i++) {
            tokenSupply[ids[i]] -= amounts[i];
        }
        _burnBatch(account, ids, amounts);
    }

    function giveAdminRights (address newChanger) external onlyOwner {
        _grantRole(ADMIN_ROLE, newChanger);
    }

    function revokeAdminRights (address newChanger) external onlyOwner {
        _revokeRole(ADMIN_ROLE, newChanger);
    }
}
