// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract CoffeContract {


    address payable owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    uint256 public pageid=1;
    
    // by page id
    mapping(uint256 => string) public pagename;
    mapping(uint256 => address payable) public pageaddress;
    mapping(uint256 => bool) public checkpageid;

    // by page name
    mapping(string => bool) public checkpagename;

    // by page address
    mapping(address => bool) public checkpageaddress;
    mapping(address => string) public addresstopage;


    mapping(uint256 => uint256) public totalcoffeesContributed;


    function RegisterPage(string memory _pagename) public {
        if(checkpagename[_pagename]){
            revert('page already exist');
        }
        if(checkpageaddress[msg.sender]){
            revert('address already exist');
        }
        // page id
        checkpageid[pageid] = true;
        pagename[pageid] = _pagename;
        pageaddress[pageid] = payable(msg.sender);

        checkpagename[_pagename] = true;
        
        // address
        checkpageaddress[msg.sender] = true;
        addresstopage[msg.sender] = _pagename;

        pageid++;
    }

    function buyCoffee (uint256 _pageid, uint256 _coffePrice, uint256 coffees) payable public {
        address _pageaddress = pageaddress[_pageid];
        uint256 totalamount = _coffePrice * coffees;

        require(checkpageid[_pageid], "No page exist");
        require(msg.value >= totalamount, "Insufficient Ether provided");

        if(checkpageaddress[_pageaddress]) {
            (bool sent, ) = _pageaddress.call{value: totalamount}("");
            require(sent, "Failed to send Money");       

            totalcoffeesContributed[_pageid] = totalcoffeesContributed[_pageid] + coffees;        
        }else {
            revert('No page name exist');
        }
        
    }

}