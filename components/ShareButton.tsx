import React, { useState } from "react";

import { Button } from "@heroui/button";
import { copyShareLink } from "@/utils/shareUtils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ShareButtonProps {
  disabled?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({ disabled = false }) => {
  const t = useTranslations("app");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    if (disabled) return;

    setIsLoading(true);

    try {
      const success = await copyShareLink();

      if (success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        alert(t("validation.linkCopyError"));
      }
    } catch (error) {
      alert(t("validation.shareError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        color="success"
        variant="solid"
        onClick={handleShare}
        disabled={disabled || isLoading}
        className="w-full"
        startContent={
          isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isCopied ? (
            "✅"
          ) : (
            "📤"
          )
        }
      >
        {isLoading ? t("copying") : isCopied ? t("copied") : t("share")}
      </Button>
    </motion.div>
  );
};

export default ShareButton;
