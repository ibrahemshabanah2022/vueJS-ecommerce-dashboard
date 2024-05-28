<template>
    <section class="home">
        <div class="text"><h2>Categories</h2></div>
        <hr />

        <div class="card">
            <div>
                <div class="mb-5">
                    <table id="customers">
                        <tr>
                            <th>img</th>
                            <th>Name</th>

                            <th>products number</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                        <tbody v-for="category in categories" :key="category.id">
                            <tr>
                                <td>
                                    <img :src="`http://127.0.0.1:8000/${category.image}`" alt="" style="width: 50px" />
                                </td>
                                <Column>{{ category.name }}</Column>

                                <td>{{ category.name }}</td>
                                <td>{{ productCounts[category.id] }}</td>
                                <td>
                                    <Button label="Edit" class="mr-2 mb-2" @click="updateProduct(category.id, category)" />
                                </td>
                                <td>
                                    <Button label="Remove" class="p-button-danger mr-2 mb-2" @click="deleteProduct(category.id)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    methods: {
        viewProduct(id) {
            this.$router.push(`/AdminProductDetails/${id}`);
        },

        deleteProduct(id) {
            const userToken = localStorage.getItem('userToken');

            fetch(`http://127.0.0.1:8000/api/category/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.categories = this.categories.filter((category) => category.id !== id);
                });
        },
        updateProduct(id) {
            localStorage.setItem('ProductId', id);

            this.$router.push(`/uikit/EditCategory`);
        }
    },
    data() {
        return {
            categories: [],
            productCounts: {}
        };
    },
    mounted() {
        const userToken = localStorage.getItem('userToken');

        if (!userToken) {
            window.location.href = 'https://elegant-starburst-8966d7.netlify.app/#/auth/login';
        }
        // const userRole = localStorage.getItem('UserRole');

        // if (userRole !== 'admin') {
        //     window.location.href = 'https://elegant-starburst-8966d7.netlify.app/#/pages/notfound'; // redirect to home page
        // }

        fetch('http://127.0.0.1:8000/api/categoryAdmin', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.categories = data.categories;
                this.productCounts = data.productCounts;
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
    /* border-collapse: collapse; */
    width: 100%;
}

#customers td,
#customers th {
    padding-left: 8px;
    /* background-color: #a39dff; */
    text-align: center;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #bdbdbdfd;
}
</style>
