<script>
export default {
    data() {
        return {
            users: []
        };
    },
    methods: {
        editUser(id) {
            localStorage.setItem('UserId', id);

            this.$router.push(`/EditUser`);
        },
        deleteUser(id) {
            fetch(`http://localhost:8000/api/deletecustomer/${id}`, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.users = this.users.filter((user) => user.id !== id);
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
        fetch('http://localhost:8000/api/getcustomers', {
            //   headers: {
            //     Authorization: `Bearer ${userToken}`,
            //   },
        })
            .then((response) => response.json())
            .then((data) => {
                this.users = data;
            })
            .catch((error) => {
                console.error(error);
            });
    }
};
</script>

<template>
    <h2>All Users</h2>
    <hr />
    <div class="card">
        <div>
            <div class="mb-5">
                <table id="customers">
                    <tr>
                        <th>User Name</th>
                        <th>User Email</th>

                        <th>User Role</th>
                        <th>Edit User</th>

                        <th>Remove User</th>
                    </tr>
                    <tbody v-for="user in users" :key="user.id">
                        <tr>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>

                            <td>{{ user.role }}</td>
                            <td>
                                <Button label="Edit" class="mr-2 mb-2" @click="editUser(user.id, user)" />
                            </td>
                            <td>
                                <Button @click="deleteUser(user.id)" label="Remove" class="p-button-danger mr-2 mb-2" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
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
