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
    
    
    function mintPageNFT(string memory _pagename, string memory _imgUrl) external {
        uint256 newItemId = _tokenIds.current();

        uint pageid = addresstopageid[msg.sender];
        Page memory p = pageHolderAttributes[pageid];

        require(!addressExists[msg.sender], string.concat('Address already Exists over: ',p.pagename) );
        require(!pagenameExists[_pagename],"pagename already Exist") ;

        pageHolderAttributes[newItemId] = Page({
            pageid: newItemId,
            pagename: _pagename,
            memberaddress: msg.sender,
            perCoffeePrice: 0.001 ether,
            imageURI: _imgUrl,
            totaldonater: 0,
            pageexits: true
        });
        pagenametopageid[_pagename]=newItemId;
        addresstopageid[msg.sender]=newItemId;
        addresstopagename[msg.sender]=_pagename;
        addressExists[msg.sender]=true;
        pagenameExists[_pagename]=true;

        _mint(msg.sender, newItemId);

        _tokenIds.increment();

        pageHolders[msg.sender] = newItemId;

    }


    function ChangeperCoffeePrice(uint _tokenId, uint _newPrice) public {
        Page memory p = pageHolderAttributes[_tokenId];

        require(p.memberaddress == msg.sender, "!owner");

        pageHolderAttributes[_tokenId].perCoffeePrice = _newPrice;
    }


    mapping(address => uint) public totalAmountForMemberToWithdraw;

    function donateToPage(uint _coffees, uint _pageid,string memory _contributername, string memory _contributermessage) public payable {

        Page memory p = pageHolderAttributes[_pageid];

        require(p.pageexits, "Page does not exist");
        require(msg.value >= p.perCoffeePrice, "not valid ammount passed");

        address memberAddress = p.memberaddress;
        uint totalammount = msg.value;
        totalAmountForMemberToWithdraw[memberAddress] = totalAmountForMemberToWithdraw[memberAddress]+totalammount;

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

    function WithdrawAmount(uint256 _pageid) public {
        Page memory p = pageHolderAttributes[_pageid];
        require(p.memberaddress == msg.sender, "!owner");
        require(totalAmountForMemberToWithdraw[msg.sender] > 0, "No amount");

        address payable member = payable(msg.sender);
        uint256 ammount2Transfer = totalAmountForMemberToWithdraw[msg.sender];
        totalAmountForMemberToWithdraw[msg.sender] = 0;

        member.transfer(ammount2Transfer);
    }


}
