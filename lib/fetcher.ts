/**
 * @param url - The URL to fetch from.
 * @param options - The options to pass to the fetch function.
 * @returns The response from the fetch function.
 */
export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Fetch failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json() as T;
}
