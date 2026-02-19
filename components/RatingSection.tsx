"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Toast } from "@/app/(Dashboard)/_components/Toast";
import { APP_URL } from "@/lib/ProjectId";
import { motion } from "framer-motion";

const STORAGE_KEY = (projectId: string) => `rating_${projectId}`;

interface RatingSectionProps {
  projectId: string;
  averageRating: number;
  totalRatings: number;
}

export default function RatingSection({
  projectId,
  averageRating,
  totalRatings,
}: RatingSectionProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [submitted, setSubmitted] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY(projectId));
      if (stored) {
        const value = parseInt(stored, 10);
        if (value >= 1 && value <= 5) {
          setSubmitted(value);
        }
      }
    } catch {
      // localStorage not available
    }
    setMounted(true);
  }, [projectId]);

  const displayRating = hoverRating || selectedRating;

  const handleStarClick = async (value: number) => {
    if (submitted !== null) return;

    setSelectedRating(value);
    setIsLoading(true);

    try {
      const res = await fetch(`${APP_URL}/api/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, stars: value }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(value);
        try {
          localStorage.setItem(STORAGE_KEY(projectId), String(value));
        } catch {
          // localStorage not available
        }
        Toast({ icon: "success", message: "شكراً لتقييمك!" });
      } else {
        setSelectedRating(0);
        Toast({
          icon: "error",
          message: data.message || data.error || "حدث خطأ في التقييم",
        });
      }
    } catch {
      setSelectedRating(0);
      Toast({ icon: "error", message: "حدث خطأ في التقييم" });
    } finally {
      setIsLoading(false);
    }
  };

  const ratingLabels: Record<number, string> = {
    1: "سيء",
    2: "مقبول",
    3: "جيد",
    4: "جيد جداً",
    5: "ممتاز",
  };

  return (
    <section
      id="rating"
      className="py-20 md:py-28 bg-[#f6f6f8] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        {/* Section Header */}
        <div className="text-center mb-10" dir="rtl">
          <span className="inline-block text-[#1241a1] text-sm font-semibold tracking-widest mb-3">
            آراء العملاء
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111318] mb-4">
            قيّم تجربتك معنا
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-[#1241a1]/20" />
            <div className="w-8 h-1 bg-[#1241a1] rounded-full" />
            <div className="h-px w-16 bg-[#1241a1]/20" />
          </div>
          <p className="text-[#4b5563] text-base md:text-lg">
            رأيك يهمنا! ساعدنا في التحسين من خلال تقييم تجربتك
          </p>
        </div>

        {/* Card */}
        <motion.div
          className="rounded-2xl bg-white border border-[#e2e5eb] shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}>
          {/* Blue top accent */}
          <div className="h-1 w-full bg-[#1241a1]" />

          <div className="p-8 md:p-12 text-center" dir="rtl">
            {/* Stats row */}
            {(averageRating > 0 || totalRatings > 0) && (
              <div className="flex flex-wrap justify-center items-center gap-6 mb-8 pb-8 border-b border-[#e2e5eb]">
                {averageRating > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-[#111318]">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= Math.round(averageRating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-[#e2e5eb] text-[#e2e5eb]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[#4b5563] text-xs">من 5 نجوم</span>
                    </div>
                  </div>
                )}
                {totalRatings > 0 && (
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-[#111318]">
                      {totalRatings}
                    </span>
                    <span className="text-[#4b5563] text-sm">
                      {totalRatings === 1 ? "تقييم" : "تقييمات"}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Rating interaction */}
            {submitted !== null && mounted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-4 space-y-4">
                {/* Submitted stars */}
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
                        star <= submitted
                          ? "fill-amber-400 text-amber-400"
                          : "fill-[#e2e5eb] text-[#e2e5eb]"
                      }`}
                    />
                  ))}
                </div>
                {/* Label */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1241a1]/8 text-[#1241a1] font-semibold text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#1241a1] inline-block" />
                  {ratingLabels[submitted]} — شكراً لتقييمك!
                </div>
                <p className="text-[#4b5563] text-sm">
                  نسعد بتقييمك وسنعمل على تحسين تجربتك
                </p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                {/* Interactive stars */}
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isLoading || !mounted}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-xl transition-all duration-150 hover:scale-125 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1241a1] focus-visible:ring-offset-2"
                      aria-label={`تقييم ${star} من 5`}>
                      <Star
                        className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-150 ${
                          star <= (displayRating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-[#e2e5eb] text-[#e2e5eb]"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Hover label */}
                <div className="h-6 flex items-center justify-center">
                  {displayRating > 0 ? (
                    <motion.span
                      key={displayRating}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1241a1]/8 text-[#1241a1] font-semibold text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1241a1] inline-block" />
                      {ratingLabels[displayRating]}
                    </motion.span>
                  ) : (
                    <span className="text-[#4b5563] text-sm">
                      {mounted && !isLoading
                        ? "انقر على النجم المناسب للتقييم"
                        : ""}
                      {isLoading && "جاري الإرسال..."}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
