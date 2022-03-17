import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts"
import * as Addresses from "../utils/AddressHelper"
import {loadOrCreateAccount} from "./loadOrCreateAccount"
import {checkOrCloseAccount} from "./checkOrCloseAccount"

export function updateSOHMBalance(type: string, contractAddress: string, fromAddress: string, toAddress: string, amount: BigDecimal, timestamp: BigInt): void {
    let count = BigInt.fromString('1')
    let accountFrom = loadOrCreateAccount(Address.fromString(fromAddress), timestamp)
    // log.info("SOHM Init - Contact {}, To {}, From {}", [contractAddress, toAddress, fromAddress])

    if (type == "Stake")  // base this on the contract
    {
        accountFrom.sohmBalance = accountFrom.sohmBalance.plus(amount)
        accountFrom.sohmStakes = accountFrom.sohmStakes.plus(count)
    // log.info("Stake - Contact {}, To {}, From {}", [contractAddress, toAddress, fromAddress])
    } 
    else if (type == "Unstake")
    {
        accountFrom.sohmBalance = accountFrom.sohmBalance.minus(amount)
        accountFrom.sohmUnstakes = accountFrom.sohmUnstakes.plus(count)
    // log.info("Unstake - Contact {}, To {}, From {}", [contractAddress, toAddress, fromAddress])
    }
    checkOrCloseAccount(accountFrom, timestamp)
    accountFrom.save()
}
