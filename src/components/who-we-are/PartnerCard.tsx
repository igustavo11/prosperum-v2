"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type PartnerCardProps = {
  name: string;
  role: string;
  bio: string;
  photoSrc: string;
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
  viewProfileLabel: string;
  delay?: number;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_STR = "cubic-bezier(0.22, 1, 0.36, 1)";
const T = "0.58s";
const WIDTH_TRANSITION = `flex-basis ${T} ${EASE_STR}, min-width ${T} ${EASE_STR}, max-width ${T} ${EASE_STR}`;
const PHOTO_TRANSITION = `width ${T} ${EASE_STR}`;

export default function PartnerCard({
  name,
  role,
  bio,
  photoSrc,
  isOpen,
  onToggle,
  isMobile,
  viewProfileLabel,
  delay = 0,
}: PartnerCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-[10px] bg-[#101010] cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={
        isMobile
          ? { width: "100%", display: "flex", flexDirection: "column" }
          : {
              flexBasis: isOpen ? "calc(50% - 6px)" : "calc(25% - 9px)",
              flexGrow: 1,
              flexShrink: 1,
              minWidth: isOpen ? "calc(50% - 6px)" : 110,
              maxWidth: isOpen ? "calc(50% - 6px)" : "calc(25% - 9px)",
              height: 420,
              transition: WIDTH_TRANSITION,
              display: "flex",
              flexDirection: "row",
            }
      }
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={onToggle}
    >
      {/* ── Photo ── */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={
          isMobile
            ? { width: "100%", height: 360 }
            : {
                width: isOpen ? "46%" : "100%",
                height: "100%",
                transition: PHOTO_TRANSITION,
              }
        }
      >
        <Image
          src={photoSrc}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        {/* Hover name overlay — desktop only, when closed */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-14 px-3"
            style={{ background: "rgba(9,9,9,0.55)" }}
            animate={{ opacity: isHovered && !isOpen ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <span className="text-white text-[18px] font-medium text-center leading-tight">
              {name}
            </span>
          </motion.div>
        )}

        {/* Bottom bar: View Profile + arrow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 pb-4 pt-12"
          style={{
            background:
              "linear-gradient(to top, rgba(9,9,9,0.9) 0%, transparent 100%)",
          }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <span className="text-white/80 text-[12px] font-medium tracking-wider uppercase">
            {viewProfileLabel}
          </span>
        </motion.div>
      </div>

      {/* ── Bio panel — desktop ── */}
      {!isMobile && (
        <motion.div
          className="flex-1 min-w-0 bg-white px-7 py-9 flex flex-col justify-center gap-3"
          animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 18 }}
          transition={{
            opacity: {
              duration: 0.35,
              ease: "easeOut",
              delay: isOpen ? 0.22 : 0,
            },
            x: {
              duration: 0.42,
              ease: EASE,
              delay: isOpen ? 0.2 : 0,
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <span className="text-[26px] font-medium text-[#212121] leading-none">
            {name}
          </span>
          <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#be9339]">
            {role}
          </span>
          <div
            className="w-8 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #be9339, #e4d488)" }}
          />
          <p className="text-[13px] leading-[1.75] text-[#555]">{bio}</p>
        </motion.div>
      )}

      {/* ── Bio panel — mobile (pure CSS, no framer conflict) ── */}
      {isMobile && (
        <div
          style={{
            maxHeight: isOpen ? 500 : 0,
            opacity: isOpen ? 1 : 0,
            overflow: "hidden",
            transition: `max-height 0.55s ${EASE_STR}, opacity ${isOpen ? `0.4s 0.1s` : "0.22s 0s"} ease-out`,
          }}
        >
          <div className="bg-white px-5 py-6 flex flex-col gap-3">
            <span className="text-[20px] font-medium text-[#212121] leading-none">
              {name}
            </span>
            <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#be9339]">
              {role}
            </span>
            <div
              className="w-8 h-0.5 rounded-full"
              style={{
                background: "linear-gradient(90deg, #be9339, #e4d488)",
              }}
            />
            <p className="text-[13px] leading-[1.75] text-[#555]">{bio}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
