import { traits } from "./traits";
const totalNfts = 10000;

export const calculateRarity = (type, value) => {
    const trait = traits[type];
    const traitUsedTotal = trait[value];
    const percent = traitUsedTotal * 100 / totalNfts;
    return percent;
}