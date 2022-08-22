const FIREBASE_DOMAIN =
  "https://react-http-323ac-default-rtdb.asia-southeast1.firebasedatabase.app";

interface Type {
  id: string;
  name: string;
}

export async function getAllQuotes(): Promise<Type[]> {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}
