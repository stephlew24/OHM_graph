import {BigDecimal, Address, log} from "@graphprotocol/graph-ts"
import * as Addresses from "./utils/AddressHelper"
import {TransferCall, SOHM_V1} from "../generated/SOHM_V1/SOHM_V1"
import {fsOHM_18} from "../generated/SOHM_V1/fsOHM_18"
import {loadOrCreateToken} from "./utils/loadOrCreateToken"
import {loadOrCreateContract} from "./utils/loadOrCreateContract"

// Store the variables from each transaction
export function handleTransfer(call: TransferCall): void {
    let contractAddress = Address.fromString(Addresses.SOHM_ERC20_CONTRACT)
    loadOrCreateContract(contractAddress.toHexString())
// Check the token and update the total supply
    let contract = SOHM_V1.bind(Address.fromString(Addresses.SOHM_ERC20_CONTRACT))
    let name = contract.name()
    let symbol = contract.symbol()
    let decimal = contract.decimals().toString()
    let totalSupply = contract.totalSupply().toBigDecimal().div(BigDecimal.fromString(decimal))
    loadOrCreateToken(contractAddress, name, symbol, decimal, totalSupply)
}

let rari = fsOHM_18.bind(Address.fromString(Addresses.SOHM_ERC20_CONTRACT))
log.info("Balance Of {}", [rari.balanceOf.toString()])