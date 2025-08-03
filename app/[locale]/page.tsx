"use client";

import { CalculationResult, Currency, Person } from "@/types";
import React, { useEffect, useState } from "react";
import { clearUrl, getDataFromUrl, setDataToUrl } from "@/utils/shareUtils";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@heroui/button";
import CalculationResults from "@/components/CalculationResults";
import CurrencySelector from "@/components/CurrencySelector";
import PersonForm from "@/components/PersonForm";
import PersonList from "@/components/PersonList";
import ShareButton from "@/components/ShareButton";
import SharedDataLoader from "@/components/SharedDataLoader";
import { calculateExpenses } from "@/utils/expenseCalculator";
import { getDefaultCurrency } from "@/utils/currencyUtils";
import { motion } from "framer-motion";

const HomePage = () => {
  const t = useTranslations("app");
  const locale = useLocale();
  const [people, setPeople] = useState<Person[]>([]);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    getDefaultCurrency(locale)
  );
  const [sharedData, setSharedData] = useState<{
    people: Person[];
    result: CalculationResult | null;
  }>({ people: [], result: null });

  // URL'den paylaşılan veriyi kontrol et
  useEffect(() => {
    const { people: urlPeople, result: urlResult } = getDataFromUrl();
    if (urlPeople.length > 0 || urlResult) {
      setSharedData({ people: urlPeople, result: urlResult });
    }
  }, []);

  // Veri değiştiğinde URL'yi güncelle
  useEffect(() => {
    setDataToUrl(people, calculationResult);
  }, [people, calculationResult]);

  const addPerson = (personData: Omit<Person, "id">) => {
    const newPerson: Person = {
      ...personData,
      id: Date.now().toString(),
    };
    setPeople([...people, newPerson]);
    setCalculationResult(null); // Yeni kişi eklendiğinde sonucu sıfırla
  };

  const removePerson = (id: string) => {
    setPeople(people.filter((person) => person.id !== id));
    setCalculationResult(null); // Kişi silindiğinde sonucu sıfırla
  };

  const handleCalculate = () => {
    if (people.length < 2) {
      alert(t("validation.minTwoPeople"));
      return;
    }

    const result = calculateExpenses(people);
    setCalculationResult(result);
  };

  const clearAll = () => {
    setPeople([]);
    setCalculationResult(null);
    clearUrl();
  };

  const loadSharedData = (
    sharedPeople: Person[],
    sharedResult: CalculationResult | null
  ) => {
    setPeople(sharedPeople);
    setCalculationResult(sharedResult);
    setSharedData({ people: [], result: null });
    clearUrl();
  };

  const clearSharedData = () => {
    setSharedData({ people: [], result: null });
    clearUrl();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Paylaşılan Veri Yükleyici */}
        <SharedDataLoader
          people={sharedData.people}
          result={sharedData.result}
          onLoadData={loadSharedData}
          onClearShared={clearSharedData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Form ve Liste */}
          <div className="space-y-6">
            <PersonForm
              onAddPerson={addPerson}
              selectedCurrency={selectedCurrency}
            />
            <PersonList
              people={people}
              onRemovePerson={removePerson}
              selectedCurrency={selectedCurrency}
            />

            {/* Hesaplama Butonları */}
            {people.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Button
                      color="primary"
                      size="lg"
                      onClick={handleCalculate}
                      className="w-full"
                    >
                      {t("calculate")}
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button color="danger" variant="light" onClick={clearAll}>
                      {t("clear")}
                    </Button>
                  </motion.div>
                </div>

                {/* Paylaşım Butonu */}
                {calculationResult && <ShareButton disabled={false} />}
              </motion.div>
            )}
          </div>

          {/* Sağ Taraf - Sonuçlar */}
          <div>
            <CalculationResults
              result={calculationResult}
              selectedCurrency={selectedCurrency}
            />
          </div>
        </div>

        {/* Kullanım Talimatları */}
        {people.length === 0 && (
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              {t("instructions.title")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">
                  {t("instructions.step1.title")}
                </h4>
                <ul className="space-y-1">
                  {t
                    .raw("instructions.step1.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  {t("instructions.step2.title")}
                </h4>
                <ul className="space-y-1">
                  {t
                    .raw("instructions.step2.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  {t("instructions.step3.title")}
                </h4>
                <ul className="space-y-1">
                  {t
                    .raw("instructions.step3.items")
                    .map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
