import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import DetailProduct from "./pages/DetailProduct";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route untuk halaman utama */}
          <Route path="/" element={<Marketplace />} />

          {/* Route Detail Product */}
          <Route path="/product/:id" element={<DetailProduct />} />

          {/* Route Auth */}
          <Route path="/login" element={<Auth defaultMode="login" />} />
          <Route path="/register" element={<Auth defaultMode="register" />} />

          {/* Fallback Error Routing (Opsional jika rute tidak ditemukan) */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-body">
                <h2 className="text-3xl font-black font-heading text-slate-900 mb-2">
                  404 - Halaman Tidak Ditemukan
                </h2>
                <p className="text-slate-500 mb-6 font-medium">
                  Tautan yang Anda akses tidak terdaftar dalam rute EcoCash.
                </p>
                <a
                  href="/"
                  className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:bg-eco-cyan transition-colors"
                >
                  Kembali ke Beranda
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
