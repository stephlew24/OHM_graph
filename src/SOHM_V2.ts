// Track Approvals
import {BigDecimal, Address, log} from "@graphprotocol/graph-ts"
import * as Addresses from "./utils/AddressHelper"
import {TransferCall, SOHM_V2} from "../generated/SOHM_V2/SOHM_V2"
import {loadOrCreateToken} from "./utils/loadOrCreateToken"
import {loadOrCreateContract} from "./utils/loadOrCreateContract"

// Store the variables from each transaction
export function handleTransfer(call: TransferCall): void {
    let contractAddress = Address.fromString(Addresses.SOHM_ERC20_CONTRACTV2)
    loadOrCreateContract(contractAddress.toHexString())
// Check the token and update the total supply
    let contract = SOHM_V2.bind(Address.fromString(Addresses.SOHM_ERC20_CONTRACTV2))
    let name = contract.name()
    let symbol = contract.symbol()
    let decimal = contract.decimals().toString()
    let totalSupply = contract.totalSupply().toBigDecimal().div(BigDecimal.fromString(decimal))
    loadOrCreateToken(contractAddress, name, symbol, decimal, totalSupply)
}