<template>
    <div>
        <body>
            <div class="container">
                <h1>Order Details</h1>
                <div class="order-details">
                    <h2>
                        Order ID:<span class="span">{{ OrderId }}</span>
                    </h2>
                    <h2>
                        Order status:<span class="span">{{ spicificOrder.status }}</span>
                    </h2>

                    <h3>Order Items</h3>

                    <ul v-for="order in orders" :key="order.id">
                        <li>
                            Product Name:<span class="span">{{ order.ProductName }}</span>
                        </li>

                        <li>
                            Product Quantity:<span class="span">{{ order.quantity }}</span>
                        </li>
                        <li>
                            Product Price:<span class="span">{{ order.ProductPrice }}</span>
                        </li>

                        <hr />
                    </ul>
                    <p>
                        Order placed on: <span class="span">{{ formatDate(spicificOrder.created_at) }}</span>
                    </p>

                    <p>
                        Total: <span class="span">{{ spicificOrder.total_price }}</span>
                    </p>
                </div>
            </div>
        </body>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orders: [],
            OrderId: '',
            spicificOrder: []
        };
    },
    mounted() {
        const userToken = localStorage.getItem('userToken');

        const OrderId = localStorage.getItem('OrderId');
        this.OrderId = OrderId;
        fetch(`http://127.0.0.1:8000/api/orderDetails/${OrderId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.orders = data;
            });

        ///////////////
        fetch(`http://127.0.0.1:8000/api/showOrder/${OrderId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                this.spicificOrder = data[0];
            });
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString();
        }
    }
};
</script>
<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.order-details {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h2 {
    margin-bottom: 10px;
}

p {
    margin-bottom: 5px;
}

ul {
    list-style: none;
    margin-bottom: 10px;
}

li {
    margin-bottom: 5px;
}

.order-details h3 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
}

.order-details p {
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
}

.order-details ul {
    margin-bottom: 10px;
    font-size: 16px;
}

.order-details li {
    margin-bottom: 5px;
    font-size: 16px;
}

.order-details.total {
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
}
.span {
    float: right;
}
</style>
