<template>
  <div id="main-container">
    <div id="top">
      <h1>Shopping Cart</h1>
      <button id="clear-btn" @click="clearCart()">
        <font-awesome-icon icon="fa-trash-can" />
        Clear Cart
      </button>
    </div>
    <div id="table-container" :key="componentKey">
      <table class="tbl" id="item-tbl">
        <tr>
          <th>Qty</th>
          <th>Product</th>
          <th>Price</th>
          <th>Amount</th>
          <th></th>
        </tr>
        <tr v-for="cartItem in cartInfo.items" :key="cartItem.cartItemId">
          <td>{{ cartItem.quantity }}</td>
          <td>{{ cartItem.product.name }}</td>
          <td>{{ convertToCurrency(cartItem.product.price) }}</td>
          <td>
            {{ convertToCurrency(cartItem.quantity * cartItem.product.price) }}
          </td>
          <td>
            <font-awesome-icon
              icon="fa-xmark"
              class="x-icon"
              @click="removeItem(cartItem.cartItemId)"
            />
          </td>
        </tr>
      </table>
      <hr />
      <table class="tbl">
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td></td>
          <td>Item Subtotal:</td>
          <td></td>
          <td>{{ convertToCurrency(cartInfo.itemSubtotal) }}</td>
        </tr>
        <tr>
          <td></td>
          <td>Tax:</td>
          <td></td>
          <td>{{ convertToCurrency(cartInfo.tax) }}</td>
        </tr>
        <tr>
          <td></td>
          <td>Total:</td>
          <td></td>
          <td>{{ convertToCurrency(cartInfo.total) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import CartService from "../services/CartService";

export default {
  name: "cart-list",
  data() {
    return {
      cartInfo: {
        items: [],
        itemSubtotal: 0,
        tax: 0,
        total: 0,
      },
      componentKey: 0,
    };
  },
  computed: {
    cartItems() {
      return this.cartInfo.items;
    },
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    convertToCurrency(value) {
      return Intl.NumberFormat(`en-US`, {
        currency: `USD`,
        style: "currency",
      }).format(value);
    },
    getCartItems() {
      CartService.getCart()
        .then((response) => {
          this.cartInfo = response.data;
        })
        .catch((error) => {
          console.error("Failed to fetch cart", error);
        });
    },
    removeItem(id) {
      CartService.removeItem(id).then((response) => {
        console.log(response.status);
        // if (response.status === 204) {
         this.getCartItems();
        // }
      });
    },
    clearCart() {
      if (window.confirm("Your cart will be cleared. Are you sure?")) {
        CartService.clearCart().then((response) => {
          console.log(response.status);
          //if (response.status === 204) {
            this.cartInfo = {
              items: [],
              itemSubtotal: 0,
              tax: 0,
              total: 0,
            //};
          }
        });
      }
    },
  },
  created() {
    this.getCartItems();
  },
};
</script>

<style scoped>
#main-container {
  margin: 150px 20px 0 20px;
}
h1 {
  font-size: 1.75rem;
}
#top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#table-container {
  width: 35rem;
}
.tbl {
  width: 100%;
  table-layout: fixed;
}
.tbl > tr {
  line-height: 1.4rem;
}
.tbl > tr > th:first-child {
  width: 10%;
}
.tbl > tr > th:nth-child(2) {
  width: 40%;
}
.tbl > tr > th:nth-child(3) {
  width: 20%;
}
.tbl > tr > th:nth-child(4) {
  width: 20%;
}
.tbl > tr > th {
  text-align: left;
  font-size: 1.25em;
}
.x-icon:hover {
  cursor: pointer;
}
#clear-btn {
  border-radius: 8px;
  height: 35px;
}
</style>
