// Tracking Staking and Unstaking (minting and buring of sOHM)
import {BigDecimal, BigInt, Address, log} from "@graphprotocol/graph-ts"
import * as Addresses from "./utils/AddressHelper"
import {StakeCall, UnstakeCall} from '../generated/SOHM_V2_Staking/SOHM_V2_Staking'
import {loadOrCreateTransaction} from "./utils/loadOrCreateTransaction"
import {loadOrCreateContract} from "./utils/loadOrCreateContract"
import {updateSOHMBalance} from "./utils/UpdateSOHMBalance"

// Store the variables from each transaction
export function handleStake(call: StakeCall): void {
    let type = "Stake"
    let contractAddress = Address.fromString(Addresses.STAKING_CONTRACT_V2)
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
    // log.info("Stake Call - type {}, contract {}, from {}, to {}", [type, contractString, from, to])
}

export function handleUnstake(call: UnstakeCall): void {
    let type = "Unstake"
    let contractAddress = Address.fromString(Addresses.STAKING_CONTRACT_V2)
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
    // log.info("Unstake Call - type {}, contract {}, from {}, to {}", [type, contractString, from, to])
}
