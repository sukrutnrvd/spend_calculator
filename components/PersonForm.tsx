import { Currency, Person } from "@/types";
import React, { useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface PersonFormProps {
  onAddPerson: (person: Omit<Person, "id">) => void;
  selectedCurrency: Currency;
}

const PersonForm: React.FC<PersonFormProps> = ({
  onAddPerson,
  selectedCurrency,
}) => {
  const t = useTranslations("app");
  const [name, setName] = useState("");
  const [iban, setIban] = useState("");
  const [expenses, setExpenses] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    iban: false,
    expenses: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Tüm alanları touched yap
    setTouched({ name: true, iban: true, expenses: true });

    if (!name.trim() || !iban.trim() || !expenses.trim()) {
      alert(t("validation.fillAllFields"));
      return;
    }

    const expensesNumber = parseFloat(expenses);
    if (isNaN(expensesNumber) || expensesNumber < 0) {
      alert(t("validation.validAmount"));
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
    setTouched({ name: false, iban: false, expenses: false });
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
        {t("addPerson")}
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
            label={t("form.name")}
            placeholder={t("form.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            required
            isInvalid={!name.trim() && touched.name}
            errorMessage={
              !name.trim() && touched.name ? t("validation.nameRequired") : ""
            }
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Input
            label={t("form.iban")}
            placeholder={t("form.ibanPlaceholder")}
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, iban: true }))}
            required
            isInvalid={!iban.trim() && touched.iban}
            errorMessage={
              !iban.trim() && touched.iban ? t("validation.ibanRequired") : ""
            }
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Input
            label={`${t("form.expenses")} (${selectedCurrency.symbol})`}
            placeholder={t("form.expensesPlaceholder")}
            type="number"
            step="0.01"
            min="0"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, expenses: true }))}
            required
            isInvalid={
              touched.expenses &&
              (expenses === "" ||
                isNaN(parseFloat(expenses)) ||
                parseFloat(expenses) < 0)
            }
            errorMessage={
              touched.expenses &&
              (expenses === "" ||
                isNaN(parseFloat(expenses)) ||
                parseFloat(expenses) < 0)
                ? t("validation.expensesInvalid")
                : ""
            }
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button type="submit" color="primary" className="w-full">
          {t("form.addButton")}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default PersonForm;
