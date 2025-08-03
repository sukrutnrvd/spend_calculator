"use client";

import { CalculationResult, Person } from "@/types";
import React, { useState } from "react";

import { Button } from "@heroui/button";
import CalculationResults from "@/components/CalculationResults";
import PersonForm from "@/components/PersonForm";
import PersonList from "@/components/PersonList";
import { calculateExpenses } from "@/utils/expenseCalculator";
import { motion } from "framer-motion";

const HomePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [calculationResult, setCalculationResult] =
    useState<CalculationResult | null>(null);

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
      alert("Hesaplama yapmak için en az 2 kişi eklemeniz gerekiyor!");
      return;
    }

    const result = calculateExpenses(people);
    setCalculationResult(result);
  };

  const clearAll = () => {
    setPeople([]);
    setCalculationResult(null);
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
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            💰 Harcama Hesaplayıcı
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-600"
          >
            Kişilerin harcamalarını girerek kimin kime ne kadar para vermesi
            gerektiğini hesaplayın
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Form ve Liste */}
          <div className="space-y-6">
            <PersonForm onAddPerson={addPerson} />
            <PersonList people={people} onRemovePerson={removePerson} />

            {/* Hesaplama Butonları */}
            {people.length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex gap-4"
              >
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
                    🧮 Hesapla
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button color="danger" variant="light" onClick={clearAll}>
                    🗑️ Temizle
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Sağ Taraf - Sonuçlar */}
          <div>
            <CalculationResults result={calculationResult} />
          </div>
        </div>

        {/* Kullanım Talimatları */}
        {people.length === 0 && (
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              📋 Nasıl Kullanılır?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">1. Kişi Ekleme</h4>
                <ul className="space-y-1">
                  <li>• Her kişinin adını ve soyadını girin</li>
                  <li>• IBAN bilgisini ekleyin</li>
                  <li>• O kişinin yaptığı harcama miktarını girin</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">2. Hesaplama</h4>
                <ul className="space-y-1">
                  <li>
                    • En az 2 kişi ekledikten sonra "Hesapla" butonuna basın
                  </li>
                  <li>
                    • Sistem otomatik olarak kimin kime ne kadar para vermesi
                    gerektiğini hesaplayacak
                  </li>
                  <li>• Sonuçlar sağ tarafta görüntülenecek</li>
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
