<script>
export default {
    data() {
        return {
            category: {},
            imageUrl: '',
            name: '',
            image: null
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

        updatecategory() {
            const userToken = localStorage.getItem('userToken');
            const formData = new FormData();
            formData.append('name', this.category.name);
            formData.append('image', this.image);
            const id = localStorage.getItem('ProductId');

            fetch(`http://localhost:8000/api/category/${id}`, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: formData
            })
                .then((response) => {
                    if (response.ok) {
                        // Redirect to home page
                        window.location.href = `https://elegant-starburst-8966d7.netlify.app/#/uikit/Categories`;
                    } else {
                        // Display error message
                        alert('Failed to update category');
                    }
                })
                .then((response) => response.json())
                .then((data) => {})
                .catch((error) => {
                    console.log(error);
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
        fetch(`http://localhost:8000/api/category/${id}`, {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((d) => {
                this.category = d;
                this.imageUrl = d.image;
            });
    }
};
</script>

<template>
    <div class="card">
        <h5>Float Label</h5>
        <form @submit.prevent="updatecategory">
            <div class="grid p-fluid mt-3">
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <InputText type="text" id="inputtext" v-model="category.name" />
                        <label for="inputtext">Category Name</label>
                    </span>
                </div>
                <div class="field col-12 md:col-4">
                    <h3>current category image</h3>
                    <img :src="`http://localhost:8000/${category.image}`" alt="" style="width: 250px" />
                    <br />
                    <br />
                    <br />
                </div>
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <h3>New category image</h3>

                        <img :src="imageUrl" v-if="imageUrl" alt="" style="width: 250px" />
                        <input type="file" id="image" @change="onImageChange" />
                    </span>
                </div>
            </div>
            <button class="btn btn-dark" type="submit">Update</button>
        </form>
    </div>
</template>
