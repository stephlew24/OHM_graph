import {Address, BigInt, BigDecimal} from "@graphprotocol/graph-ts"
import {Token} from '../../generated/schema'


export function loadOrCreateToken(address: Address, name: string, symbol: string, decimal: string, totalSupply: BigDecimal): Token {
  // Update the entity according to the following logic
    let token = Token.load(address.toHexString())
    if (token == null) {
        token = new Token(address.toHexString())
        token.name = name
        token.symbol = symbol
        token.decimal = decimal
        token.totalSupply = totalSupply
        token.save() 
    }
    return token as Token
}

