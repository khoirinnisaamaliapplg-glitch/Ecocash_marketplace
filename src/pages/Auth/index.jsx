import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
  const navigate = useNavigate();
  // State untuk beralih antara form Login dan Register
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-body text-slate-700 selection:bg-eco-cyan selection:text-white">
      <div className="w-full max-w-6xl flex bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px]">
        {/* KOLOM KIRI: Ilustrasi & Branding (EcoCash Theme) */}
        <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-16 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-eco-cyan rounded-2xl flex items-center justify-center text-white shadow-lg shadow-eco-cyan/30 mb-8">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-black font-heading leading-tight mb-4 tracking-tight">
              Sirkulasi <br />
              Ekonomi
              <br />
              <span className="text-eco-cyan">Masa Depan.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg max-w-md">
              Masuk ke ekosistem EcoCash untuk mulai menabung jejak karbon,
              belanja produk daur ulang, atau mendanai proyek hijau.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-4 border-t border-slate-800 pt-8 mt-12">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900"></div>
              <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-slate-900"></div>
              <div className="w-10 h-10 rounded-full bg-slate-500 border-2 border-slate-900"></div>
            </div>
            <p className="text-sm font-bold text-slate-400">
              Bergabung dengan <span className="text-white">45,000+</span>{" "}
              Pengguna
            </p>
          </div>
          {/* Aksen Dekoratif Neo-Brutalism */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-eco-cyan/20 blur-3xl rounded-full"></div>
        </div>

        {/* KOLOM KANAN: Area Formulir Dinamis */}
        <div className="w-full lg:w-1/2 p-10 sm:p-16 flex flex-col justify-center relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-8 right-8 text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
          >
            Kembali ke Beranda
          </button>

          <div className="max-w-md w-full mx-auto">
            {isLoginMode ? (
              <LoginForm toggleMode={() => setIsLoginMode(false)} />
            ) : (
              <RegisterForm toggleMode={() => setIsLoginMode(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
