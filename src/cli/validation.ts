// src/cli/validation.ts

/**
 * Parses a string input as a whole number (integer, positive or negative or zero).
 *
 * @param input - The raw string from the user.
 * @param label - Human-readable name of the field, used in the error message.
 * @returns The parsed integer value.
 * @throws Error if the trimmed input is empty or does not match /^-?\d+$/.
 *
 * Time Complexity: O(k), k = input length (one trim pass + one regex scan)
 */
export function parseWholeNumber(input: string, label: string): number {
    const trimmed = input.trim();
    if (!/^-?\d+$/.test(trimmed)) {
        throw new Error(`${label} must be a whole number, got "${trimmed}".`);
    }
    return Number(trimmed);
}

