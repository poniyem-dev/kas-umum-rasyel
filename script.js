let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

function simpanKas() {
  if (!isLoggedIn) {
    alert("Silakan login terlebih dahulu");
    window.location.href = "login.html";
    return;
  }

  const tanggal = document.getElementById("tanggal").value;
  const jenisKas = document.getElementById("jenisKas").value;
  const nominal = parseFloat(document.getElementById("nominal").value);
  const keterangan = document.getElementById("keterangan").value;

  if (!tanggal || !jenisKas || !nominal) {
    alert("Isi semua data kas.");
    return;
  }

  let kasList = JSON.parse(localStorage.getItem("kasList")) || [];
  let saldo = kasList.length ? kasList[kasList.length - 1].saldo : 0;

  if (jenisKas === "masuk") {
    saldo += nominal;
  } else if (jenisKas === "keluar") {
    saldo -= nominal;
  }

  kasList.push({ tanggal, jenisKas, nominal, keterangan, saldo });
  localStorage.setItem("kasList", JSON.stringify(kasList));

  tampilkanKas();
  hapusForm();
}

function hapusForm() {
  document.getElementById("formTambahKas").reset();
}

function tampilkanKas() {
  const kasList = JSON.parse(localStorage.getItem("kasList")) || [];
  const tableBody = document.getElementById("kasTableBody");

  tableBody.innerHTML = "";
  if (!isLoggedIn) {
    return; // Clear table if not logged in
  }

  kasList.forEach((kas, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${kas.tanggal}</td>
      <td>${kas.jenisKas}</td>
      <td>${kas.nominal}</td>
      <td>${kas.keterangan}</td>
      <td>${kas.saldo}</td>
      <td><button onclick="hapusKas(${index})">Hapus</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function hapusKas(index) {
  const kasList = JSON.parse(localStorage.getItem("kasList")) || [];
  kasList.splice(index, 1);
  localStorage.setItem("kasList", JSON.stringify(kasList));
  tampilkanKas();
}

window.onload = function() {
  tampilkanKas();
};