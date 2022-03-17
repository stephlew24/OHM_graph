import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts"
import * as Addresses from "../utils/AddressHelper"
import {loadOrCreateAccount} from "./loadOrCreateAccount"
import {checkOrCloseAccount} from "./checkOrCloseAccount"

// This is set up like SOHM and not like OHM

export function updateGOHMBalance(contractAddress: string, fromAddress: string, toAddress: string, amount: BigDecimal, timestamp: BigInt): void {
    let count = BigInt.fromString('1')
    let accountFrom = loadOrCreateAccount(Address.fromString(fromAddress), timestamp)
    let accountTo = loadOrCreateAccount(Address.fromString(toAddress), timestamp)
    // log.info("GOHM Init - contract {} = test {}, to {}, from {}, amount {}", [contractAddress, Addresses.GOHM_V1_ERC20_CONTRACT, toAddress, fromAddress, amount.toString()])
    if (contractAddress == Addresses.GOHM_V1_ERC20_CONTRACT) 
    {
        accountFrom.gohmBalance = accountFrom.gohmBalance.minus(amount)
        accountFrom.gohmSales = accountFrom.gohmSales.plus(count)
        accountTo.gohmBalance = accountTo.gohmBalance.plus(amount)
        accountTo.gohmPurchases = accountTo.gohmPurchases.plus(count)
        // log.info("GOHM Update - contract {}, to {}, balance {}, from {}, balance {}", [contractAddress, toAddress, accountTo.gohmBalance.toString(), fromAddress, accountFrom.gohmBalance.toString()])
    }
    checkOrCloseAccount(accountTo, timestamp)
    checkOrCloseAccount(accountFrom, timestamp)
    accountTo.save()
    accountFrom.save()
}
