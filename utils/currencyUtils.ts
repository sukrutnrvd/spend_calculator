import { Currency } from "@/types";

export type { Currency };

export const currencies: Currency[] = [
  {
    code: "TRY",
    symbol: "₺",
    name: "Turkish Lira",
    locale: "tr-TR",
  },
  {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    locale: "en-US",
  },
  {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    locale: "de-DE",
  },
  {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    locale: "en-GB",
  },
  {
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    locale: "ja-JP",
  },
  {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    locale: "en-CA",
  },
  {
    code: "AUD",
    symbol: "A$",
    name: "Australian Dollar",
    locale: "en-AU",
  },
  {
    code: "CHF",
    symbol: "CHF",
    name: "Swiss Franc",
    locale: "de-CH",
  },
  {
    code: "SEK",
    symbol: "kr",
    name: "Swedish Krona",
    locale: "sv-SE",
  },
  {
    code: "NOK",
    symbol: "kr",
    name: "Norwegian Krone",
    locale: "nb-NO",
  },
];

export const getCurrencyByCode = (code: string): Currency => {
  return currencies.find((currency) => currency.code === code) || currencies[0];
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback formatting
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
};

export const getDefaultCurrency = (locale: string): Currency => {
  // Locale'e göre varsayılan para birimi seç
  if (locale.startsWith("tr")) {
    return getCurrencyByCode("TRY");
  } else if (locale.startsWith("en")) {
    return getCurrencyByCode("USD");
  } else if (locale.startsWith("de")) {
    return getCurrencyByCode("EUR");
  } else if (locale.startsWith("ja")) {
    return getCurrencyByCode("JPY");
  } else if (locale.startsWith("sv")) {
    return getCurrencyByCode("SEK");
  } else if (locale.startsWith("nb") || locale.startsWith("no")) {
    return getCurrencyByCode("NOK");
  }

  // Varsayılan olarak USD
  return getCurrencyByCode("USD");
};
