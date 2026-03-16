interface CardNumberTextProps {
    cardNumber: string;
    skeleton: boolean;
}
/**
 * A functional component that displays the text representation of a card number
 * with optional skeleton styling for loading states.
 *
 * @param {CardNumberTextProps} props - The properties for the CardNumberText component.
 * @param {string} props.cardNumber - The card number to display.
 * @param {boolean} props.skeleton - Determines if skeleton styling is applied for loading states.
 * @returns A span element containing the card number with optional skeleton styling.
 */
declare const CardNumberText: ({ cardNumber, skeleton }: CardNumberTextProps) => import("react/jsx-runtime").JSX.Element;
/**
 * Formats a credit card number by preserving a specified number of trailing digits and
 * masking the rest with spaces. If no specific number of digits is provided, the card
 * number is formatted by replacing all spaces or non-numeric characters with a single
 * space.
 *
 * @param {string} cardNumber - The credit card number to format.
 * @param [digits=8] - The number of trailing digits to preserve in the card number.
 *                              Defaults to 8 if not specified.
 * @returns {string} The formatted credit card number.
 */
export declare const formatCardNumber: (cardNumber: string, digits?: number) => string;
export default CardNumberText;
