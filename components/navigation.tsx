"use client";

import { useAuth } from "@/lib/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, HelpCircle, LogOut, Settings, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const router = useRouter();
  const { user, logout } = useAuth(); // ← use context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Brand with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/Screenshot 2025-08-26 014117.png"
              alt="Risk Lens Logo"
              width={150}
              height={40}
              className="w-auto h-8 md:h-10 object-contain"
              priority
            />
          </Link>
        </motion.div>

        {/* Menu */}
        <div className="flex items-center gap-3 relative">
          {!user ? (
            <>
              {["AI Assistant", "About", "Login / Sign Up"].map((item, i) => {
                const hrefs = ["/ai-assistant", "/about", "/auth"];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, rotateX: 5, rotateY: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Link href={hrefs[i]} className="rounded-lg px-3 py-2 text-sm hover:bg-muted block">
                      {item}
                    </Link>
                  </motion.div>
                );
              })}
            </>
          ) : (
            <>
              {[
                { label: "AI Assistant", href: "/ai-assistant" },
                { label: "About", href: "/about" },
              ].map((link, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, rotateX: 5, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Link href={link.href} className="rounded-lg px-3 py-2 text-sm hover:bg-muted block">
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.div
                  className="rounded-full p-2 hover:bg-muted cursor-pointer flex items-center justify-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9, rotate: -10 }}
                >
                  <UserIcon className="w-6 h-6 text-blue-500" />
                </motion.div>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95, rotateX: -15 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="flex flex-col">
                        <motion.button
                          onClick={() => router.push("/profile/user")}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <Settings className="w-4 h-4" /> Profile
                        </motion.button>

                        <motion.button
                          onClick={() => router.push("/profile/previous-risk-scores")}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <FileText className="w-4 h-4" /> Previous Scores
                        </motion.button>

                        <motion.button
                          onClick={() => router.push("/profile/help")}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <HelpCircle className="w-4 h-4" /> Help
                        </motion.button>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        <motion.button
                          onClick={logout}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-left text-red-600"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Theme Toggle */}
          <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
            <ThemeToggle />
          </motion.div>
        </div>
      </nav>
    </header>
  );
}