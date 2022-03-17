import {BigDecimal, BigInt} from '@graphprotocol/graph-ts'

export const DECIMALS = 18

// function to calculate rebases
export function rebase(base: BigDecimal, exponent: number): BigDecimal {
    let result = base
    if (exponent == 0) {
        return BigDecimal.fromString('1')
    }

    for (let i = 2; i <= exponent; i++) {
        result = result.times(base)
    }

    return result
}

export function toDecimal(value: BigInt, decimals: number = DECIMALS): BigDecimal {
    let precision = BigInt.fromI32(10).pow(<u8>decimals).toBigDecimal()
    return value.divDecimal(precision)
} 