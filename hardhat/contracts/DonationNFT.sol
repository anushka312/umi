// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DonationNFT is ERC721URIStorage {
    uint256 public tokenCounter;
    mapping(address => uint256[]) public userNFTs;

    constructor() ERC721("Donation NFT", "DNFT") {
        tokenCounter = 0;
    }

    /// @notice Mints an NFT to the donor with a given tokenURI (metadata URL)
    /// @param recipient The address to mint the NFT to
    /// @param tokenURI The IPFS URL to metadata JSON
    function mintDonationNFT(address recipient, string memory tokenURI) public {
        require(msg.sender == recipient, "Only the recipient can mint their NFT");

        uint256 tokenId = tokenCounter;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        userNFTs[recipient].push(tokenId);
        tokenCounter++;
    }

    /// @notice Returns the list of NFT IDs owned by a user
    function getNFTsOfUser(address user) public view returns (uint256[] memory) {
        return userNFTs[user];
    }
}
