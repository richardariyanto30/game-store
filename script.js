// Navigasi antar halaman
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

// Fitur keranjang belanja
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout');
const closeCart = document.getElementById('closeCart');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);
    cart.push({ name, price });
    updateCart();
    alert(`${name} telah ditambahkan ke keranjang!`);
  });
});

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - Rp ${item.price.toLocaleString()}`;
    cartItems.appendChild(li);
  });
  totalPrice.textContent = `Total: Rp ${total.toLocaleString()}`;
}

// Tampilkan / sembunyikan modal keranjang
document.querySelector('.cart-icon').addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Keranjang kamu masih kosong!');
    return;
  }
  alert('Terima kasih! Pesananmu sedang diproses.');
  cart = [];
  updateCart();
  cartModal.classList.add('hidden');
});
