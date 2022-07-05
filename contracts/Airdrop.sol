// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./IERC20Metadata.sol";
contract Airdrop is Ownable {
    using SafeMath for uint;

    event Setting(address receipt,string token,uint amount);
    event SettingETH(address receipt,uint amount);
    event Transfer(address receipt,string token,uint amount);
    event TransferETH(address recept,uint amount);

    //Owner to token address to amount
    mapping(address => mapping(address => uint)) private balances;

    mapping(address => uint) private ethBalances;

    // owner address to token address to bool
    mapping(address => mapping(address => bool)) private checkListOwnToken;
    mapping(address => address[]) private listTokenOfOwner;

    // modifier
    modifier onlyNonzeroAddress(address check) {
        require(check != address(0), "Zero address");
        _;
    }

    // All main function
    function allowETH(address receipt,uint amount) public onlyOwner onlyNonzeroAddress(receipt){
        ethBalances[receipt]+=amount;
        emit SettingETH(receipt , amount);
    }

    function alowERC20(address receipt,address token,uint amount) public 
                                                                  onlyOwner onlyNonzeroAddress(receipt) onlyNonzeroAddress(token) 
    {
        IERC20Metadata erc20token = IERC20Metadata(token);
        balances[receipt][token]+=amount;
        // Add token if not already in list
        if(!checkListOwnToken[receipt][token]){
            checkListOwnToken[receipt][token] = true;
        }
        listTokenOfOwner[receipt].push(token);

        emit Setting(receipt,erc20token.name(),amount);
    }

    function claimAll() external {
        if(ethBalances[msg.sender]>0){
            require(_ethtransfer(payable(msg.sender), ethBalances[msg.sender]),"Transfer eth fail");
        }
        uint tokenLength = listTokenOfOwner[msg.sender].length;
        for(uint i = 0 ;i <tokenLength;i++ ) {
            require(_erc20transfer(msg.sender, listTokenOfOwner[msg.sender][i], balances[msg.sender][listTokenOfOwner[msg.sender][i]]),"Transfer token fail");
        }
        delete listTokenOfOwner[msg.sender];
    }
    function claim(address[] memory tokens,uint[] memory amounts, bool eth,uint ethAmount) external {
        require(tokens.length == amounts.length,"Different length");
        uint tokenLength = tokens.length;
        for(uint i=0;i<tokenLength;i++) {
            require(_erc20transfer(msg.sender, tokens[i], amounts[i]),"Transfer token fail");
        }
        if(eth){
            require(_ethtransfer(payable(msg.sender), ethAmount),"Transfer eth fail");
        }
    }

    // Debug function
    function balanceOf(address receipt,address token) external view returns(uint) {
        return balances[receipt][token];
    }

    function balanceETH(address receipt) external view returns(uint) {
        return ethBalances[receipt];
    }


    //Internal helper function
    function _erc20transfer(address receipt, address token,uint amount) internal 
                                                                        onlyNonzeroAddress(receipt) onlyNonzeroAddress(token) 
                                                                        returns (bool)
    {
        require(balances[msg.sender][token]>=amount,"Insufficient balance");
        IERC20Metadata erc20token = IERC20Metadata(token);
        //require(amount>0,"Zero amount token transfer");
        balances[msg.sender][token]-=amount;
        erc20token.transfer(receipt, amount);        
        emit Transfer(receipt, erc20token.name(), amount);
        return true;
    }

    function _ethtransfer(address payable receipt, uint amount) internal onlyNonzeroAddress(receipt) returns (bool)
    {
        require(ethBalances[receipt]>=amount,"Insufficient balance");
        //require(amount>0,"Zero amount eth transfer");
        ethBalances[receipt]-=amount;

        receipt.transfer(amount);

        emit TransferETH(msg.sender,amount);
        return true;
    }

    //fallback receive
    receive() external payable {
        
    }

}