import { PlayCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const router = useNavigate();

  return (
    <>
      <div className="w-screen h-full bg-black flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4, ease: "easeInOut" }}
          className="pt-24 rounded-xl group text-center"
        >
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto tracking-tighter font-primary font-bold text-white">
              xRate
            </h2>

            <p className="text-lg md:text-xl max-w-xs mx-auto text-white/50 px-4 mt-2 tracking-tighter font-primary">
              Piyush submission for full stack assignment
            </p>

            <div className="flex gap-4 justify-center font-primary mt-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router("/login")}
                className="inline-flex gap-2 items-center justify-center bg-white text-black text-sm hover:opacity-80 transition-all duration-300 h-11 rounded-lg px-6 md:px-8 shadow-md"
              >
                <Send className="size-4" />
                Login
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router("/")}
                className="inline-flex gap-2 items-center justify-center border border-white/25 text-white text-sm hover:opacity-80 transition-all duration-300 h-11 rounded-lg px-6 md:px-8 shadow-md"
              >
                <PlayCircle className="size-4" />
                piyushsavale2@gmail.com
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>


    </>
  );
};