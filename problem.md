**Ringkasan Masalah**

- **Jenis**: Error runtime React dan JSX parse errors muncul saat membuka halaman Marketplace / Detail produk.
- **Dampak**: Halaman gagal dirender atau muncul error di console seperti:
  - "Objects are not valid as a React child (found: object with keys {...})"
  - "Cannot read properties of undefined (reading '0')"
  - JSX parse error akibat atribut SVG yang salah kutip.

**File Terkait**

- [src/constants/dummyData.js](src/constants/dummyData.js): struktur data produk (B2C / B2B) diubah — `supplier` sekarang objek, `reviews` tersedia sebagai array dan ada `reviewsCount` numeric.
- [src/pages/Marketplace.jsx](src/pages/Marketplace.jsx): kartu produk (list) menampilkan dan memfilter berdasarkan `product.supplier` dan menampilkan `product.reviews` secara langsung.
- [src/pages/DetailProduct.jsx](src/pages/DetailProduct.jsx): inisialisasi state menggunakan `product.variants[0]` / `product.sizes[0]` tanpa pengecekan, dan men-render `product.supplier` di tab profil mitra.

**Diagnosa & Penyebab Detail**

- **1) "Objects are not valid as a React child" (B2C products)**:
  - Penyebab: Kode merender objek plain ke JSX. Contoh problematik di `Marketplace.jsx` sebelum perbaikan:

```jsx
// SALAH: product.reviews adalah array/objek, bukan string/number
({product.reviews})
// Atau langsung merender supplier yang sudah menjadi objek:
{prod.supplier}
```

    - Kenapa error: React hanya menerima primitif (string/number), elemen React, atau array dari elemen yang valid. Objek plain memicu error runtime.

- **2) "Cannot read properties of undefined (reading '0')" (B2B produk)**:
  - Penyebab: Inisialisasi state membaca `product.variants[0]` atau `product.sizes[0]` saat produk tidak memiliki properti tersebut (undefined). Contoh lokasi: `DetailProduct.jsx` pada deklarasi `useState`.
  - Hasil: saat `product` tidak punya `variants`/`sizes`, akses `[0]` menyebabkan TypeError.

- **3) JSX parse error pada SVG**:
  - Penyebab: Tag `<svg>` memiliki atribut tersambung karena salah penempatan tanda kutip, mis. `viewBox="0 0 640 640 fill="currentColor" ...`.
  - Hasil: Syntax/parse error saat transpile JSX, mencegah bundler melanjutkan.

**Perbaikan yang Telah Diterapkan (ringkasan)**

- `src/pages/Marketplace.jsx`:
  - Ganti render jumlah ulasan yang aman: `({product.reviewsCount || product.reviews?.length || 0} Ulasan)` — mencegah render objek.
  - Pada filter pencarian, jangan panggil `toLowerCase()` langsung pada `product.supplier` karena bisa berupa objek; gunakan:

```js
const supplierText =
  typeof product.supplier === "string"
    ? product.supplier
    : product.supplier?.name || "";
supplierText.toLowerCase().includes(query);
```

- `src/pages/DetailProduct.jsx`:
  - Inisialisasi state aman untuk varian/ukuran:

```js
const [selectedVariant, setSelectedVariant] = useState(
  product?.variants?.[0] || null,
);
const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
```

    - Saat merender supplier pada card/rekomendasi, gunakan `prod.supplier?.name || prod.supplier` supaya bila `supplier` adalah objek, yang dirender adalah string `name`.

- `src/pages/Marketplace.jsx` / `src/pages/DetailProduct.jsx`:
  - Memperbaiki tag SVG yang salah kutip menjadi atribut terpisah (mis. `viewBox="0 0 640 640" fill="currentColor" ...`).

**Langkah Verifikasi (jalankan secara lokal)**

1. Jalankan dev server di root proyek:

```bash
npm run dev
```

2. Buka browser ke halaman Marketplace: pilih produk B2C dan B2B.
3. Periksa console devtools: tidak ada error "Objects are not valid as a React child" atau "Cannot read properties of undefined (reading '0')".
4. Cek fitur: pencarian supplier, tab `profil mitra`, tab `ulasan` — pastikan tanpa error.

**Rekomendasi Pencegahan & Best Practices**

- Normalisasi schema data: pilih satu bentuk `supplier` (disarankan objek `{ name, avatar, ... }`) dan gunakan `reviews` selalu sebagai array plus `reviewsCount` numeric jika perlu. Simpan schema di `src/constants/dummyData.js` atau dokumentasi singkat.
- Validasi sisi frontend: gunakan `prop-types` atau migrasi ke TypeScript untuk memaksa tipe/struktur komponen.
- Defensive coding: selalu gunakan optional chaining dan fallback (`?.`, `|| ''`, `Array.isArray`) sebelum mengakses properti atau merender.
- Linting & tests: tambahkan ESLint rule untuk penemuan akses properti berisiko dan unit tests untuk halaman kritis.
- Sanitasi SVG: sebelum memasukkan SVG inline ke JSX, pastikan atribut valid untuk JSX (camelCase untuk atribut khusus bila perlu) dan kutipan benar; pertimbangkan `svgr` untuk impor SVG sebagai React components.

**Saran Langkah Berikutnya (opsional)**

- Scan otomatis seluruh kode untuk pola `someObject` yang dirender langsung (regex: `/\{\s*[^}]+\s*\}/` bukan sempurna — lebih baik manual/semiautomatis). Saya bisa bantu scan dan perbaiki kasus serupa.
- Tambahkan `PropTypes` atau konversi komponen utama ke TypeScript untuk deteksi tipe di waktu kompilasi.

Jika mau, saya bisa langsung: 1) memindai repo untuk pola render objek dan akses `[0]` tanpa optional chaining, atau 2) menjalankan dev server sekarang dan melaporkan hasil console. Pilih salah satu untuk saya lanjutkan.

File ini dibuat untuk memberi konteks lengkap pada assisant/developer yang menindaklanjuti perbaikan kode.
