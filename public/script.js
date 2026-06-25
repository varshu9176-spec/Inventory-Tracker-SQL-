// Load Products

window.onload = function () {
    getProducts();
};

function getProducts() {

    fetch('/products')
        .then(res => res.json())
        .then(data => {

            let output = '';

            document.getElementById('totalProducts').innerText = data.length;

            let lowStock = data.filter(p => p.quantity < 5).length;

            document.getElementById('lowStock').innerText = lowStock;

            data.forEach(product => {

                output += `
                <tr>

                    <td>${product.id}</td>
                    <td>${product.product_name}</td>
                    <td>${product.category}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>

                    <td>

                        <button
                        class="btn btn-warning btn-sm"
                        onclick="updateProduct(${product.id})">
                        Update
                        </button>

                        <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteProduct(${product.id})">
                        Delete
                        </button>

                        <button
                        class="btn btn-success btn-sm"
                        onclick="stockIn(${product.id})">
                        Stock In
                        </button>

                        <button
                        class="btn btn-secondary btn-sm"
                        onclick="stockOut(${product.id})">
                        Stock Out
                        </button>

                    </td>

                </tr>
                `;
            });

            document.getElementById('productTable').innerHTML = output;

        });

}

// Add Product

function addProduct() {

    const product_name =
        document.getElementById('productName').value;

    const category =
        document.getElementById('category').value;

    const quantity =
        document.getElementById('quantity').value;

    const price =
        document.getElementById('price').value;

    fetch('/addProduct', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            product_name,
            category,
            quantity,
            price
        })

    })

        .then(res => res.text())
        .then(data => {

            alert(data);

            location.reload();

        });

}

// Update Product

function updateProduct(id) {

    const product_name =
        prompt("Enter New Product Name");

    const category =
        prompt("Enter New Category");

    const quantity =
        prompt("Enter New Quantity");

    const price =
        prompt("Enter New Price");

    fetch('/updateProduct/' + id, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            product_name,
            category,
            quantity,
            price
        })

    })

        .then(res => res.text())
        .then(data => {

            alert(data);

            location.reload();

        });

}

// Delete Product

function deleteProduct(id) {

    if (confirm("Delete Product?")) {

        fetch('/deleteProduct/' + id, {

            method: 'DELETE'

        })

            .then(res => res.text())
            .then(data => {

                alert(data);

                location.reload();

            });

    }

}

// Stock In

function stockIn(id) {

    const qty =
        prompt("Enter Quantity");

    fetch('/stockIn/' + id, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            quantity: qty
        })

    })

        .then(res => res.text())
        .then(data => {

            alert(data);

            location.reload();

        });

}

// Stock Out

function stockOut(id) {

    const qty =
        prompt("Enter Quantity");

    fetch('/stockOut/' + id, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            quantity: qty
        })

    })

        .then(res => res.text())
        .then(data => {

            alert(data);

            location.reload();

        });

}