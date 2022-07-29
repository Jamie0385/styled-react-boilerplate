import React, { useEffect, useState } from 'react';
import { getWeb3 } from '../web3/getWeb3'
// Import button component
import contractInstance from '../contracts/ssv2Instance';
import { Background } from './background';

// Simple counter using React Hooks
export const Presale = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [bnbAmount, setBnbAmount] = useState("0.01");
    useEffect(() => {
        async function loadBlockchainData() {
            try {
                // const web3 = await getWeb3();

                const provider = window.ethereum;
                if (!provider) {
                    alert("Metamask is not installed, please install!");
                }

                const chainId = await provider.request({ method: 'eth_chainId' });
                const binanceTestChainId = '0x38'
                if (chainId === binanceTestChainId) {
                    console.log("Bravo!, you are on the correct network");
                } else {
                    try {
                        await provider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x38' }],
                        });
                        console.log("You have succefully switched to Binance Test network")
                    } catch (switchError) {
                        // This error code indicates that the chain has not been added to MetaMask.
                        if (switchError.code === 4902) {
                            try {
                                await provider.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: '0x38',
                                            chainName: 'Binance Smart Chain',
                                            rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                            blockExplorerUrls: ['https://bscscan.com/'],
                                            nativeCurrency: {
                                                symbol: 'BNB',
                                                decimals: 18,
                                            }
                                        }
                                    ]
                                });
                            } catch (addError) {
                                console.log(addError);
                                // alert(addError);
                            }
                        }
                        // alert("Failed to switch to the network")
                        return;
                    }
                }
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                setWalletAddress(account);
            } catch (error) {

            }
        }

        loadBlockchainData();
    }, []);

    window.addEventListener("load", function () {
        if (window.ethereum) {

            // detect Metamask account change
            window.ethereum.on('accountsChanged', function (accounts) {
                console.log('accountsChanges', accounts);
                setWalletAddress("");
            });

            // detect Network account change
            window.ethereum.on('networkChanged', function (networkId) {
                setWalletAddress("");
            });
        } else {
            console.warn(
                "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
            );
        }
    });

    const connect = async () => {
        try {
            // const web3 = await getWeb3();

            const provider = window.ethereum;
            if (!provider) {
                alert("Metamask is not installed, please install!");
            }

            const chainId = await provider.request({ method: 'eth_chainId' });
            const binanceTestChainId = '0x38'
            if (chainId === binanceTestChainId) {
                console.log("Bravo!, you are on the correct network");
            } else {
                try {
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x38' }],
                    });
                    console.log("You have succefully switched to Binance Test network")
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        try {
                            await provider.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: '0x38',
                                        chainName: 'Binance Smart Chain',
                                        rpcUrls: ['https://bsc-dataseed.binance.org/'],
                                        blockExplorerUrls: ['https://bscscan.com/'],
                                        nativeCurrency: {
                                            symbol: 'BNB',
                                            decimals: 18,
                                        }
                                    }
                                ]
                            });
                        } catch (addError) {
                            console.log(addError);
                            // alert(addError);
                        }
                    }
                    // alert("Failed to switch to the network")
                    return;
                }
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            setWalletAddress(account);
        } catch (error) {

        }
    }
    const buyTokens = async (amount) => {
        if (walletAddress.length) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const contract = await contractInstance;
            try {
                await contract.userDeposit(account, amount.toString());
            } catch (e) {
                console.log(e);
            }
        }
    }
    const claimTokens = async () => {
        if (walletAddress.length) {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            const contract = await contractInstance;
            try {
                await contract.userWithdrawTokens(account);
            } catch (e) {
                console.log(e);
            }
        }
    }

    const validate = async (e) => {
        let value = e.target.value;
        if (parseFloat(value) != 0 && parseFloat(value) < 0.01)
            value = "0.01";
        if (parseFloat(value) != 0 && parseFloat(value) > 2)
            value = "2";

        setBnbAmount(value);
        // const isValid = !value || validateNumberField(value);
        // if (isValid) {
        //     setBnbAmount(value);
        //     // console.log(current);
        //     // if (current.toFixed() >= 0.01 && current.toFixed() <= 2)
        //     //     setBnbAmount(current);
        // }
    }

    const submit = async (event) => {
        event.preventDefault();
    }

    return (
        <>
            <Background />
            <div className="container">
                <div className='col d-flex flex-column justify-content-center align-items-center'>
                    <a href="https://shinzotoken.com/" className='mt-4 mb-4'> <img className="slider-img" src="public/img/shinzo.png"></img></a>
                </div>
            </div>
            <div className='border border-warning border-left-0 border-right-0 pb-2 pt-7'>
                <div className="banner-wrap">
                    <section id="bigblocks">
                        <div className="banner d-flex" >
                            <div className='banner-width p-1'>
                                <h1 className='text-uppercase text-white text-center font-weight-bold big-text small-line'>shinzo token presale</h1>

                                <p className='text-white text-break font-weight-normal text-center '>The Shinzo Token is a strong Binance Smart Chain BEP-20 token that can give you a stable source of passive income in good and bad times. Deeply moved by the devastating effects of the pandemic (Covid 19), Shinzo, a compassionate entrepreneur, decided to create the Shinzo Token to help rebuild people’s lives with confidence. Shinzo will also be launching a series of utilities and platforms over the coming months. All profits from these ventures will be sent to the Dividend Wallet to benefit $Shinzo holders.</p>
                            </div>
                            <div className='banner-width'>
                                <div className='p-2 text-center'>
                                    <div className='w-100'>
                                        <img width="50%" src="public/img/NFT-1-1040x1536.png"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div >
            </div>
            <div className='border border-warning border-top-0 border-left-0 border-right-0 pb-5 pt-7 '>
                <div className="container">
                    <section id="bigblocks">
                        <div className="row d-grid" id="bigblocks-container">
                            <div className="row d-grid mb-5" id="bigblocks-container">
                                <h3 className='text-white text-center font-weight-bold small-line'>In order to raise fund for Shinzo Token, we are having our Presales now.</h3>
                            </div>
                        </div>
                        <div className="row d-grid mb-4 justify-content-center align-items-center" id="bigblocks-container">
                            <button className='text-uppercase color-button' onClick={() => connect()}>{walletAddress.length ? 'Wallet Connected' : 'Wallet Connect'}</button>
                        </div>
                        <div className="row d-grid mb-4">
                            <div className="col-md-2 pt-2">
                            </div>
                            <div className="col-md-8 pt-2">
                                <div className='border border-warning round-border text-center justify-content-center pt-5 pb-5 parent-div'>
                                    {/* <label className='text-white mr-2' for="bnbAmount">BNB Amount:</label>
                                    <div className='d-flex w-100 justify-content-center text-center'>
                                        <div className='buttonIn' id="bnbAmount">
                                            <input type="number" step='0.01' min='0' max='2' className='input-height mb-3 text-center buttonIn-input' value={bnbAmount} onChange={(e) => validate(e)} />
                                            <button className='text-uppercase buttonIn-button' onClick={() => setBnbAmount("2")}> MAX</button>
                                        </div>
                                    </div> */}
                                    <h6 className='text-white text-break font-weight-normal text-center'>The Shinzo token presale is ended</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>Click to claim your tokens</h6>
                                    <button className='text-uppercase color-button' onClick={() => claimTokens()}> Claim Tokens</button>
                                </div>
                            </div>
                            <div className="col-md-2 pt-2"></div>
                        </div>
                        {/* <div className="row d-grid mb-4">
                            <div className="col-md-4 pt-2">
                                <div className=' border border-warning round-border text-center pt-5 pb-5 parent-div'>
                                    <i className="far fa-check-circle big-icon color-icon mb-3"></i>
                                    <h4 className='small-line font-weight-bold color-text mb-4'>Package 1</h4>
                                    <h6 className='text-white text-break font-weight-normal text-center'>1 BNB =550 Million</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>You get 50 million more Shinzo token</h6>
                                    <button className='text-uppercase color-button' onClick={() => buyTokens(1)}> pre-sales</button>
                                </div>
                            </div>
                            <div className="col-md-4 pt-2">
                                <div className=' border border-warning round-border text-center pt-5 pb-5 parent-div'>
                                    <i className="far fa-check-circle big-icon color-icon mb-3"></i>
                                    <h4 className='small-line font-weight-bold color-text mb-4'>Package 2</h4>
                                    <h6 className='text-white text-break font-weight-normal text-center'>2 BNB =1.2 Billion</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>You get 100 million more Shinzo token</h6>
                                    <button className='text-uppercase color-button' onClick={() => buyTokens(2)}> pre-sales</button>
                                </div>
                            </div>
                            <div className="col-md-4 pt-2">
                                <div className=' border border-warning round-border text-center pt-5 pb-5 parent-div'>
                                    <i className="far fa-check-circle big-icon color-icon mb-3"></i>
                                    <h4 className='small-line font-weight-bold color-text mb-4'>Package 3</h4>
                                    <h6 className='text-white text-break font-weight-normal text-center'>3 BNB =1.8 Billion</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>You get 150 million more Shinzo token</h6>
                                    <button className='text-uppercase color-button' onClick={() => buyTokens(3)}> pre-sales</button>
                                </div>
                            </div>
                        </div>
                        <div className="row d-grid mt-4">
                            <div className="col-md-4 pt-2">
                                <div className=' border border-warning round-border text-center pt-5 pb-5 parent-div'>
                                    <i className="far fa-check-circle big-icon color-icon mb-3"></i>
                                    <h4 className='small-line font-weight-bold color-text mb-4'>Package 4</h4>
                                    <h6 className='text-white text-break font-weight-normal text-center'>5 BNB =3.5 Billion</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>You get 1.85 Billion more Shinzo token</h6>
                                    <button className='text-uppercase color-button' onClick={() => buyTokens(5)}> pre-sales</button>
                                </div>
                            </div>
                            <div className="col-md-4 pt-2">
                                <div className=' border border-warning round-border text-center pt-5 pb-5 parent-div'>
                                    <i className="far fa-check-circle big-icon color-icon mb-3"></i>
                                    <h4 className='small-line font-weight-bold color-text mb-4'>Package 5</h4>
                                    <h6 className='text-white text-break font-weight-normal text-center'>10 BNB =8 Billion</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>You get 2.5 Billion more Shinzo token</h6>
                                    <button className='text-uppercase color-button' onClick={() => buyTokens(10)}> pre-sales</button>
                                </div>
                            </div>
                            <div className="col-md-4 pt-2">
                                <div className=' border border-warning round-border text-center pt-5 pb-5 parent-div'>
                                    <i className="far fa-check-circle big-icon color-icon mb-3"></i>
                                    <h4 className='small-line font-weight-bold color-text mb-4'>Package 6</h4>
                                    <h6 className='text-white text-break font-weight-normal text-center'>15 BNB =15 Billion</h6>
                                    <h6 className='text-white text-break font-weight-normal text-center mb-3'>You get 6.750 Billion more Shinzo token</h6>
                                    <button className='text-uppercase color-button' onClick={() => buyTokens(15)}> pre-sales</button>
                                </div>
                            </div>
                        </div> */}
                    </section>
                </div >
            </div>
            <div className='border border-warning border-top-0 border-left-0 border-right-0 pb-5 pt-7 '>
                <div className="container">
                    <section id="bigblocks">
                        <h3 className='text-white text-center font-weight-bold small-line'>How the Pre-Sales Contract work?</h3>
                        <br />
                        <ol>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>Pre-sale buyers deposit BNB in the presale contract when they chose a package to buy.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>Presale buyers need to claim their tokens by clicking on the claim button to get their Shinzo token, after the pre-sales end.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>The claim button can only be claim with the same wallet address use to buy the token in order to claim the ownership of the token.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>The soft cap (Fund rising amount) of the pre-sales is 100 BNB if during the pre-sales period this target is not achieved all money (BNB) will be refunded to the buyer (investors). And this means the pre-sales have fail.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>If the pre-sales amount is achieved for example (we manage to rise more than (101 BNB) then investors will be able to claim their Shinzo Token after the pre-sales by clicking on the “Claim” button.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>Why is the Pre-sales contract build in this way? Because this to protect all investor who believe in Shinzo Token and Prevent (Rug Pull) from the owner. During Pre-sales all the fund is hold by the pre-sales contract (BSC) and not the owner.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>Shinzo Token is a genuine project and we believe in making people life better, the founder even has a “Yearly Dividend Wallet” setup to reward all investors who strongly believe in Shinzo Token and the dividend wallet will distribute out BUSD every year on 24 December Christmas eve.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>“Yearly Dividend Wallet” is also a way for the founder to reward the investors if Shinzo app or Retail business make money, a certain percentage of the profit will be transfer to the wallet and distribute BUSD out to investor yearly. You will never find a Token that work in this way.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>For every buy and sell transection done in pancake swap all investors will have a 10% reward in BUSD this will provide investors a stable income daily. For more information, please visit the Shinzo token website.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>Please do not buy Shinzo Token outside of Shinzo URL we do not offer any pre-sales outside our website. Also beware of any links that claim to give more Shinzo Token during our pre-sales.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>If you have any question, feel free to email us <u><a className="text-white" href="mailto:support@shinzotoken.com">support@shinzotoken.com</a></u>. We will try our best to reply you within 24 hours.</p></li>
                            <li className='text-white medium-text'><p className='text-white text-break medium-text'>Please join our telegram or social media for the lastest update.</p></li>
                        </ol>
                    </section>
                    {/* <section id="bigblocks">
                        <div className='container col-10 justify-content-center align-items-center mt-5'>
                            <form className="d-flex flex-column justify-content-center align-items-center" method="post" encType="multipart/form-data" action="https://shinzotoken.com/presale/" data-token="0a38bf7679b40761cabcbfbdcfd5ae6f" onSubmit={(event) => submit(event)}>
                                <div className='display-block w-100 mb-4'>
                                    <label className='text-white' for="email">Email<span className='text-red'>*</span></label>
                                    <input className='w-100 input-height' type="email" id="email" name="wpforms[fields][1]" required />
                                </div>
                                <div className='display-block w-100 mb-1'>
                                    <label className='text-white' for="firstName">Name<span className='text-red'>*</span></label>
                                    <div className='d-flex justify-content-between'>
                                        <div className='w-50'>
                                            <input className='w-100 input-height underlabel-input m-0' id="firstName" name="wpforms[fields][2][first]" required />
                                            <label for="firstName" className='underlabel-label text-white small-text'> First</label>
                                        </div>
                                        <div className='w-50 ml-5'>
                                            <input className='w-100 input-height underlabel-input m-0' id="lastName" name="wpforms[fields][2][last]" required />
                                            <label for="lastName" className='underlabel-label text-white small-text'>Last</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='display-block w-100 mb-4'>
                                    <label className='text-white' for="wallet_address">Wallet Address:<span className='text-red'>*</span></label>
                                    <input className='w-100 input-height' id="wallet_address" name="wpforms[fields][4]" required />
                                </div>
                                <div className='display-block w-100 mb-4'>
                                    <label className='text-white' for="phone">Phone:<span className='text-red'>*</span></label>
                                    <input className='w-100 input-height' id="phone" name="wpforms[fields][3]" required />
                                </div>
                                <div className='display-block w-100 mb-4'>
                                    <button type="submit" className="w-100 text-uppercase text-white btn btn-primary input-height ">submit</button>
                                </div>

                            </form>
                        </div>
                    </section> */}
                    <section id="bigblocks">
                        <br />
                        <ul className='custom-ul'>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Presale Address: 0x8679190DaE2a1168B28F09544753786ef4017f57</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Token Name: Shinzo Token</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Token Symbol: Shinzo</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Website: https://www.shinzotoken.com</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Token Decimals: 18</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Contract Address: 0xC9Ad2F68059dFeB39DBb00A867ebB1f9b782f353</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Total Supply: 100,000,000,000,000,000</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Presale Rate: 1 BNB = 550 million Shinzo</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Tokens For Liquidity: 50%</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Presale Start Time: 30th March 2022</h4></li>
                            <li className='text-white'><h4 className='text-white text-break wallet-address'>Presale End Time: 30th April 2022</h4></li>
                        </ul>
                    </section>
                    <section id="bigblocks" className='mt-5'>
                        <br />
                        <h5 className='text-uppercase text-white text-center font-weight-bold small-line'>AFTER PRESALES THE TOKEN VALUE SHOWN BELOW IS OUR INITIAL PRICE ON PANCAKES SWAP.</h5>
                        <div className='col d-flex flex-column justify-content-center align-items-center mt-4 w-100'>
                            <img src="public/img/szaf.png"></img>
                        </div>
                    </section>
                </div >
            </div >
            <div className='border border-warning border-top-0 border-left-0 border-right-0 border-bottom-0'>
                <section id="bigblocks">
                    <div className='container'>
                        <div className="row d-grid mt-4 justify-content-center" id="bigblocks-container">
                            <div className='col-1 d-flex flex-column mb-2'>

                            </div>
                            <div className='d-flex flex-column align-items-center mb-2'>
                                <div className='w-100'>
                                    <img className="small-img" src="public/img/shinzo.png"></img>
                                </div>
                            </div>
                            <div className='d-flex flex-column mb-2'>
                                <div className='thin-border border-primary border-top-0 border-right-0 border-left-0'>
                                    <h5 className='text-white text-center font-weight-bold'>Coming Soon</h5>
                                </div>
                                <br />
                                <ul className='list-ul small-line'>
                                    <li><p className='text-white font-weight-normal'>CoinMarketCap</p></li>
                                    <li><p className='text-white font-weight-normal'>CoinGecko</p></li>
                                </ul>

                            </div>
                            <div className='d-flex flex-column mb-2'>
                                <div className='thin-border border-primary border-top-0 border-right-0 border-left-0'>
                                    <h5 className='text-uppercase text-white text-center font-weight-bold'>join our community</h5>
                                </div>
                                <br />
                                <div className="row d-grid justify-content-end pr-5">
                                    <span className='block bg-twitter pl-2 pr-2 pt-1 pb-1'>
                                        <a href="https://twitter.com/ShinzoToken" target="_blank">
                                            <i className="fab fa-twitter text-white"></i>
                                        </a>
                                    </span>
                                    &nbsp;
                                    <span className='block bg-facebook pl-2 pr-2 pt-1 pb-1'>
                                        <a href="https://www.facebook.com/ShinzoToken-101527725764349" target="_blank">
                                            <i className="fab fa-facebook text-white"></i></a>
                                    </span>
                                    &nbsp;
                                    <span className='block bg-twitter pl-2 pr-2 pt-1 pb-1'>
                                        <a href="https://t.me/shinzotokengroup" target="_blank">
                                            <i className="fab fa-telegram text-white"></i></a>
                                    </span>
                                </div>
                            </div>
                            <div className='d-flex flex-column mb-2'>
                                <div className='thin-border border-primary border-top-0 border-right-0 border-left-0'>
                                    <h5 className='text-white font-weight-bold'>Disclaimer</h5>
                                </div>
                                <br />
                                <p className='text-white font-weight-normal small-text'>
                                    Copyright © 2022. All rights reserved.</p>

                            </div>
                        </div>
                    </div>
                </section>
            </div >
            <div hidden>
                <button onClick={() => claimTokens()}>Claim Shinzo Tokens</button>
                <br />
            </div>
        </>

    );
};