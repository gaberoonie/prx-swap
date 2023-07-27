import React, { useEffect, useState } from "react";
import { Button, Box, Modal, Typography, Badge } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import metamaskLogo from 'assets/images/metamask.svg';
import walletConnectLogo from 'assets/images/wconnect.svg';
import { toast } from "react-toastify";
import { switchNetwork } from "utils/wallet";
import { ethers } from "ethers";
import MailIcon from '@mui/icons-material/Mail';

const walletconnect = new WalletConnectConnector({
  rpc:{1:"https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/"}
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

export default function ConnectButton({ sx }) {
  const { activateBrowserWallet, activate, deactivate, account, chainId, library } = useEthers();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [meta, setMeta] = useState(true)
  const [balance, setBalance] = useState(0);


  const fetchBalance = async () => {
    try {
      const blnc = await library.getBalance(account);
      setBalance(ethers.utils.formatEther(blnc));
    } catch (error) {
      console.log(error)
    }
  }

  const connect = async (type) => {
    try {
      if(type == 'metamask'){
          activateBrowserWallet();
          setMeta(true)
        } else {
          await activate(walletconnect, undefined, true).catch((err) => {
            walletconnect.walletConnectProvider = undefined;
          });
          setMeta(false)
        }
    } catch (error) {
      if(error.data != undefined) {
        toast.error(error.data.message)
      }
    }
  }

  useEffect(() => {
    switchNetwork(5)
    if(chainId != undefined && chainId != 1 && chainId != 5 ){
      toast("Wrong Network. Please connect to Ethereum Network");
      deactivate();
    }
  },[chainId])

  useEffect(() => {
    fetchBalance()
  },[chainId, account])

  useEffect(() => {
    if(walletconnect.walletConnectProvider){
      connect('walletconnect');
    }
  },[])

  return (
    <>
      {account ? (
        <>
          <Button
            variant="outlined"
            onClick={deactivate}
            startIcon={
              <Box component="img" src={meta?metamaskLogo:walletConnectLogo} sx={{ width: 20 }} />
            }
            sx={{
              position: "relative",
              color: "#0091e6",
              border: "1px solid #0091e6",
              borderRadius: 0,
              fontSize: 18,
              px: 4,
              py: 0.5,
              "&:before": {
                position: "absolute",
                content: '""',
                width: "20px",
                height: "20px",
                bottom: "-10px",
                left: "-10px",
                transform: "rotate(45deg)",
                borderTop: "1px solid #0091e6",
              },
            }}
          >
            {`${account.slice(0, 5)}...${account.slice(-5)}`}


              <span style={{marginLeft: "10px",fontSize: "11px",fontWeight:"bold",background: "rgb(0 145 230)",color: "#fff",padding: "2px 6px",borderRadius: "20px"}}
              >
                {`${parseFloat(balance).toLocaleString()} ETH`}
              </span>
            
            
          </Button>
        </>
      ) : (
        <>
        <Button
          variant="outlined"
          onClick={handleOpen}
          sx={{
            // width:"100%",
            position: "relative",
            color: "#0091e6",
            border: "1px solid #0091e6",
            borderRadius: 0,
            fontSize: 18,
            px: 4,
            py: 0.5,
            "&:before": {
              position: "absolute",
              content: '""',
              width: "20px",
              height: "20px",
              bottom: "-10px",
              left: "-10px",
              transform: "rotate(45deg)",
              borderTop: "1px solid #0091e6",
            },
          }}
        >
          Connect Wallet
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div onClick={() => connect('metamask')} style={{padding:"25px 25px 8px 25px", cursor:"pointer"}}>
                <img src={metamaskLogo} style={{margin:"0 auto",height:'75px'}}/>
                <Typography sx={{textAlign:"center", paddingTop:"12px", color:"#ccc"}}>Metamask</Typography>
              </div>
              <hr style={{border:"solid 1px #2a2a2a"}}/>
              <div onClick={() => connect('walletconnect')} style={{padding:"25px 25px 8px 25px", cursor:"pointer"}}>
                <img src={walletConnectLogo} style={{margin:"0 auto",height:'75px'}}/>
                <Typography sx={{textAlign:"center", paddingTop:"12px", color:"#ccc"}}>Wallet Connect</Typography>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
