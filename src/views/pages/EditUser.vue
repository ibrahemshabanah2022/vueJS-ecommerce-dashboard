<template>
    <div class="card">
        <form @submit.prevent="updateuser">
            <div class="grid p-fluid mt-3">
                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <InputText type="text" id="inputtext" v-model="user.name" />
                        <label for="inputtext">User Name</label>
                    </span>
                </div>

                <div class="field col-12 md:col-4">
                    <span class="p-float-label">
                        <InputText type="text" id="inputtext" v-model="user.email" readonly />
                        <label for="inputtext">User Email</label>
                    </span>
                </div>
                <div>
                    <label>User Role</label>
                    <div v-if="user.role == 'admin'">
                        <select style="width: 200px; height: 35px" v-model="user.role">
                            <option selected>admin</option>
                            <option>user</option>
                        </select>
                    </div>
                    <div v-if="user.role == 'user'">
                        <select style="width: 200px; height: 35px" v-model="user.role">
                            <option selected>user</option>
                            <option>admin</option>
                        </select>
                    </div>
                </div>
            </div>
            <button class="btn btn-dark" type="submit">Update</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {}
        };
    },
    methods: {
        updateuser() {
            /////////
            const userToken = localStorage.getItem('userToken');
            const id = localStorage.getItem('UserId');

            fetch(`http://localhost:8000/api/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    name: this.user.name,
                    email: this.user.email,
                    role: this.user.role
                })
            })
                .then((response) => response.json())
                .then((data) => {
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
            window.location.href = 'http://localhost:5174/#/auth/login';
        }
        const userRole = localStorage.getItem('UserRole');

        if (userRole !== 'admin') {
            window.location.href = 'http://localhost:5174/#/pages/notfound'; // redirect to home page
        }
        const id = localStorage.getItem('UserId');
        fetch(`http://localhost:8000/api/showUser/${id}`, {
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((d) => {
                this.user = d;
            });
    }
};
</script>
<style></style>
