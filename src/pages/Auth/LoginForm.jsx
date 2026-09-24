import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function LoginForm({ toggleMode }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(""); // Hapus error saat user mulai mengetik
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman (Secure SPA behavior)

    // Validasi Frontend Dasar
    if (!formData.email || !formData.password) {
      setErrorMsg("Email dan Kata Sandi wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      // MOCKUP FETCH API: Integrasi ke endpoint backend Tim API
      /*
      const response = await fetch("https://api.ecocash.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal otentikasi.");
      
      // Simpan JWT Token dan Role secara aman
      localStorage.setItem("ecocash_token", data.token);
      localStorage.setItem("ecocash_role", data.user.role); // ex: REGULAR_USER
      */

      // Memanggil Endpoint POST /api/v1/auth/login
      const response = await axiosInstance.post("/api/v1/auth/login", formData);

      // Defensive Parsing: Menyesuaikan jika backend mengirim { data: { token } } ATAU langsung { token }
      const responseData = response.data.data || response.data;
      const token = responseData.token || responseData.access_token;
      const user = responseData.user || responseData;

      if (!token) {
        throw new Error(
          "Token tidak ditemukan dalam respons backend. Periksa struktur API.",
        );
      }

      // Penyimpanan kredensial di Local Storage
      localStorage.setItem("ecocash_token", token);
      localStorage.setItem("ecocash_role", user.role || "REGULAR_USER"); // Default ke REGULAR_USER jika role tidak tersedia
      localStorage.setItem("ecocash_user", JSON.stringify(user));

      // Routing Dinamis Berdasarkan Role
      if (user.role === "STORE_ADMIN") {
        window.location.href = "/seller/dashboard";
      } else if (user.role === "SUPER_ADMIN" || user.role === "AREA_ADMIN") {
        window.location.href = "/admin/dashboard/summary";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Login Error Details:", err.response || err);

      // Ekstraksi pesan error spesifik dari backend (menghindari pesan generic "Error Jaringan")
      if (err.response) {
        const backendMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          "Kredensial tidak valid.";
        setErrorMsg(backendMessage);
      } else {
        setErrorMsg(
          err.message ||
            "Tidak dapat terhubung ke server. Periksa koneksi jaringan.",
        );
      }
    } finally {
      setIsLoading(false); // Mengaktifkan kembali tombol
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-black font-heading text-slate-900 mb-2">
        Selamat Datang Kembali!
      </h2>
      <p className="text-sm font-medium text-slate-500 mb-8">
        Masuk untuk melanjutkan aksi peduli lingkungan Anda.
      </p>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold px-4 py-3 rounded-xl mb-6 flex items-center gap-3">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Alamat Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Kata Sandi
            </label>
            <button
              type="button"
              className="text-xs font-bold text-eco-cyan hover:text-slate-900 transition-colors"
            >
              Lupa Kata Sandi?
            </button>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-sm font-black flex items-center justify-center transition-all mt-4 ${isLoading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-eco-cyan hover:-translate-y-1 shadow-xl hover:shadow-eco-cyan/30 cursor-pointer"}`}
        >
          {isLoading ? "Mengautentikasi..." : "Masuk Sekarang"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm font-bold text-slate-500">
          Belum memiliki akun?{" "}
          <button
            onClick={toggleMode}
            className="text-eco-cyan hover:text-slate-900 transition-colors cursor-pointer"
          >
            Daftar Akun Baru
          </button>
        </p>
      </div>
    </div>
  );
}
