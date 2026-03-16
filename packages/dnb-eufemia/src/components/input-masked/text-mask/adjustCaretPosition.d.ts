import type { CaretAdjustmentArgs } from './types';
export default function adjustCaretPosition({ previousConformedValue, previousPlaceholder, currentCaretPosition, conformedValue, rawValue, placeholderChar, placeholder, indexesOfPipedChars, caretTrapIndexes, keepCharPositions, }: CaretAdjustmentArgs): number;
