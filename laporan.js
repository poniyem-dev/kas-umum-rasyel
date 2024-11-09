// Fungsi untuk menampilkan laporan berdasarkan tanggal yang dipilih
function tampilkanLaporan() {
  const filterTanggal = document.getElementById("filterTanggal").value;
  const kasList = JSON.parse(localStorage.getItem("kasList")) || [];
  const laporanTableBody = document.getElementById("laporanTableBody");

  laporanTableBody.innerHTML = ""; // Clear tabel sebelumnya

  if (filterTanggal) {
    // Menampilkan kas yang difilter berdasarkan tanggal
    const filteredKas = kasList.filter(kas => kas.tanggal === filterTanggal);
    if (filteredKas.length === 0) {
      laporanTableBody.innerHTML = "<tr><td colspan='5'>Tidak ada laporan untuk tanggal ini.</td></tr>";
    } else {
      filteredKas.forEach(kas => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${kas.tanggal}</td>
          <td>${kas.jenisKas}</td>
          <td>${formatRupiah(kas.nominal)}</td>
          <td>${kas.keterangan}</td>
          <td>${formatRupiah(kas.saldo)}</td>
        `;
        laporanTableBody.appendChild(row);
      });
    }
  }
}

// Fungsi untuk menampilkan semua laporan tanpa filter tanggal
function tampilkanLaporanAll() {
  const kasList = JSON.parse(localStorage.getItem("kasList")) || [];
  const laporanTableBody = document.getElementById("laporanTableBody");

  laporanTableBody.innerHTML = ""; // Clear tabel sebelumnya

  if (kasList.length === 0) {
    laporanTableBody.innerHTML = "<tr><td colspan='5'>Tidak ada laporan tersedia.</td></tr>";
  } else {
    kasList.forEach(kas => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${kas.tanggal}</td>
        <td>${kas.jenisKas}</td>
        <td>${formatRupiah(kas.nominal)}</td>
        <td>${kas.keterangan}</td>
        <td>${formatRupiah(kas.saldo)}</td>
      `;
      laporanTableBody.appendChild(row);
    });
  }
}

// Fungsi untuk menghapus laporan yang ditampilkan di tabel
function clearLaporan() {
  const laporanTableBody = document.getElementById("laporanTableBody");
  laporanTableBody.innerHTML = ""; // Clear seluruh isi tabel
}

// Fungsi untuk format nominal ke format rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
}

// Fungsi konfirmasi cetak laporan
function konfirmasiCetak() {
  const konfirmasi = confirm("Apakah Anda ingin mencetak laporan?");
  if (konfirmasi) {
    cetakLaporan();
  }
}

// Fungsi untuk mencetak laporan
function cetakLaporan() {
  const akunData = JSON.parse(localStorage.getItem("akunData")) || { nama: "Pengguna" };
  const tanggalCetak = new Date().toLocaleDateString("id-ID");
  const detailCetak = `Tanggal Cetak: ${tanggalCetak} | Nama Akun: ${akunData.nama}`;
  
  const printWindow = window.open("", "", "width=800,height=600");
  
  printWindow.document.write("<html><head><title>Laporan Kas</title>");
  printWindow.document.write("<style>");
  printWindow.document.write("table { width: 100%; border-collapse: collapse; }");
  printWindow.document.write("th, td { padding: 8px; text-align: left; border: 1px solid black; }");
  printWindow.document.write("h2 { text-align: center; }");
  printWindow.document.write("p { font-size: 14px; text-align: center; }");
  printWindow.document.write("</style>");
  printWindow.document.write("</head><body>");
  
  printWindow.document.write("<h2>Laporan Kas</h2>");
  printWindow.document.write(`<p>${detailCetak}</p>`);
  
  const tableContent = document.getElementById("laporanTable").outerHTML;
  printWindow.document.write(tableContent);
  
  printWindow.document.write("</body></html>");
  
  printWindow.document.close();
  printWindow.print();
}

// Event listener untuk tombol View (filter berdasarkan tanggal)
document.getElementById("viewButton").addEventListener("click", tampilkanLaporan);

// Event listener untuk tombol View All (menampilkan semua laporan)
document.getElementById("viewAllButton").addEventListener("click", tampilkanLaporanAll);

// Event listener untuk tombol Clear Laporan
document.getElementById("clearLaporanButton").addEventListener("click", clearLaporan);

// Event listener untuk tombol Cetak
document.getElementById("printButton").addEventListener("click", konfirmasiCetak);