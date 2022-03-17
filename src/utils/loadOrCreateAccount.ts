import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts"
import {Account} from "../../generated/schema"

export function loadOrCreateAccount(address: Address, timestamp: BigInt): Account {
    let account = Account.load(address.toHexString())
    if (account == null) {
        account = new Account(address.toHexString())
        account.ohmBalance = BigDecimal.fromString('0')
        account.sohmBalance = BigDecimal.fromString('0')
        account.dateCreated = timestamp
        account.accountStatus = "OPEN"
        account.dateClosed = null
        account.ohmPurchases = BigInt.zero()
        account.ohmSales = BigInt.zero()
        account.sohmStakes = BigInt.zero()
        account.sohmUnstakes = BigInt.zero()
        account.save()
    }
    return account as Account
}