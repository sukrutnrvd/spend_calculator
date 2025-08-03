import { CalculationResult, Person } from "@/types";

import { Button } from "@heroui/button";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("app");
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
            {t("sharedDataFound")}
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            {people.length > 0 && (
              <span className="block">
                {t("peopleCount", { count: people.length })}
              </span>
            )}
            {result && (
              <span className="block">{t("calculationAvailable")}</span>
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
              {t("load")}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              color="danger"
              variant="light"
              size="sm"
              onClick={onClearShared}
            >
              {t("reject")}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SharedDataLoader;
