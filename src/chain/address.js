const shorten = address => {
  if (address && address.length > 7) {
    return `0x..${address.substr(address.length - 7)}`
  }
  return ''
}

export default { shorten }
