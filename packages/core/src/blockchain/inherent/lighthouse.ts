import { GenericExtrinsic } from '@polkadot/types'
import { HexString } from '@polkadot/util/types'
import { Block } from '../block.js'
import { InherentProvider } from './index.js'

export class SetLighthouse implements InherentProvider {
  async createInherents(newBlock: Block): Promise<HexString[]> {
    const parent = await newBlock.parentBlock
    if (!parent) throw new Error('parent block not found')

    console.log('=================== LIGHTHOUSE ===================')

    const meta = await parent.meta
    return [
      new GenericExtrinsic(
        meta.registry,
        meta.tx.lighthouse.set('4Gb3m5xYmkLFC1x8HnjsDtHwkG9YJWtqyZQv1pQGkYWwCv34'),
      ).toHex(),
    ]
  }
}
