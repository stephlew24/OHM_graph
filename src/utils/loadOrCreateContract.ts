import {Contract} from '../../generated/schema'

export function loadOrCreateContract(id: string): Contract {
    let contract = Contract.load(id)
    if (contract == null) {
        contract = new Contract(id)
        contract.save()
    }
    return contract as Contract
}