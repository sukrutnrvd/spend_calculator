import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@heroui/button";
import { Person } from "@/types";
import React from "react";
import { formatCurrency } from "@/utils/expenseCalculator";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("IBAN kopyalandı!");
  } catch (err) {
    console.error("Kopyalama başarısız:", err);
    alert("Kopyalama başarısız oldu!");
  }
};

interface PersonListProps {
  people: Person[];
  onRemovePerson: (id: string) => void;
}

const PersonList: React.FC<PersonListProps> = ({ people, onRemovePerson }) => {
  if (people.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Henüz kişi eklenmemiş. Kişi eklemek için yukarıdaki formu kullanın.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Kişi Listesi</h3>

      <AnimatePresence>
        {people.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{person.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600">IBAN: {person.iban}</p>
                  <Button
                    size="sm"
                    variant="light"
                    color="primary"
                    onClick={() => copyToClipboard(person.iban)}
                    className="min-w-0 px-2 py-1 text-xs"
                  >
                    📋
                  </Button>
                </div>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  {formatCurrency(person.expenses)}
                </p>
              </div>

              <Button
                color="danger"
                size="sm"
                variant="light"
                onClick={() => onRemovePerson(person.id)}
              >
                Sil
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="font-medium text-blue-900">Toplam Harcama:</span>
          <span className="text-xl font-bold text-blue-900">
            {formatCurrency(
              people.reduce((sum, person) => sum + person.expenses, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonList;
