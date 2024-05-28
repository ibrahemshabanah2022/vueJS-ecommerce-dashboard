<template>
    <section class="home">
        <form class="pl-5 pt-5">
            <h2>Add New Product</h2>
            <hr />
            <div class="card">
                <form @submit.prevent="addProduct">
                    <div class="grid p-fluid mt-3">
                        <div class="field">
                            <label for="title">Title:</label>
                            <InputText type="text" id="title" v-model="title" />
                        </div>
                        &nbsp;
                        <div class="field">
                            <label for="price">Price:</label>
                            <InputText type="number" id="price" v-model="price" />
                        </div>
                        &nbsp;
                        <div class="field">
                            <label for="description">Description:</label>
                            <InputText type="text" id="description" v-model="description" />
                        </div>
                        &nbsp;
                        <div class="field">
                            <label for="category_id">Category:</label><br />
                            <select id="category_id" v-model="category_id" style="border: 1px dotted black">
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <br />
                    <div class="grid p-fluid mt-3"></div>

                    <br />

                    <div>
                        <label for="image">Image:</label>
                        <InputText type="file" id="image" @change="onImageChange" />
                    </div>
                    <br /><br />
                    <Button label="submit" class="mr-2 mb-2" type="submit" />
                </form>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            price: 0,
            description: '',
            category_id: 0,
            categories: [],
            image: null
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
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            fetch('http://127.0.0.1:8000/api/category')
                .then((response) => response.json())
                .then((data) => {
                    this.categories = data.categories;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        onImageChange(event) {
            this.image = event.target.files[0];
        },
        addProduct() {
            const userToken = localStorage.getItem('userToken');
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('price', this.price);
            formData.append('description', this.description);
            formData.append('category_id', this.category_id);
            formData.append('image', this.image);

            fetch('http://127.0.0.1:8000/api/products', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                body: formData
            })
                .then((response) => {
                    if (response.ok) {
                        // Redirect to home page
                        window.location.href = 'http://localhost:5174/#/uikit/AllProducts';
                    } else {
                        // Display error message
                        alert('Failed to add product');
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    // Download image to public/images directory
                    // const imageUrl = data.image;
                    // const filename = imageUrl.split("/").pop();
                    // const filepath = `images/${filename}`;
                    // const file = fs.createWriteStream(filepath);
                    // https
                    //  .get(imageUrl, (response) => {
                    //     response.pipe(file);
                    //     console.log(`Image ${filename} downloaded successfully`);
                    //   })
                    //  .on("error", (error) => {
                    //     console.log(error);
                    //   });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>
