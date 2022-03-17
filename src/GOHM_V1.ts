import {BigDecimal, Address, log} from "@graphprotocol/graph-ts"
import * as Addresses from "./utils/AddressHelper"
import {TransferCall, Transfer, GOHM_V1} from "../generated/GOHM_V1/GOHM_V1"
import {loadOrCreateToken} from "./utils/loadOrCreateToken"
import {loadOrCreateTransaction} from "./utils/loadOrCreateTransaction"
import {loadOrCreateContract} from "./utils/loadOrCreateContract"
import {updateGOHMBalance} from "./utils/UpdateGOHMBalance"


// Store the variables from each transaction
export function handleTransfer(event: Transfer): void {
    let contractAddress = Address.fromString(Addresses.GOHM_V1_ERC20_CONTRACT)
    loadOrCreateContract(contractAddress.toHexString())
    let txHash = event.transaction.hash.toHexString()
    let contractString = contractAddress.toHexString()
    let timestamp = event.block.timestamp
    let blockNumber = event.block.number
    let blockHash = event.block.hash.toHexString()
    let from = event.params.from.toHexString()
    let to = event.params.to.toHexString()
    let amount = event.params.value.toBigDecimal().div(BigDecimal.fromString('1e18'))
    loadOrCreateTransaction(txHash, contractString, timestamp, blockNumber, blockHash, from, to, amount)
    updateGOHMBalance(contractString, from, to, amount, timestamp)
    // log.info("GOHM Call - contract {}, to {}, from {}, amount {}", [contractString, to, from, amount.toString()])

// Check the token and update the total supply
    let contract = GOHM_V1.bind(Address.fromString(Addresses.GOHM_V1_ERC20_CONTRACT))
    let name = contract.name()
    let symbol = contract.symbol()
    let decimal = contract.decimals().toString()
    let totalSupply = contract.totalSupply().toBigDecimal().div(BigDecimal.fromString(decimal))
    loadOrCreateToken(contractAddress, name, symbol, decimal, totalSupply)
}