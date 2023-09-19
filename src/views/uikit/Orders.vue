<template>
    <div class="col py-3">
        <h2 class="text">Orders</h2>
    </div>
    <hr />
    <div class="card">
        <div>
            <div class="mb-5">
                <table id="customers">
                    <tr>
                        <th>Order user</th>
                        <th>Order Status</th>
                        <th>Order Totalprice</th>
                        <th>Order Date</th>
                        <th>View Order</th>
                    </tr>
                    <tbody v-for="order in orders" :key="order.id">
                        <tr>
                            <td>{{ order.user.name }}</td>
                            <td>{{ order.status }}</td>
                            <td>{{ order.total_price }}</td>
                            <td>{{ formatDate(order.created_at) }}</td>
                            <td><Button label="View" class="mr-2 mb-2" @click="ViewOrder(order.id)" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [],
            dateTime: ''
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

        fetch('http://127.0.0.1:8000/api/orders', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.orders = data;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        ViewOrder(id) {
            localStorage.setItem('OrderId', id);

            this.$router.push(`/uikit/viewOrder`);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString();
        }
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
