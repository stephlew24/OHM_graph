import {BigDecimal, Address, log} from "@graphprotocol/graph-ts"
import * as Addresses from "./utils/AddressHelper"
import {StakeCall} from "../generated/SOHM_Staking_Helper/SOHM_Staking_Helper"
import {loadOrCreateTransaction} from "./utils/loadOrCreateTransaction"
import {loadOrCreateContract} from "./utils/loadOrCreateContract"
import {updateSOHMBalance} from "./utils/UpdateSOHMBalance"

export function handleStake(call: StakeCall): void {
    let type = "Stake"
    let contractAddress = Address.fromString(Addresses.STAKING_CONTRACT_HELPER)
    loadOrCreateContract(contractAddress.toHexString())
    let txHash = call.transaction.hash.toHexString()
    let contractString = contractAddress.toHexString()
    let timestamp = call.block.timestamp
    let blockNumber = call.block.number
    let blockHash = call.block.hash.toHexString()
    let from = call.from.toHexString()
    let to = call.to.toHexString()
    let amount = call.inputs._amount.toBigDecimal().div(BigDecimal.fromString('1e9'))
    loadOrCreateTransaction(txHash, contractString, timestamp, blockNumber, blockHash, from, to, amount)
    updateSOHMBalance(type, contractString, from, to, amount, timestamp)
    log.info("Stake Helper - contract {}, from {}, to {}, amount {}", [contractString, from, to, amount.toString()])
}