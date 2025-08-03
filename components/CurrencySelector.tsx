"use client";

import { Currency, currencies } from "@/utils/currencyUtils";
import React, { useState } from "react";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const t = useTranslations("app");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="flat"
          color="primary"
          size="sm"
          className="min-w-0 px-3 py-2"
          onClick={() => setIsOpen(!isOpen)}
          startContent={
            <span className="text-lg font-medium">
              {selectedCurrency.symbol}
            </span>
          }
        >
          <span className="hidden sm:inline">{selectedCurrency.code}</span>
          <span className="sm:hidden">{selectedCurrency.symbol}</span>
        </Button>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <div className="max-h-48 overflow-y-auto">
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className={`flex items-center gap-3 py-2 px-3 hover:bg-gray-50 cursor-pointer ${
                  selectedCurrency.code === currency.code ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  onCurrencyChange(currency);
                  setIsOpen(false);
                }}
              >
                <span className="text-lg font-medium">{currency.symbol}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{currency.code}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CurrencySelector;
