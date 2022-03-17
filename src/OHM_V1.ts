import {BigDecimal, Address, log} from "@graphprotocol/graph-ts"
import * as Addresses from "./utils/AddressHelper"
import {Transfer, OHM_V1} from "../generated/OHM_V1/OHM_V1"
import {loadOrCreateToken} from "./utils/loadOrCreateToken"
import {loadOrCreateTransaction} from "./utils/loadOrCreateTransaction"
import {loadOrCreateContract} from "./utils/loadOrCreateContract"
import {updateOHMBalance} from "./utils/UpdateOHMBalance"


// Store the variables from each transaction
export function handleTransfer(event: Transfer): void {
    let contractAddress = Address.fromString(Addresses.OHM_V1_ERC20_CONTRACT)
    loadOrCreateContract(contractAddress.toHexString())
    let txHash = event.transaction.hash.toHexString()
    let contractString = contractAddress.toHexString()
    let timestamp = event.block.timestamp
    let blockNumber = event.block.number
    let blockHash = event.block.hash.toHexString()
    let from = event.params.from.toHexString()
    let to = event.params.to.toHexString()
    let amount = event.params.value.toBigDecimal().div(BigDecimal.fromString('1e9'))
    loadOrCreateTransaction(txHash, contractString, timestamp, blockNumber, blockHash, from, to, amount)
    updateOHMBalance(contractString, from, to, amount, timestamp)

// Check the token and update the total supply
    let contract = OHM_V1.bind(Address.fromString(Addresses.OHM_V1_ERC20_CONTRACT))
    let name = contract.name()
    let symbol = contract.symbol()
    let decimal = contract.decimals().toString()
    let totalSupply = contract.totalSupply().toBigDecimal().div(BigDecimal.fromString(decimal))
    loadOrCreateToken(contractAddress, name, symbol, decimal, totalSupply)
}