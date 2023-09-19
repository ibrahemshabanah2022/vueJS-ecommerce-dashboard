<template>
    <div class="col py-3">
        <h2 class="text">Products</h2>
    </div>
    <hr />
    <div class="card">
        <div>
            <div class="mb-5">
                <table id="customers">
                    <tr>
                        <th>Products</th>
                        <th>Products Name</th>

                        <th>Price</th>
                        <th>Category Name</th>

                        <th>Edit Product</th>
                        <th>Remove</th>
                    </tr>
                    <tbody v-for="product in products" :key="product.id">
                        <tr>
                            <td>
                                <img :src="`http://localhost:8000/${product.image}`" alt="" style="width: 50px" />
                            </td>
                            <Column>{{ category.name }}</Column>

                            <td>{{ product.title }}</td>
                            <td>{{ product.price }}$</td>
                            <td>{{ product.category.name }}</td>

                            <td>
                                <Button label="Edit" class="mr-2 mb-2" @click="updateProduct(product.id, product)" />
                            </td>
                            <td>
                                <Button label="Delete" class="p-button-danger mr-2 mb-2" @click="deleteProduct(product.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        viewProduct(id) {
            this.$router.push(`/AdminProductDetails/${id}`);
        },

        deleteProduct(id) {
            const userToken = localStorage.getItem('userToken');

            fetch(`http://localhost:8000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.products = this.products.filter((product) => product.id !== id);
                });
        },
        updateProduct(id) {
            localStorage.setItem('ProductId', id);

            this.$router.push(`/uikit/editProduct`);
        }
    },
    data() {
        return {
            products: []
        };
    },
    mounted() {
        const userToken = localStorage.getItem('userToken');

        if (!userToken) {
            window.location.href = 'http://localhost:5174/#/auth/login';
        }
        const userRole = localStorage.getItem('UserRole');

        if (userRole !== 'admin') {
            window.location.href = 'http://localhost:5174/#/pages/notfound'; // redirect to home page
        }

        fetch('http://localhost:8000/api/adminproducts', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.products = data;
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
</script>

<style>
#customers {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
}

#customers td,
#customers th {
    padding-left: 8px;
    text-align: center;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #bdbdbdfd;
}
table {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
}

@media (max-width: 768px) {
    table {
        display: block;
        width: 100%;
    }
}
</style>
