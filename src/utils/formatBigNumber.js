import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { calculateRarity } from "./calculateRarity";

const formatBigNumber = (number) => {
  return formatEther(number) * 10 ** 18;
};

export const formatNftScore = (properties, tokenId) => {
  const totalProperties = 9;
  let totalScore = 0;
  if(properties != undefined){
    Object.entries(properties).map((item, index) => {
      let pro = item[1];
      totalScore += calculateRarity(pro.trait_type, pro.value);    
    })
  }
  totalScore = totalScore/totalProperties;
  totalScore = totalScore.toFixed(2);
  return totalScore + '%';
}


export default formatBigNumber;
