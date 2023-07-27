import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ConnectButton from 'components/ConnectButton';
import { useState, useEffect } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useNoWalletContract } from 'hooks/useContract';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SwapABI from 'abis/PRJXSwap.json';
import TokenABI from 'abis/PRJX.json';
import { contracts } from 'utils/address';
import { ethers, providers } from 'ethers';
import { useEthers } from '@usedapp/core';
import { getProviderOrSigner } from 'utils';

function Home() {
    const {account, library } = useEthers();
    const [token0Amount, setToken0Amount] = useState(0);
    const [tokenReturn, setTokenReturn] = useState(0);
    const swapContract  = useNoWalletContract(SwapABI.abi, contracts.swapAddress);
    const tokenContract = useNoWalletContract(TokenABI.abi, contracts.tokenAddress);
    const [tokens, setTokens] = useState({token0:'eth', token1:'token'})
    const [balances, setBalances] = useState({eth:0, token: 0});
    const [isApproved, setIsApproved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [slippage, setSlippage] = useState(0.5);
    const [expand, setExpand] = useState(false);

    const onMaxClick = () => {
        if(tokens.token0 == 'eth') {
            let ethBalance = balances.eth - balances.eth /100;
            setToken0Amount(ethBalance);
            return;
        } 
        setToken0Amount(balances.token);
    }
    const updateTokens = () => {
        if(tokens.token0 == 'eth') {
            setTokens({token0:'token', token1:'eth'})
            setToken0Amount(0)
        } else if(tokens.token0 == 'token') {
            setTokens({token0:'eth', token1:'token'})
            setToken0Amount(0);
        }

        updateToken1Amount()
    }

    const updateToken1Amount = async () => {
        if(token0Amount == undefined) {
            setTokenReturn(0);
            return;
        }

        let t0 = 0;
        let t1 = 0;
        if(tokens.token0 == 'eth') {
            t0 = token0Amount;
            t1 = 0;
        } else {
            t0 = 0;
            t1 = token0Amount;
        }
        t1 = ethers.utils.parseEther(t1.toString(), 'wei');
        t0 = ethers.utils.parseEther(t0.toString(), 'wei');
        let quoteAmount = await swapContract.quote(t1, t0)
        quoteAmount = Number(ethers.utils.formatEther(quoteAmount)).toFixed(3)
        quoteAmount = quoteAmount - (quoteAmount * slippage / 100);
        setTokenReturn(quoteAmount);
    }

    const updateBalance = async () => {
        try {
            let ethBalance = await library.getBalance(account);
            let tokenBalance = await tokenContract.balanceOf(account);
            ethBalance = ethers.utils.formatEther(ethBalance);
            tokenBalance = ethers.utils.formatEther(tokenBalance);
            setBalances({
                eth: ethBalance == 0 ? 0 : ethBalance,
                token: tokenBalance == 0 ? 0 : tokenBalance
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        updateBalance();
    },[account])
    
    const swapTokens = async () => {
        try {
                if(token0Amount == undefined || token0Amount == 0) {
                    return;
                }

                setLoading(true);

                if(tokens.token0 == 'eth') {
                    let ethAmount = ethers.utils.parseEther(token0Amount.toString(), 'wei');
                    
                    await swapContract.swapExactEthForToken({value: ethAmount}).then(tx => {
                        tx.wait().then(result => {
                            console.log(result);
                            setToken0Amount(0);
                            updateBalance();
                            setLoading(false);
                        })
                    })
                }

                if(tokens.token0 == 'token') {
                    let tokenAmount = ethers.utils.parseEther(token0Amount, 'wei');
                    await swapContract.swapExactTokensForEth(tokenAmount).then(tx => {
                        tx.wait().then(result => {
                            console.log('result', result);
                            setToken0Amount(0);
                            updateBalance()
                            setLoading(false);
                        })
                    })
                    
                }


        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const checkIfApproved = async () => {
        try {
            if(tokens.token0 == 'eth') {
                setIsApproved(true)
                return;
            }
            setIsApproved(false)
            if(tokens.token0 == 'token' && token0Amount != undefined && token0Amount != 0) {

                let allowances = await tokenContract.allowance(account, contracts.swapAddress);
                allowances = Number(ethers.utils.formatEther(allowances));
                if(allowances >= token0Amount) {
                    setIsApproved(true);
                }
            } 
        } catch (error) {
            console.log(error);
        }
    }

    const approve = async () => {
        try {
            if(tokens.token0 == 'token' && balances.token != 0) {
                setLoading(true)
                await tokenContract.approve(
                        contracts.swapAddress, 
                        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
                    ).then(tx => {
                        tx.wait().then(result => {
                            console.log(result);
                            setIsApproved(true);
                            setLoading(false)
                        })
                    })
            }
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    useEffect(() => {
        updateToken1Amount();
        checkIfApproved();
    },[token0Amount, slippage])




    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            PRJS SWAP
                        </Typography>
                        <ConnectButton/>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Stack
                        component="form"
                        sx={{
                            width: '30ch',
                            margin:'0 auto',
                            marginTop:'15ch',
                            border: 'solid 1px #474747',
                            paddingRight: '10px',
                            paddingLeft: '10px',
                            paddingBottom: '22px'   
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                        >
                            <Box sx={{textAlign:'right'}}>
                                
                                <Box
                                    sx={{
                                        position:'relative',
                                        display:'inline',
                                        textAlign:'right',
                                        top:'44px',
                                        left:'61px',
                                        fontSize:'12px'
                                    }}
                                >  
                                    {
                                        (tokens.token0 == 'eth') 
                                            ? 
                                                (balances.eth != 0 ? Number(balances.eth).toFixed(3): 0) + ' ETH'
                                            : 
                                                (balances.token != 0 ?  Number(balances.token).toFixed(3) : 0) + ' PRJX'
                                    }
                                </Box>
                                <Button 
                                    onClick={onMaxClick}
                                    size='small'
                                    sx={{
                                        width:'64px',
                                        position:'relative',
                                        top:'75px',
                                        zIndex:'999',
                                        borderRadius:'0',
                                        color:'#0091e6',
                                        backgroundColor:'#22231d'
                                    }}
                                >
                                    Max
                                </Button>
                            </Box>
                            
                            
                            <TextField
                                InputProps={{
                                    style:{borderRadius:'0px', borderBottom:'0px'},
                                    disableUnderline:true
                                }}
                                type='number'
                                label={`${tokens.token0 == 'eth'?'ETH':'PRJX'}`}
                                id="filled-hidden-label-small"
                                defaultValue={0}
                                value={token0Amount}
                                variant="filled"
                                onChange={(e) => setToken0Amount(e.target.value)}
                            />
                        
                        <Box sx={{textAlign:'center'}}>
                            <ImportExportIcon
                                onClick={updateTokens}
                                sx={{cursor:'pointer'}}
                            />
                        </Box>
                        

                        <TextField
                            InputProps={{
                                style:{borderRadius:'0px'},
                                disableUnderline:true
                            }}
                            label={`${tokens.token1 == 'token'?'PRJX':'ETH'}`}
                            id="filled-hidden-label-normal"
                            defaultValue={0}
                            value={tokenReturn}
                            variant="filled"
                            disabled
                        />
                        <Box sx={{textAlign:'right'}}>
                            <Box
                                sx={{
                                    position:'relative',
                                    display:'inline',
                                    textAlign:'right',
                                    bottom:'74px',
                                    right:'4px',
                                    fontSize:'12px'
                                }}
                            >  
                                {
                                    (tokens.token1 == 'token') 
                                        ? 
                                            (balances.token != 0 ?  Number(balances.token).toFixed(3) : 0) + ' PRJX'
                                        : 
                                            (balances.eth != 0 ? Number(balances.eth).toFixed(3): 0) + ' ETH'
                                }
                            </Box>
                        </Box>

                        <Button 
                            onClick={isApproved ? swapTokens : approve}
                            variant='contained'
                            disabled={
                                token0Amount == 0 || 
                                loading 
                            }
                            sx={{
                                backgroundColor:'#0091e6'
                            }}
                        >
                            {
                                loading 
                                ?
                                    "Loading..."
                                :
                                    isApproved ? "Swap":"Approve"
                            }
                        </Button>
                        {/* <Box sx={{textAlign:'center', margin:'0px'}}>
                            {
                                expand
                                ?
                                <ExpandLessIcon sx={{cursor:'pointer'}} onClick={() => setExpand(!expand)}/>
                                :
                                <ExpandMoreIcon sx={{cursor:'pointer'}} onClick={() => setExpand(!expand)}/>
                            }
                        </Box> */}
                        {/* {
                            expand
                            ?
                            <TextField
                                onChange={(e)=>setSlippage(e.target.value)}
                                InputProps={{
                                    style:{borderRadius:'0px'},
                                    disableUnderline:true
                                }}
                                label={'Slippage % (Max: 49)'}
                                defaultValue={slippage}
                                variant="filled"
                                size='small'
                            />
                            :''
                        } */}
                    </Stack>
                    <Box>
                    </Box>
                </Box>
        </Box>
    );
}

export default Home;