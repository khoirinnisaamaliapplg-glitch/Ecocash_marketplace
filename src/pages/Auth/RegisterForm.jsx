import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function RegisterForm({ toggleMode }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "REGULAR_USER",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Keamanan Frontend: Validasi Kompleksitas Password
    if (formData.password.length < 8) {
      setErrorMsg("Kata sandi minimal 8 karakter.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (!formData.role) {
      setErrorMsg("Tipe akun (Peran) wajib dipilih.");
      return;
    }

    setIsLoading(true);

    try {
      // MOCKUP FETCH API: POST /api/v1/auth/register
      // Secara default pendaftar publik akan mendapatkan role REGULAR_USER

      // Membentuk payload; pendaftaran publik default sebagai REGULAR_USER
      const payload = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role, // Default: REGULAR_USER
      };

      // Asumsi endpoint registrasi backend adalah /api/v1/auth/register
      await axiosInstance.post("/api/v1/auth/register", payload);

      setSuccessMsg(
        "Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.",
      );

      // Mengubah mode ke formulir Login setelah jeda singkat
      setTimeout(() => {
        toggleMode();
      }, 2000);
    } catch (err) {
      console.error("Register Error Details:", err.response || err);

      // Menangkap respon Error Backend yang lebih dalam (seperti Laravel Validation Errors)
      if (err.response) {
        const data = err.response.data;
        // Jika backend mengirim array error spesifik
        if (data.errors && typeof data.errors === "object") {
          const firstError = Object.values(data.errors)[0];
          setErrorMsg(Array.isArray(firstError) ? firstError[0] : firstError);
        } else {
          setErrorMsg(
            data.message ||
              data.error ||
              "Pendaftaran gagal. Periksa kembali data Anda.",
          );
        }
      } else {
        setErrorMsg("Tidak dapat terhubung ke server.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-black font-heading text-slate-900 mb-2">
        Buat Akun Baru
      </h2>
      <p className="text-sm font-medium text-slate-500 mb-8">
        Bergabunglah untuk menciptakan dampak lingkungan nyata hari ini.
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

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-bold px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
          <svg
            className="w-5 h-5 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="flex-1">{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Tipe Akun (Peran)
          </label>
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3.5 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all appearance-none cursor-pointer"
              required
            >
              <option value="REGULAR_USER">
                Nasabah / Pembeli (Masyarakat Umum)
              </option>
              <option value="STORE_ADMIN">
                Mitra Toko (Penjual Marketplace)
              </option>
              <option value="PARTNER">Mitra Pengepul (Kolektor Sampah)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Masukan nama lengkap anda..."
            className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all"
            required
          />
        </div>
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
            className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all"
            required
          />
        </div>

        {/* Grid 2 Kolom untuk Password agar layout tetap padat & rapi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Kata Sandi
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 8 karakter"
              className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-widest">
              Konfirmasi Sandi
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ulangi sandi"
              className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:border-eco-cyan focus:bg-white transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || successMsg != ""}
          className={`w-full py-4 rounded-xl text-sm font-black flex items-center justify-center transition-all mt-6 ${isLoading ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-eco-cyan hover:-translate-y-1 shadow-xl hover:shadow-eco-cyan/30 cursor-pointer"}`}
        >
          {isLoading ? "Memproses..." : "Daftar Akun Baru"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm font-bold text-slate-500">
          Sudah memiliki akun?{" "}
          <button
            onClick={toggleMode}
            className="text-eco-cyan hover:text-slate-900 transition-colors cursor-pointer"
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
}
