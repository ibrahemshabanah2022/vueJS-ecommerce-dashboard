<template>
    <section class="home">
        <div class="card">
            <form @submit.prevent="updateProduct">
                <div class="justify-content-center">
                    <div class="grid p-fluid mt-3">
                        <div class="col">
                            <h3>Product Name</h3>
                            <InputText type="text" v-model="product.title" />
                        </div>
                        <div class="col">
                            <h3>Product Price</h3>
                            <InputText type="number" v-model="product.price" />
                        </div>
                    </div>
                    <br />
                    <br />
                    <h3>Product Description</h3>
                    <textarea class="form-control" rows="6" v-model="product.description" style="width: 100%; height: 100px"></textarea>
                </div>
                <div>
                    <h3>current Product image</h3>
                    <img :src="`http://localhost:8000/${product.image}`" alt="" style="width: 250px" />
                    <br />
                    <br />
                    <br />
                    <h3>New Product image</h3>

                    <img :src="imageUrl" v-if="imageUrl" alt="" style="width: 250px" />
                    <input class="form-control" type="file" id="image" @change="onImageChange" />
                </div>
                <br />
                <Button label="submit" class="mr-2 mb-2" type="submit" />
            </form>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            product: {},
            image: null,
            imageUrl: ''
        };
    },
    methods: {
        onImageChange(event) {
            this.image = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.imageUrl = reader.result;
            };
            reader.readAsDataURL(this.image);
        },
        updateProduct() {
            const userToken = localStorage.getItem('userToken');

            const formData = new FormData();
            formData.append('title', this.product.title);
            formData.append('price', this.product.price);
            formData.append('description', this.product.description);

            formData.append('image', this.image);
            fetch(`http://localhost:8000/api/products/${this.product.id}`, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: formData
            })
                .then((response) => response.json())
                .then((data) => {
                    window.location.href = `https://elegant-starburst-8966d7.netlify.app/#/uikit/AllProducts`;

                    console.log(data);
                    // Handle success
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error
                });
        }
    },

    mounted() {
        const userToken = localStorage.getItem('userToken');

        if (!userToken) {
            window.location.href = 'https://elegant-starburst-8966d7.netlify.app/#/auth/login';
        }
        const userRole = localStorage.getItem('UserRole');

        if (userRole !== 'admin') {
            window.location.href = 'https://elegant-starburst-8966d7.netlify.app/#/pages/notfound'; // redirect to home page
        }
        const id = localStorage.getItem('ProductId');
        fetch(`http://localhost:8000/api/products/${id}`, {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((d) => {
                this.product = d;
            });
    }
};
</script>
<style></style>
