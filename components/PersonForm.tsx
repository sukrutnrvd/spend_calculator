import React, { useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Person } from "@/types";
import { motion } from "framer-motion";

interface PersonFormProps {
  onAddPerson: (person: Omit<Person, "id">) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ onAddPerson }) => {
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [expenses, setExpenses] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !iban.trim() || !expenses.trim()) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const expensesNumber = parseFloat(expenses);
    if (isNaN(expensesNumber) || expensesNumber < 0) {
      alert("Lütfen geçerli bir harcama miktarı girin!");
      return;
    }

    onAddPerson({
      name: name.trim(),
      iban: iban.trim(),
      expenses: expensesNumber,
    });

    // Formu temizle
    setName("");
    setIban("");
    setExpenses("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow-md"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-gray-800"
      >
        Kişi Ekle
      </motion.h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Input
            label="Ad Soyad"
            placeholder="Kişinin adını ve soyadını girin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Input
            label="IBAN"
            placeholder="TR00 0000 0000 0000 0000 0000 00"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            required
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Input
            label="Harcama Miktarı (₺)"
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            required
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button type="submit" color="primary" className="w-full">
          Kişi Ekle
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default PersonForm;
