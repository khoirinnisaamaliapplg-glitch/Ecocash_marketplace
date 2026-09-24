import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { B2C_PRODUCTS, B2B_PRODUCTS } from "../constants/dummyData";

export default function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ekstraksi Produk
  const allProducts = [...B2C_PRODUCTS, ...B2B_PRODUCTS];
  const product = allProducts.find((p) => p.id === id);

  //   console.log("DetailProduct Rendered:", product);

  // State Management
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Sinkronisasi data saat berpindah halaman produk
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setQuantity(1);
    setActiveTab("deskripsi");
    if (product) {
      setSelectedVariant(
        product.variants?.length > 0 ? product.variants[0] : "",
      );
      setSelectedSize(product.sizes?.length > 0 ? product.sizes[0] : "");
    }
  }, [id, product]);

  // Error Boundary
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-black font-heading text-slate-900 mb-4">
          Produk Tidak Ditemukan
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-eco-cyan text-white rounded-full font-black shadow-xl hover:scale-105 transition-transform cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Logic Handlers

  //   Image Gallery Handlers (prev/next)
  const handlePrevImage = () =>
    setActiveImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  const handleNextImage = () =>
    setActiveImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );

  // Input quantity Handlers
  const handleQuantityChange = (e) => {
    // Sanitasi: Hanya izinkan angka murni (buang huruf/simbol otomatis)
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (value === "") {
      setQuantity(""); // Izinkan kosong sementara agar pengguna bisa menghapus angka
      return;
    }

    const numValue = parseInt(value, 10);

    // Validasi pencegahan input melebihi batas stok maksimal
    if (numValue > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(numValue);
    }
  };

  // Jika input ditinggalkan dalam keadaan kosong atau 0, paksa kembali ke angka 1
  const handleQuantityBlur = () => {
    if (quantity === "" || parseInt(quantity) < 1) {
      setQuantity(1);
    }
  };

  //   quantity Increment/Decrement Handlers
  const handleDecrease = () => {
    const current = parseInt(quantity) || 1;
    if (current > 1) setQuantity(current - 1);
  };

  const handleIncrease = () => {
    const current = parseInt(quantity) || 0;
    if (current < product.stock) setQuantity(current + 1);
  };

  // Share Handler
  const handleShare = () => {
    // Simulasi fitur share (Bisa dikembangkan menggunakan Web Share API)
    alert(`Membagikan tautan produk: ${product.name}`);
  };

  // Format Rupiah
  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  // Kalkulasi Subtotal
  // Jangan lupa kalkulasi subtotal juga harus diberi pengaman (fallback ke 0 jika input kosong)
  const subtotal = product.price * (parseInt(quantity) || 0);

  // Filter Produk Lain dari Toko Ini & Rekomendasi Umum
  const storeProducts = allProducts.filter(
    (p) => p.supplier?.name === product.supplier?.name && p.id !== product.id,
  );

  // Filter Produk Rekomendasi Berdasarkan Kategori yang Sama
  const recommendedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  console.log("Store Products:", storeProducts);
  console.log("Recommended Products:", recommendedProducts);

  return (
    <div className="min-h-screen bg-white font-body text-slate-700 selection:bg-eco-cyan selection:text-white pb-20">
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-eco-cyan hover:text-white hover:border-eco-cyan transition-all cursor-pointer shadow-sm"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div className="hidden sm:flex items-center gap-3 text-sm font-bold text-slate-400">
              <span
                onClick={() => navigate("/")}
                className="hover:text-eco-cyan cursor-pointer transition-colors"
              >
                Beranda
              </span>
              <span>/</span>
              <span className="uppercase">{product.category}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-8 xl:px-12 pt-8">
        {/* ================= AREA ATAS: GAMBAR & DETAIL ================= */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16">
          {/* KIRI: GALERI GAMBAR */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4 sticky top-28 h-fit">
            <div className="relative w-full aspect-square bg-slate-50 rounded-[3rem] flex items-center justify-center overflow-hidden border-2 border-slate-100 group">
              <img
                src={product.images?.[activeImage]}
                className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                alt={product.name}
                onError={(e) => (e.target.style.display = "none")}
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-slate-700 hover:bg-eco-cyan hover:text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all transform hover:scale-110"
              >
                <svg
                  className="w-7 h-7 pr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-slate-700 hover:bg-eco-cyan hover:text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all transform hover:scale-110"
              >
                <svg
                  className="w-7 h-7 pl-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-4 transition-all cursor-pointer ${activeImage === idx ? "border-eco-cyan shadow-lg scale-105" : "border-slate-100 hover:border-slate-300"}`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover bg-slate-50 p-2"
                    alt={`Thumb ${idx}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* KANAN: DETAIL & TRANSAKSI */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Top Bar: Badges, Share, Wishlist */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {product.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-wider ${badge.color}`}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  title="Bagikan Produk"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 hover:bg-eco-cyan hover:text-white hover:border-eco-cyan transition-all cursor-pointer text-slate-400"
                >
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  title="Tambah ke Wishlist"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 border border-slate-100 hover:bg-rose-50 hover:border-rose-100 transition-all cursor-pointer group"
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : "fill-transparent text-slate-400 group-hover:text-rose-500"}`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Judul & Rating */}
            <h1 className="text-4xl md:text-5xl font-black font-heading text-slate-900 leading-[1.1] mb-5">
              {product.name}
            </h1>

            <div className="flex items-center gap-5 mb-8">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-base font-black text-slate-800">
                  {product.rating}{" "}
                  <span className="text-slate-400 font-semibold underline decoration-dashed underline-offset-4 cursor-pointer hover:text-eco-cyan">
                    ({product.reviewsCount} Ulasan)
                  </span>
                </span>
              </div>
              <span className="w-2 h-2 bg-slate-200 rounded-full"></span>
              <span className="text-base font-bold text-slate-500">
                {product.sold} Terjual
              </span>
            </div>

            {/* Harga */}
            <div className="mb-10 pb-10 border-b-2 border-slate-100">
              <div className="flex items-end gap-4 mb-2">
                <p className="text-5xl font-black font-heading text-slate-900">
                  {formatRupiah(product.price)}
                </p>
                {product.unit && (
                  <p className="text-base font-bold text-slate-500 mb-1">
                    {product.unit}
                  </p>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-lg font-bold text-slate-400 line-through">
                  {formatRupiah(product.originalPrice)}
                </p>
              )}
            </div>

            {/* Varian & Ukuran (Kondisional) */}
            {(product.variants?.length > 0 || product.sizes?.length > 0) && (
              <div className="flex flex-col gap-8 mb-10 border-b-2 border-slate-100 pb-10">
                {product.variants?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">
                      Varian:{" "}
                      <span className="text-eco-cyan">{selectedVariant}</span>
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {product.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-6 py-3 rounded-2xl text-sm font-black border-2 cursor-pointer transition-all ${selectedVariant === v ? "border-eco-cyan bg-eco-cyan text-white shadow-lg shadow-eco-cyan/30" : "border-slate-200 text-slate-500 hover:border-slate-400 bg-slate-50"}`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes?.length > 0 && (
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">
                      Ukuran:{" "}
                      <span className="text-eco-cyan">{selectedSize}</span>
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-6 py-3 rounded-2xl text-sm font-black border-2 cursor-pointer transition-all ${selectedSize === s ? "border-eco-cyan bg-eco-cyan text-white shadow-lg shadow-eco-cyan/30" : "border-slate-200 text-slate-500 hover:border-slate-400 bg-slate-50"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TRANSAKSI: Kuantitas, Stok, Subtotal & Tombol */}
            <div className="bg-slate-50/70 p-6 rounded-[2rem] border border-slate-100">
              {/* Info Stok & Label Kuantitas */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  Atur Jumlah
                </span>
                <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg">
                  Sisa Stok: {product.stock}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                {/* Plus Minus Qty dengan Input Dinamis */}
                <div className="flex items-center justify-between w-full sm:w-40 h-16 bg-white rounded-2xl border-2 border-slate-200 px-2 shrink-0 shadow-sm focus-within:border-eco-cyan focus-within:ring-4 focus-within:ring-eco-cyan/10 transition-all">
                  <button
                    onClick={handleDecrease}
                    className="w-12 h-12 flex shrink-0 items-center justify-center bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M20 12H4"
                      />
                    </svg>
                  </button>

                  {/* Elemen Input Pengganti Span */}
                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                    className="w-full  text-center font-black text-xl text-slate-900 bg-transparent outline-none mx-0 focus:text-eco-cyan"
                    aria-label="Kuantitas produk"
                  />

                  <button
                    onClick={handleIncrease}
                    className=" w-12 h-12 flex shrink-0 items-center justify-center bg-slate-50 rounded-xl text-slate-600 hover:bg-eco-cyan hover:text-white transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>

                {/* Subtotal Dinamis */}
                <div className="flex-1 w-full text-right sm:text-left border-t sm:border-t-0 sm:border-l-2 border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Subtotal
                  </p>
                  <p className="text-3xl font-black font-heading text-eco-cyan">
                    {formatRupiah(subtotal)}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi Lengkap */}
              <div className="flex flex-col sm:flex-row gap-4">
                {product.action ? (
                  // B2B Action
                  <button className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-base flex items-center justify-center hover:bg-eco-cyan shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                    {product.action}
                  </button>
                ) : (
                  // B2C Actions (Keranjang & Beli Sekarang)
                  <>
                    <button className="w-full sm:w-1/2 h-16 rounded-2xl bg-white border-2 border-eco-cyan text-eco-cyan font-black text-sm flex items-center justify-center gap-2 hover:bg-eco-cyan hover:text-white shadow-lg shadow-eco-cyan/10 hover:shadow-eco-cyan/30 hover:-translate-y-1 transition-all cursor-pointer">
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Tambah Keranjang
                    </button>
                    <button className="w-full sm:w-1/2 h-16 rounded-2xl bg-slate-900 text-white font-black text-sm flex items-center justify-center shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all cursor-pointer">
                      Beli Sekarang
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= AREA TENGAH: TABS (Deskripsi, Mitra, Ulasan Lengkap) ================= */}
        <div className="mb-24">
          <div className="flex gap-8 border-b-2 border-slate-100 overflow-x-auto custom-scrollbar mb-8">
            {["deskripsi", "profil mitra", "ulasan pembeli"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-base font-black uppercase tracking-widest cursor-pointer border-b-4 transition-all ${activeTab === tab ? "border-eco-cyan text-eco-cyan" : "border-transparent text-slate-400 hover:text-slate-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-slate-50/50 rounded-[3rem] p-10 lg:p-14 border border-slate-100">
            {activeTab === "deskripsi" && (
              <div className="max-w-4xl">
                <h3 className="text-3xl font-black font-heading text-slate-900 mb-6">
                  Detail Lengkap
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium text-lg">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "profil mitra" && product.supplier && (
              <div className="flex flex-col md:flex-row items-start gap-10">
                <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-sm border-2 border-slate-100 shrink-0">
                  <img
                    src={product.supplier.avatar}
                    alt="Logo"
                    className="w-full h-full rounded-2xl object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider">
                      {product.supplier.type}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black font-heading text-slate-900 mb-3">
                    {product.supplier.name}
                  </h3>
                  <p className="text-base font-bold text-slate-500 flex items-center gap-2 mb-6">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>{" "}
                    {product.supplier.location} • Bergabung{" "}
                    {product.supplier.joinDate}
                  </p>
                  <p className="text-slate-600 font-medium text-lg max-w-3xl leading-relaxed">
                    {product.supplier.description}
                  </p>
                  <button className="mt-8 px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:border-eco-cyan hover:text-eco-cyan transition-colors cursor-pointer">
                    Kunjungi Halaman Mitra
                  </button>
                </div>
              </div>
            )}

            {activeTab === "ulasan pembeli" && product.reviews && (
              <div>
                <div className="flex flex-col md:flex-row items-center gap-10 mb-12 pb-10 border-b-2 border-slate-200/60">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black font-heading text-slate-900 mb-2">
                      Ulasan Pembeli
                    </h3>
                    <div className="flex items-end justify-center md:justify-start gap-4">
                      <p className="text-6xl font-black font-heading text-eco-cyan">
                        {product.rating}
                      </p>
                      <div className="pb-2">
                        <div className="flex text-amber-400 mb-1">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {product.reviewsCount} Total Ulasan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-eco-cyan/10 text-eco-cyan rounded-full flex items-center justify-center font-black text-xl font-heading">
                            {rev.user.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-base text-slate-900">
                              {rev.user}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {rev.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex text-amber-400 bg-amber-50 px-3 py-1.5 rounded-lg items-center gap-1">
                          <span className="text-xs font-black">
                            {rev.rating}
                          </span>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= AREA BAWAH: PRODUK TOKO & REKOMENDASI ================= */}

        {/* 1. PRODUK LAIN DARI TOKO INI (Kondisional) */}
        {storeProducts.length > 0 && (
          <section className="mb-20">
            <div className="mb-8 flex items-end justify-between border-b-2 border-slate-100 pb-4">
              <div>
                <h3 className="text-3xl font-black font-heading text-slate-900">
                  Lainnya dari Mitra Ini
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Koleksi {product.supplier?.name}
                </p>
              </div>
              <button className="text-sm font-black text-eco-cyan hover:text-slate-900 transition-colors cursor-pointer">
                Lihat Semua
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-8 snap-x">
              {storeProducts.map((prod) => (
                <Link
                  to={`/product/${prod.id}`}
                  key={prod.id}
                  className="snap-start flex-shrink-0 w-72 bg-white rounded-[2rem] border-2 border-slate-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col relative"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl bg-slate-50 mb-4 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-black text-slate-900 text-base leading-snug mb-1 line-clamp-2">
                      {prod.name}
                    </h4>
                    <div className="mt-auto pt-4">
                      <p className="text-slate-900 font-black text-xl font-heading mb-3">
                        {formatRupiah(prod.price)}
                      </p>
                      <button className="w-full py-3 rounded-xl bg-eco-cyan/10 text-eco-cyan font-black text-xs hover:bg-eco-cyan hover:text-white transition-colors cursor-pointer">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 2. REKOMENDASI UMUM KATEGORI */}
        {recommendedProducts.length > 0 && (
          <section>
            <div className="mb-8 flex items-end justify-between border-b-2 border-slate-100 pb-4">
              <div>
                <h3 className="text-3xl font-black font-heading text-slate-900">
                  Rekomendasi Serupa
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Eksplorasi Ekosistem {product.category}
                </p>
              </div>
            </div>

            <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-8 snap-x">
              {recommendedProducts.map((prod) => (
                <Link
                  to={`/product/${prod.id}`}
                  key={prod.id}
                  className="snap-start flex-shrink-0 w-72 bg-white rounded-[2rem] border-2 border-slate-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col relative"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl bg-slate-50 mb-4 overflow-hidden flex items-center justify-center relative">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-black text-slate-900 text-base leading-snug mb-1 line-clamp-2">
                      {prod.name}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                      {prod.supplier?.name || "Mitra Anonim"}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <p className="text-slate-900 font-black text-xl font-heading mb-3">
                        {formatRupiah(prod.price)}
                      </p>
                      <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition-colors cursor-pointer">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
