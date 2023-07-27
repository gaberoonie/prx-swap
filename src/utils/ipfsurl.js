export const getIpfsUrl = (ipfsurl) => {
    return ipfsurl.replace("ipfs://", "https://ipfs.io/ipfs/");
}

export const getPads = (number) => {
    return `#${number.toString().padStart(6, '0')}`;
}