import React, { useState } from "react";

import { Button } from "@heroui/button";
import { copyShareLink } from "@/utils/shareUtils";
import { motion } from "framer-motion";

interface ShareButtonProps {
  disabled?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({ disabled = false }) => {
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
        alert("Link kopyalanamadı! Lütfen tekrar deneyin.");
      }
    } catch (error) {
      alert("Paylaşım sırasında bir hata oluştu!");
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
        {isLoading
          ? "Kopyalanıyor..."
          : isCopied
            ? "Kopyalandı!"
            : "Sonucu Paylaş"}
      </Button>
    </motion.div>
  );
};

export default ShareButton;
