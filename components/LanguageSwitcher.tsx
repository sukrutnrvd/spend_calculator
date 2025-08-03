"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@heroui/button";
import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const LanguageSwitcher: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === locale);
  const nextLanguage = languages.find((lang) => lang.code !== locale);

  const handleLanguageChange = () => {
    if (nextLanguage) {
      // Remove the current locale from the pathname
      const pathWithoutLocale = pathname.replace(`/${locale}`, "");
      const newPath = `/${nextLanguage.code}${pathWithoutLocale}`;
      router.push(newPath);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50"
    >
      <Button
        color="primary"
        variant="flat"
        size="sm"
        onClick={handleLanguageChange}
        className="min-w-0 px-3 py-2"
        startContent={
          <span className="text-lg">
            {nextLanguage?.flag || currentLanguage?.flag}
          </span>
        }
      >
        <span className="hidden sm:inline">
          {nextLanguage?.name || currentLanguage?.name}
        </span>
        <span className="sm:hidden">
          {nextLanguage?.code.toUpperCase() ||
            currentLanguage?.code.toUpperCase()}
        </span>
      </Button>
    </motion.div>
  );
};

export default LanguageSwitcher;
