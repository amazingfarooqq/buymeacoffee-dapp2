// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./libraries/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./libraries/@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";
import "./libraries/Base64.sol";

contract PageNFT is ERC721 {


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyCoffeeNFT", "CNT") {
        _tokenIds.increment();
    }

    mapping(address => bool) addressExists;
    mapping(string => bool) pagenameExists;



    struct Page {
        uint pageid;
        string pagename;
        address memberaddress;
        uint coffeePrice;
        string imageURI;
        uint totaldonater;
    }

    mapping(uint256 => Page) public pageHolderAttributes;
    mapping(address => uint256) public pageHolders;

    // not used
    Page[] nfts;


    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        Page memory p = pageHolderAttributes[_tokenId];

        string memory coffeePrice = Strings.toString(p.coffeePrice);
        string memory totaldonater = Strings.toString(p.totaldonater);

        string memory json = Base64.encode(
            abi.encodePacked(
            '{"name": "',
            p.pagename,
            ' -- NFT #: ',
            Strings.toString(_tokenId),
            '", "description": "This is an NFT that lets people get Donation over my website!", "image": "',
            p.imageURI,
            '", "attributes": [ { "trait_type": "Values", "coffeePrice": ',coffeePrice,', "totaldonater":',totaldonater,'} ]}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        
        return output;
    }    
    
    function mintPageNFT(address to, string memory _pagename, string memory _imgUrl) external {
        uint256 newItemId = _tokenIds.current();
        console.log('addressExists',addressExists[to]);
        console.log('pagenameExists',pagenameExists[_pagename]);

        require(!addressExists[to],"address already exists");
        require(!pagenameExists[_pagename],"pagename already exists");

        pageHolderAttributes[newItemId] = Page({
            pageid: newItemId,
            pagename: _pagename,
            memberaddress: to,
            coffeePrice: 0.001 ether,
            imageURI: _imgUrl,
            totaldonater: 0
        });
        // nfts.push(Page({
        //     pageid: newItemId,
        //     pagename: _pagename,
        //     memberaddress: to,
        //     coffeePrice: 0.001 ether,
        //     imageURI: _imgUrl,
        //     totaldonater: 0
        // }));

        Page memory p = pageHolderAttributes[newItemId];
        console.log("Done minting page %s to %s, img %s", p.pagename, p.memberaddress, p.imageURI);

        _mint(to, newItemId);

        _tokenIds.increment();

        pageHolders[msg.sender] = newItemId;


    }



    function Donate() public {

    }

}
