import {BigInt, BigDecimal, log} from "@graphprotocol/graph-ts"
import {Transaction} from '../../generated/schema'

export function loadOrCreateTransaction(txHash: string, contractString: string, timestamp: BigInt, blockNumber: BigInt, blockHash: string, from: string, to: string, amount: BigDecimal): Transaction {
    let transfer = Transaction.load(txHash)
    if (transfer == null) {
        transfer = new Transaction(txHash)
    }
    transfer.contract = contractString
    transfer.timestamp = timestamp
    transfer.blockNumber = blockNumber
    transfer.blockHash = blockHash
    transfer.from = from
    transfer.to = to
    transfer.amount = amount
    transfer.save()
    return transfer as Transaction
}
