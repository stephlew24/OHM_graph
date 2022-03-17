import {Address, BigDecimal, BigInt, log} from "@graphprotocol/graph-ts"
import {Account} from '../../generated/schema'

export function checkOrCloseAccount(account: Account, timestamp: BigInt): void {
// Check the To account (user) to see if it has been closed
if (account.ohmBalance <= BigDecimal.fromString('0') && account.sohmBalance <= BigDecimal.fromString('0') && account.gohmBalance <= BigDecimal.fromString('0'))  
{
account.accountStatus = "CLOSED"
account.dateClosed = timestamp
} 
else 
{
account.accountStatus = "OPEN" 
account.dateClosed = null
}
account.save()
account.save()
}