import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts"
import {loadOrCreateAccount} from "./loadOrCreateAccount"
import {checkOrCloseAccount} from "./checkOrCloseAccount"
import * as Addresses from "../utils/AddressHelper"

export function updateOHMBalance(contractAddress: string, fromAddress: string, toAddress: string, amount: BigDecimal, timestamp: BigInt): void {
    let count = BigInt.fromString('1')
    let accountFrom = loadOrCreateAccount(Address.fromString(fromAddress), timestamp)
    let accountTo = loadOrCreateAccount(Address.fromString(toAddress), timestamp)
    if (contractAddress == Addresses.OHM_V1_ERC20_CONTRACT || contractAddress == Addresses.OHM_V2_ERC20_CONTRACT  ) 
    {
        accountFrom.ohmBalance = accountFrom.ohmBalance.minus(amount)
        accountFrom.ohmSales = accountFrom.ohmSales.plus(count)
        accountTo.ohmBalance = accountTo.ohmBalance.plus(amount)
        accountTo.ohmPurchases = accountTo.ohmPurchases.plus(count)
    }
    checkOrCloseAccount(accountTo, timestamp)
    checkOrCloseAccount(accountFrom, timestamp)
    accountTo.save()
    accountFrom.save()
}
