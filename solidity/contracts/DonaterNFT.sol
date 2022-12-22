// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./libraries/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./libraries/@openzeppelin/contracts/utils/Counters.sol";
import "./libraries/@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";
import "./libraries/Base64.sol";

contract DonaterNFT is ERC721 {


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DonaterNFT", "CNT") {
        _tokenIds.increment();
    }


    mapping(address => bool) addressExists;
    mapping(string => bool) public pagenameExists;
    mapping(uint => bool) public pageidExists;

    mapping(string => uint) public pagenametopageid;
    mapping(address => uint) public addresstopageid;
    mapping(address => string) public addresstopagename;


    struct Contributer {
        uint256 contributerid;
        uint256 contributetopage;
        string contributername;
        string contributermessage;
        address contributeraddress;
        uint256 coffees;
    }

    struct Page {
        uint pageid;
        string pagename;
        address memberaddress;
        uint perCoffeePrice;
        string imageURI;
        uint totaldonater;
        bool pageexits;
    }

    mapping(uint256 => Page) public pageHolderAttributes;
    mapping(address => uint256) public pageHolders;

    mapping(uint256 => Contributer[]) public contributers; 
    uint public contributersid;


    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        Page memory p = pageHolderAttributes[_tokenId];

        string memory perCoffeePrice = Strings.toString(p.perCoffeePrice);
        string memory totaldonater = Strings.toString(p.totaldonater);

          string memory json = Base64.encode(
            abi.encodePacked(
            '{"name": "',
            p.pagename,
            ' -- NFT #: ',
            Strings.toString(_tokenId),
            '", "description": "This is an NFT that lets people get Donation over my website!", "image": "',
            p.imageURI,
            '", "attributes": [ { "trait_type": "Values", "perCoffeePrice": ',perCoffeePrice,', "totaldonater":',totaldonater,'} ]}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        
        return output;
    }   

    function totalPageNfts() public view returns(uint) {
        uint256 newItemId = _tokenIds.current();
        return newItemId;
    }

    function getContributers(uint _pageid) public view returns(Contributer[] memory) {
        Contributer[] memory c = contributers[_pageid];

        
        return c;
    }
    
    
    function mintPageNFT(address _account, string memory _pagename, string memory _imgUrl) external {
        uint256 newItemId = _tokenIds.current();

        uint pageid = addresstopageid[_account];
        Page memory p = pageHolderAttributes[pageid];

        console.log('pagname' , p.pagename);

        string memory addressRevertedReason = 'Address already Exists over: ';

        require(!addressExists[_account], string.concat(addressRevertedReason,p.pagename) );
        require(!pagenameExists[_pagename],"pagename already Exist") ;

        pageHolderAttributes[newItemId] = Page({
            pageid: newItemId,
            pagename: _pagename,
            memberaddress: _account,
            perCoffeePrice: 0.001 ether,
            imageURI: _imgUrl,
            totaldonater: 0,
            pageexits: true
        });
        pagenametopageid[_pagename]=newItemId;
        addresstopageid[_account]=newItemId;
        addresstopagename[_account]=_pagename;
        addressExists[_account]=true;
        pagenameExists[_pagename]=true;

        _mint(_account, newItemId);

        _tokenIds.increment();

        pageHolders[msg.sender] = newItemId;

    }


    function ChangeperCoffeePrice(uint _tokenId, uint _newPrice) public {
        Page memory p = pageHolderAttributes[_tokenId];

        require(p.memberaddress == msg.sender, "!owner");

        pageHolderAttributes[_tokenId].perCoffeePrice = _newPrice;
    }


    function donateToPage(uint _coffees, uint _pageid,string memory _contributername, string memory _contributermessage) public payable {

        Page memory p = pageHolderAttributes[_pageid];

        require(p.pageexits, "Page does not exist");
        // require(msg.value >= p.perCoffeePrice, "not valid amout passed");

        p.totaldonater = p.totaldonater+_coffees;
        contributersid++;
        contributers[_pageid].push(Contributer({
            contributerid: contributersid,
            contributetopage: _pageid,
            contributername: _contributername,
            contributermessage: _contributermessage,
            contributeraddress: msg.sender,
            coffees: _coffees
        }));
    }

}
