import { CalculationResult, Person } from "@/types";

// URL'den veri okuma
export const getDataFromUrl = (): {
  people: Person[];
  result: CalculationResult | null;
} => {
  if (typeof window === "undefined") {
    return { people: [], result: null };
  }

  const urlParams = new URLSearchParams(window.location.search);
  const peopleData = urlParams.get("people");
  const resultData = urlParams.get("result");

  try {
    const people = peopleData ? JSON.parse(decodeURIComponent(peopleData)) : [];
    const result = resultData
      ? JSON.parse(decodeURIComponent(resultData))
      : null;

    return { people, result };
  } catch (error) {
    console.error("URL'den veri okuma hatası:", error);
    return { people: [], result: null };
  }
};

// URL'ye veri yazma
export const setDataToUrl = (
  people: Person[],
  result: CalculationResult | null
): void => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  if (people.length > 0) {
    url.searchParams.set("people", encodeURIComponent(JSON.stringify(people)));
  } else {
    url.searchParams.delete("people");
  }

  if (result) {
    url.searchParams.set("result", encodeURIComponent(JSON.stringify(result)));
  } else {
    url.searchParams.delete("result");
  }

  window.history.replaceState({}, "", url.toString());
};

// Paylaşım linkini kopyalama
export const copyShareLink = async (): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    return true;
  } catch (error) {
    console.error("Link kopyalama hatası:", error);
    return false;
  }
};

// URL'yi temizleme
export const clearUrl = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.delete("people");
  url.searchParams.delete("result");
  window.history.replaceState({}, "", url.toString());
};
