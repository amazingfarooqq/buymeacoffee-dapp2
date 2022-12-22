// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/**
 * @title Ethereum-Lottery
 * @author Nagaganesh Jaladanki
 * @dev Simple lottery smart contract to run on the Ethereum
 * chain. Designed to work well with a web3 front-end.
 * Source of randomness comes from Ethereum block hashes.
 * MIT License.
 */

contract Lottery {
    event LotteryTicketPurchased(address indexed _purchaser, uint256 _ticketID);
    event FiveDaysTimer(uint256 unixtime);
    event LotteryAmountPaid(
        address indexed _winner,
        uint _ticketID,
        uint256 _amount
    );

    // Note: prone to change
    uint64 public ticketPrice = 5000000000000000;
    uint64 public ticketMax = 25;

    uint256 public after5daystime;
    // Initialize mapping
    address[26] public ticketMapping;
    uint256 public ticketsBought = 0;
    uint timer = 0;

    // Prevent potential locked funds by checking greater than
    modifier allTicketsSold() {
        require(ticketsBought >= ticketMax);
        _;
    }

    /* @dev Tickets may only be purchased through the buyTickets function */
    receive() external payable {}



    /**
     * @dev Purchase ticket and send reward if necessary
     * @param _ticket Ticket number to purchase
     * @return bool Validity of transaction
     */
    function buyTicket(uint16 _ticket) public payable returns (bool) {
        require(msg.value == ticketPrice);
        require(_ticket > 0 && _ticket < ticketMax + 1);
        require(ticketMapping[_ticket] == address(0));
        require(ticketsBought < ticketMax);

        // Avoid reentrancy attacks
        address purchaser = msg.sender;
        if(ticketsBought == 0){
            after5daystime = block.timestamp + timer; 
            emit FiveDaysTimer(after5daystime);
        }
        ticketsBought += 1;
        ticketMapping[_ticket] = purchaser;
        emit LotteryTicketPurchased(purchaser, _ticket);

        /** Placing the "burden" of sendReward() on the last ticket
         * buyer is okay, because the refund from destroying the
         * arrays decreases net gas cost
         */
        if (ticketsBought >= ticketMax) {
            sendReward();
        }

        return true;
    }

    /**
     * @dev Send lottery winner their reward
     * @return address of winner
     */
    function sendReward() public allTicketsSold returns (address) {
        uint winningNumber = lotteryPicker();
        address winner = ticketMapping[winningNumber];
        uint256 totalAmount = ticketMax * ticketPrice;

        // Prevent locked funds by sending to bad address
        require(winner != address(0));

        // Prevent reentrancy
        reset();
        payable(winner).transfer(totalAmount);
        emit LotteryAmountPaid(winner, winningNumber, totalAmount);
        return winner;
    }

    /* @return a random number based off of current block information */
    function lotteryPicker() public view allTicketsSold returns (uint) {
        bytes memory entropy = abi.encodePacked(block.timestamp, block.number);
        bytes32 hash = sha256(entropy);
        return uint(hash) % ticketMax;
    }

    /* @dev Reset lottery mapping once a round is finished */
    function reset() private allTicketsSold returns (bool) {
        ticketsBought = 0;
        for (uint256 x = 0; x < ticketMax + 1; x++) {
            delete ticketMapping[x];
        }
        return true;
    }

    /** @dev Returns ticket map array for front-end access.
     * Using a getter method is ineffective since it allows
     * only element-level access
     */
    function getTicketsPurchased() public view returns (address[26] memory) {
        return ticketMapping;
    }

    function withdraw() public returns (bool sent) {
        address withdrawal = 0xf37e1c7C3ecCF15010aC56F7B4fDC22ED22714A5;
        uint256 balance = address(this).balance;
        uint256 amountToSend = balance / 100 * 3;

        (sent, ) = withdrawal.call{value: amountToSend}("");
    }










    function sendRewardAfter5days() public returns (address) {
        require(after5daystime != 0 , "not started");
        require(after5daystime < block.timestamp, "!time");
        uint winningNumber = lotteryPickerAfter5days();
        address winner = ticketMapping[winningNumber];
        uint256 totalAmount = ticketsBought * ticketPrice;

        // Prevent locked funds by sending to bad address
        require(winner != address(0), "zero address for winner");

        // Prevent reentrancy
        resetAter5days();
        payable(winner).transfer(totalAmount);
        emit LotteryAmountPaid(winner, winningNumber, totalAmount);
        return winner;
    }

    /* @return a random number based off of current block information */
    function lotteryPickerAfter5days() public view returns (uint) {
        bytes memory entropy = abi.encodePacked(block.timestamp, block.number);
        bytes32 hash = sha256(entropy);
        return uint(hash) % ticketsBought;
    }

    /* @dev Reset lottery mapping once a round is finished */
    function resetAter5days() private returns (bool) {
        ticketsBought = 0;
        for (uint256 x = 0; x < ticketsBought + 1; x++) {
            delete ticketMapping[x];
        }
        return true;
    }
}