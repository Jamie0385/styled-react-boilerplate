export default [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "UserDepsitedSuccess",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "UserWithdrawSuccess",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "UserWithdrawTokensSuccess",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "buyers",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "base",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sale",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTimestamp",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_sale_token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_token_rate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_raise_min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_raise_max",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_softcap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_hardcap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_presale_start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_presale_end",
                "type": "uint256"
            }
        ],
        "name": "init_private",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lock_delay",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "presaleStatus",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "presale_info",
        "outputs": [
            {
                "internalType": "address",
                "name": "sale_token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "token_rate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "raise_min",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "raise_max",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "softcap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "hardcap",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "presale_start",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "presale_end",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "purchaseICOCoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "remainingBurn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "delay",
                "type": "uint256"
            }
        ],
        "name": "setLockDelay",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_lock",
                "type": "address"
            }
        ],
        "name": "setLocker",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "status",
        "outputs": [
            {
                "internalType": "bool",
                "name": "force_failed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "raised_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sold_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "token_withdraw",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "base_withdraw",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "num_buyers",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokeninfo",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "totalsupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "decimal",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userDeposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userWithdrawBaseTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "userWithdrawTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]