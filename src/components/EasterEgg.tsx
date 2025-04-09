import { motion, AnimatePresence } from "framer-motion";
import MiniGame from "./MiniGame";

interface EasterEggProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function EasterEgg({ open, setOpen }: EasterEggProps) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative w-full h-full max-w-[900px] max-h-[90vh] bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center">
              <div className="w-full h-full overflow-auto">
                <MiniGame />
              </div>
              <button
                className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-lg z-10"
                onClick={() => setOpen(false)}
              >
                ✕ Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
