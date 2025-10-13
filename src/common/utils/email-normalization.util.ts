/**
 * Utility function to normalize email addresses for consistent handling
 * across all authentication flows.
 *
 * @param email - The email address to normalize
 * @returns Normalized email address (lowercase and trimmed)
 */
export function normalizeEmail(email: string): string {
	if (!email || typeof email !== "string") {
		return email;
	}

	return email.trim().toLowerCase();
}

/**
 * Transform decorator for class-transformer to normalize email fields
 * Usage: @Transform(({ value }) => normalizeEmailTransform(value))
 */
export function normalizeEmailTransform(value: unknown): string {
	return normalizeEmail(value as string);
}
