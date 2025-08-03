import { CalculationResult, Person } from "@/types";

import { Button } from "@heroui/button";
import React from "react";
import { motion } from "framer-motion";

interface SharedDataLoaderProps {
  people: Person[];
  result: CalculationResult | null;
  onLoadData: (people: Person[], result: CalculationResult | null) => void;
  onClearShared: () => void;
}

const SharedDataLoader: React.FC<SharedDataLoaderProps> = ({
  people,
  result,
  onLoadData,
  onClearShared,
}) => {
  const hasSharedData = people.length > 0 || result !== null;

  if (!hasSharedData) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📤 Paylaşılan Veri Bulundu
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            {people.length > 0 && (
              <span className="block">👥 {people.length} kişi</span>
            )}
            {result && (
              <span className="block">🧮 Hesaplama sonucu mevcut</span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              color="primary"
              size="sm"
              onClick={() => onLoadData(people, result)}
            >
              📥 Yükle
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              color="danger"
              variant="light"
              size="sm"
              onClick={onClearShared}
            >
              ❌ Reddet
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SharedDataLoader;
