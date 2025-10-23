import type { Mask, MaskFunction, Pipe } from './text-mask/types'
import type {
  MaskitoOptions,
  MaskitoMask,
  MaskitoMaskExpression,
  MaskitoPostprocessor,
} from '@maskito/core'
import { MaskitoNumberConverter } from './MaskitoNumberConverter'
import type { CreateNumberMaskOptions } from './addons/createNumberMask'

// Define ElementState locally since it's not exported
interface ElementState {
  readonly value: string
  readonly selection: readonly [from: number, to: number]
}

// Enhanced mask conversion utilities for Maskito
export class MaskitoConverter {
  // Convert text-mask array to Maskito mask expression
  static convertMaskToExpression(mask: Mask): MaskitoMaskExpression {
    return mask.map((char) => {
      if (char instanceof RegExp) {
        return char // Keep RegExp as-is for Maskito
      }
      return char as string
    })
  }

  // Convert regex patterns to Maskito expressions
  static convertRegexToMaskito(regex: RegExp): string {
    const source = regex.source

    // Common patterns
    if (source === '\\d') return '0'
    if (source === '[0-9]') return '0'
    if (source === '[a-zA-Z]') return 'A'
    if (source === '[a-z]') return 'a'
    if (source === '[A-Z]') return 'A'
    if (source === '[a-zA-Z0-9]') return '0'
    if (source === '[A-Za-z0-9]') return '0'

    // Handle more complex patterns
    if (source.includes('\\d')) return '0'
    if (source.includes('[0-9]')) return '0'
    if (source.includes('[a-zA-Z]')) return 'A'

    // Fallback for unknown patterns
    return '0'
  }

  // Convert text-mask function to Maskito mask function
  static convertMaskFunction(
    maskFn: MaskFunction
  ): (elementState: ElementState) => MaskitoMaskExpression {
    return (elementState: ElementState) => {
      try {
        const result = maskFn(elementState.value || '', {
          currentCaretPosition: elementState.selection[0] || 0,
          previousConformedValue: '',
          placeholderChar: '_',
        })

        if (Array.isArray(result)) {
          return this.convertMaskToExpression(result)
        }

        return result ? this.convertMaskToExpression(result) : []
      } catch (error) {
        console.warn('Error in mask function:', error)
        return []
      }
    }
  }

  // Convert pipe function to Maskito processor
  static convertPipeToProcessor(pipe: Pipe): MaskitoPostprocessor {
    return (
      elementState: ElementState,
      initialElementState: ElementState
    ) => {
      try {
        const result = pipe(elementState.value, {
          rawValue: elementState.value,
          previousConformedValue: initialElementState.value,
          guide: true,
          placeholderChar: '_',
          placeholder: '',
          currentCaretPosition: elementState.selection[0],
          keepCharPositions: false,
        })

        if (typeof result === 'string') {
          return { ...elementState, value: result }
        }

        if (result && typeof result === 'object' && 'value' in result) {
          return { ...elementState, value: result.value }
        }

        return elementState
      } catch (error) {
        console.warn('Error in pipe function:', error)
        return elementState
      }
    }
  }

  // Main conversion method
  static convertToMaskitoOptions(
    mask:
      | Mask
      | MaskFunction
      | boolean
      | { mask?: Mask | MaskFunction; pipe?: Pipe },
    pipe?: Pipe,
    guide?: boolean,
    placeholderChar?: string,
    keepCharPositions?: boolean,
    showMask?: boolean
  ): MaskitoOptions {
    // Handle number masks specially
    if (this.isNumberMask(mask)) {
      return this.convertNumberMask(mask)
    }
    let maskExpression: MaskitoMask = []

    if (mask === false) {
      return { mask: [] }
    }

    if (Array.isArray(mask)) {
      maskExpression = this.convertMaskToExpression(mask)
    } else if (typeof mask === 'function') {
      maskExpression = this.convertMaskFunction(mask)
    } else if (mask && typeof mask === 'object' && 'mask' in mask) {
      const maskObj = mask as { mask: Mask | MaskFunction; pipe?: Pipe }
      if (Array.isArray(maskObj.mask)) {
        maskExpression = this.convertMaskToExpression(maskObj.mask)
      } else if (typeof maskObj.mask === 'function') {
        maskExpression = this.convertMaskFunction(maskObj.mask)
      }
    }

    const options: MaskitoOptions = {
      mask: maskExpression,
      preprocessors: [],
      postprocessors: pipe ? [this.convertPipeToProcessor(pipe)] : [],
    }

    return options
  }

  // Check if mask is a number mask
  static isNumberMask(mask: any): boolean {
    return (
      mask &&
      typeof mask === 'function' &&
      mask.instanceOf === 'createNumberMask' &&
      mask.maskParams
    )
  }

  // Convert number mask to Maskito options
  static convertNumberMask(mask: any): MaskitoOptions {
    const maskParams = mask.maskParams as CreateNumberMaskOptions

    // Determine if it's currency or percentage based on suffix
    if (maskParams.suffix === '%') {
      return MaskitoNumberConverter.convertPercentMaskOptions(maskParams)
    } else if (maskParams.suffix && maskParams.suffix.length > 0) {
      return MaskitoNumberConverter.convertCurrencyMaskOptions(maskParams)
    } else {
      return MaskitoNumberConverter.convertNumberMaskOptions(maskParams)
    }
  }
}
