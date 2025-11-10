/* ----- Navigasi antar halaman ----- */
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const shopNow = document.getElementById('shopNow');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
  });
});

shopNow?.addEventListener('click', () => {
  pages.forEach(p => p.classList.remove('active'));
  document.getElementById('games').classList.add('active');
});


/* ----- KERANJANG BELANJA ----- */
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout');
const closeCartBtn = document.getElementById('closeCart');
const clearCartBtn = document.getElementById('clearCart');

// Tombol tambah ke keranjang
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    cart.push({ name, price });
    updateCart();
    alert(`${name} telah ditambahkan ke keranjang!`);
  });
});

// Update isi keranjang & tampilkan hitungan
function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${item.name} - Rp ${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
  });
  totalPrice.textContent = `Total: Rp ${total.toLocaleString()}`;
}

// Buka modal keranjang
document.querySelector('.cart-icon').addEventListener('click', () => {
  // set body class to blur background
  document.body.classList.add('modal-open');
  cartModal.classList.remove('hidden');
});

// Tutup modal keranjang (X)
closeCartBtn.addEventListener('click', () => {
  document.body.classList.remove('modal-open');
  cartModal.classList.add('hidden');
});

// Checkout
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Keranjang kamu masih kosong!');
    return;
  }
  alert('Terima kasih! Pesananmu sedang diproses.');
  cart = [];
  updateCart();
  document.body.classList.remove('modal-open');
  cartModal.classList.add('hidden');
});

// Bersihkan keranjang
clearCartBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Keranjang sudah kosong.');
    return;
  }
  if (confirm('Yakin ingin mengosongkan keranjang?')) {
    cart = [];
    updateCart();
  }
});


/* ----- MODAL "Tentang Game" (Info modal) ----- */
const infoModal = document.getElementById('info-modal');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const infoClose = document.getElementById('infoClose');

// Semua tombol "Tentang Game"
document.querySelectorAll('.btn-info').forEach(btn => {
  btn.addEventListener('click', () => {
    // Ambil judul game dari parent kartu atau dari attribute data
    const card = btn.closest('.game');
    const title = card?.getAttribute('data-title') || card?.querySelector('h3')?.textContent || 'Game';
    const description = btn.dataset.description || 'Deskripsi tidak tersedia.';
    // isi modal
    infoTitle.textContent = title;
    infoDesc.textContent = description;
    // tampilkan modal dan blur background (dengan class body.modal-open)
    document.body.classList.add('modal-open');
    infoModal.classList.remove('hidden');

    // focus accessibility: fokus ke tombol close saat modal terbuka
    setTimeout(() => infoClose.focus(), 200);
  });
});

// Tombol close pada info modal
infoClose.addEventListener('click', () => {
  infoModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Tutup modal jika klik area di luar konten modal
infoModal.addEventListener('click', (e) => {
  if (e.target === infoModal) {
    infoModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

function closeAllModals() {
  infoModal.classList.add('hidden');
  cartModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

/* ----- Accessibility & keyboard support ----- */
// Tutup modal dengan Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!infoModal.classList.contains('hidden')) {
      infoModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
    if (!cartModal.classList.contains('hidden')) {
      cartModal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  }
});
