import { PlayCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const router = useNavigate();

  return (
    <>
      <div className="w-screen min-h-screen bg-black">
        <div className="py-6 px-6 md:px-12 md:py-6 text-center md:text-left">
          {/* Hero Section */}
          <div className="pt-24 rounded-xl group my-7 mx-4 md:mx-16">
            <div className="relative">
                              <motion.h2 
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{ delay: 0.2, duration: 0.4, ease: "easeIn" }}
                  className="text-5xl md:text-6xl max-w-md tracking-tighter font-primary font-bold text-white text-center md:text-left"
                >
                xRate
              </motion.h2>
              
                              <motion.p 
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: "easeIn" }}
                  className="text-lg md:text-xl text-white/50 mt-2 tracking-tighter font-primary text-center md:text-left"
                >
                Piyush submission for full stack assignment
              </motion.p>
              
                              <motion.div 
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: "easeIn" }}
                  className="flex gap-4 font-primary mt-8 justify-center md:justify-start"
                >
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
              </motion.div>
            </div>
          </div>

          <div className="mt-4 my-2 mx-4 md:mx-16">
                          <motion.h3 
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ delay: 0.8, duration: 0.4, ease: "easeIn" }}
                className="text-3xl tracking-tighter md:text-4xl font-primary font-bold text-white mb-2 text-center md:text-left"
              >
              Store Rating Platform
            </motion.h3>
            
                          <motion.p 
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ delay: 1.0, duration: 0.4, ease: "easeIn" }}
                className="text-lg text-white/70 max-w-2xl leading-relaxed font-primary text-center md:text-left"
              >
              A store rating platform that allows users to rate and review stores.
            </motion.p>
          </div>

                      <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ delay: 1.2, duration: 0.4, ease: "easeIn" }}
              className="mt-4 mx-4 md:mx-16 flex justify-center md:justify-start"
            >
            <motion.button

              onClick={() => window.open("https://github.com/Piyushxz/Roxiler_assignment", "_blank")}
              className="inline-flex gap-2 items-center justify-center bg-gray-800 hover:bg-gray-700 text-white text-sm transition-all duration-300 h-11 rounded-lg px-6 md:px-8 shadow-md border border-gray-600 font-primary"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </motion.button>
          </motion.div>
        </div>
      </div>


    </>
  );
};