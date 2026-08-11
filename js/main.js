let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            renderProducts(allProducts);
            renderFilterButtons(allProducts);
        })
        .catch(err => console.error('Lỗi khi tải dữ liệu sản phẩm:', err));
});

function renderProducts(products) {
    const grid = document.getElementById('product-list');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p><strong>Loại:</strong> ${p.category}</p>
            <p><strong>Nguồn gốc:</strong> ${p.origin}</p>
            <p class="description">${p.description}</p>
            <p class="price">${p.price.toLocaleString('vi-VN')} VNĐ / ${p.unit}</p>
        </div>
    `).join('');
}

function renderFilterButtons(products) {
    const container = document.getElementById('filter-buttons');
    if (!container) return;
    const categories = ['Tất cả', ...new Set(products.map(p => p.category))];
    container.innerHTML = categories.map(cat => `
        <button onclick="filterCategory('${cat}')">${cat}</button>
    `).join('');
}

function filterCategory(cat) {
    if (cat === 'Tất cả') {
        renderProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === cat);
        renderProducts(filtered);
    }
}