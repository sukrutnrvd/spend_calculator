import { AnimatePresence, motion } from "framer-motion";
import { CalculationResult, Currency } from "@/types";

import React from "react";
import { formatCurrency } from "@/utils/currencyUtils";
import { useTranslations } from "next-intl";

interface CalculationResultsProps {
  result: CalculationResult | null;
  selectedCurrency: Currency;
}

const CalculationResults: React.FC<CalculationResultsProps> = ({
  result,
  selectedCurrency,
}) => {
  const t = useTranslations("app");

  if (!result) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-gray-800"
      >
        {t("calculationResults")}
      </motion.h3>

      {/* Özet Bilgiler */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-green-50 p-4 rounded-lg border border-green-200"
        >
          <div className="text-sm text-green-600 font-medium">
            {t("totalExpenseLabel")}
          </div>
          <div className="text-lg font-bold text-green-800 break-words">
            {formatCurrency(result.totalExpense, selectedCurrency)}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-blue-50 p-4 rounded-lg border border-blue-200"
        >
          <div className="text-sm text-blue-600 font-medium">
            {t("averagePerPerson")}
          </div>
          <div className="text-lg font-bold text-blue-800 break-words">
            {formatCurrency(result.averagePerPerson, selectedCurrency)}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="bg-purple-50 p-4 rounded-lg border border-purple-200"
        >
          <div className="text-sm text-purple-600 font-medium">
            {t("transferCount")}
          </div>
          <div className="text-lg font-bold text-purple-800">
            {result.transfers.length}
          </div>
        </motion.div>
      </motion.div>

      {/* Transfer Listesi */}
      {result.transfers.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="text-lg font-semibold text-gray-800 mb-4"
          >
            {t("transfers")}
          </motion.h4>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="space-y-3"
          >
            <AnimatePresence>
              {result.transfers.map((transfer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="flex gap-4 flex-col md:flex-row  md:items-center md:justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-red-600">
                        {transfer.from}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium text-green-600">
                        {transfer.to}
                      </span>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(transfer.amount, selectedCurrency)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t("transferAmount")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center py-8"
        >
          <div className="text-green-600 text-lg font-medium">
            {t("perfectMessage")}
          </div>
          <p className="text-gray-600 mt-2">{t("noTransferNeeded")}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CalculationResults;
