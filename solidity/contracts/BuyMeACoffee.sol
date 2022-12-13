// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/utils/Strings.sol";


contract BuyMeACoffeeNFT is ERC721 {


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
        string nftimage;
    }


    Page[] nfts;

    function mintPageNFT(address to, string memory _pagename) external {
        uint256 newItemId = _tokenIds.current();
        
        require(addressExists[to],"address already exists");
        require(pagenameExists[_pagename],"pagename already exists");


        nfts.push(Page({
            pageid: newItemId,
            pagename: _pagename,
            memberaddress: to,
            coffeePrice: 0.001 ether,
            nftimage: ""
        }));

        _mint(to, newItemId);

        _tokenIds.increment();

    }

}
