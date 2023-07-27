import { useMemo } from "react";
import IERC20 from "abis/IERC20.json";
import { getContract } from "utils";
import { useEthers } from "@usedapp/core";
import { ethers } from "@usedapp/core/node_modules/ethers";
// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  // const { library, account } = useActiveWeb3React();
  const { library, account } = useEthers();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}


function useRcpProviderContract(abi, address){
  const { account, library } = useEthers();

  return useMemo(() => {
      if(!abi || !address ) return null;

      try {
          const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_1);
          return getContract(address, abi, library?library:provider, account?account:undefined);
      } catch (error) {
          console.log('contract init', error);
      }
  },[abi, address, account]);
}

export function useNoWalletContract(abi, address){
  return useRcpProviderContract(abi, address);
}

export function useTokenContract(tokenAddress, withSignerIfPossible = true) {
  return useContract(tokenAddress, IERC20.abi, withSignerIfPossible);
}


