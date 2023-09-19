<script>
import fs from 'fs';
import https from 'https';

export default {
    data() {
        return {
            name: '',
            image: null
        };
    },

    methods: {
        onImageChange(event) {
            this.image = event.target.files[0];
        },
        addCategory() {
            const userToken = localStorage.getItem('userToken');
            const formData = new FormData();
            formData.append('name', this.name);

            formData.append('image', this.image);

            fetch('http://localhost:8000/api/category', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`
                },
                body: formData
            })
                .then((response) => {
                    if (response.ok) {
                        // Redirect to home page
                        window.location.href = `http://localhost:5174/#/uikit/Categories`;
                    } else {
                        // Display error message
                        alert('Failed to add category');
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
            window.location.href = 'http://localhost:5174/#/auth/login';
        }
        const userRole = localStorage.getItem('UserRole');

        if (userRole !== 'admin') {
            window.location.href = 'http://localhost:5174/#/pages/notfound'; // redirect to home page
        }
    }
};
</script>

<template>
    <div class="">
        <div class="">
            <h2>Add New Category</h2>
            <hr />
            <div class="card p-fluid">
                <form @submit.prevent="addCategory">
                    <div class="field">
                        <label for="name1">Name</label>
                        <InputText id="name1" type="text" v-model="name" />
                    </div>
                    <div class="field">
                        <label for="email1">Image</label>
                        <InputText id="email1" type="file" @change="onImageChange" />
                    </div>
                    <button class="btn btn-dark" type="submit">Add category</button>
                </form>
            </div>
        </div>
    </div>
</template>
