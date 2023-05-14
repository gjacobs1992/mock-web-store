<template>
  <div id="main-container">
    <div id="second-container">
      <div id="title">
        <h1 id="page-title">
          Products
          <loading-spinner id="spinner" v-bind:spin="isLoading" />
        </h1>
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: cardView }"
          v-on:click="cardView = true"
          icon="fa-solid fa-grip"
          title="Card View"
          id="card-view"
        />
        <font-awesome-icon
          v-bind:class="{ 'view-icon': true, active: !cardView }"
          v-on:click="cardView = false"
          icon="fa-solid fa-table"
          title="Table View"
          id="table-view"
        />
        <input
          type="search"
          id="search-bar"
          v-model="searchTerm"
          placeholder="Search..."
        />
      </div>
      <div class="product-list" :list-view="!cardView">
        <div
          v-for="product in filteredProducts"
          :key="product.productId"
          class="product-card"
        >
          <h2
            class="product-name clickable"
            @click="pushToDetails(product.productId)"
          >
            {{ product.name }}
          </h2>
          <img
            class="clickable"
            src="https://placehold.co/200x200"
            :alt="product.imageName"
            @click="pushToDetails(product.productId)"
          />
          <div
            class="clickable"
            id="product-price"
            @click="pushToDetails(product.productId)"
          >
            {{
              Intl.NumberFormat(`en-US`, {
                currency: `USD`,
                style: "currency",
              }).format(product.price)
            }}
          </div>
          <div id="cart-div">
            <font-awesome-icon
              icon="fa-cart-plus"
              class="cart-icon clickable"
              @click="addToCart(product.productId)"
            />
          </div>
        </div>
      </div>
      <div id="tbl-container" :list-view="cardView">
        <table id="product-table" class="tbl">
          <tr>
            <th>Sku</th>
            <th>Product</th>
            <th>Price</th>
            <th></th>
          </tr>
          <tr v-for="product in filteredProducts" :key="product.productId">
            <td>{{ product.productSku }}</td>
            <td>{{ product.name }}</td>
            <td>${{ product.price }}</td>
            <td>
              <font-awesome-icon
                icon="fa-cart-plus"
                class="cart-icon clickable"
                @click="addToCart(product.productId)"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      isFlexWrapActivated: false,
      searchTerm: "",
      cardView: true,
      isLoading: false,
    };
  },
  components: {
    LoadingSpinner,
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.token.length > 0;
    },
    filteredProducts() {
      const searchTerm = this.searchTerm.toLowerCase();

      if (searchTerm.length >= 3) {
        return this.products.filter((product) => {
          return product.name.toLowerCase().includes(searchTerm);
        });
      } else {
        return this.products;
      }
    },
  },
  methods: {
    pushToDetails(id) {
      this.$router.push({ name: "details", params: { id: id } });
    },
    addToCart(productId) {
      const item = {
        productId: productId,
        quantity: 1,
      };
      if (this.isAuthenticated) {
        CartService.addItemToCart(item)
          .then(() => {
            //if (response.status === 201) {
              window.alert("Added to cart!");
              this.$store.commit("SET_MESSAGE", item.productId);
            //}
          })
          .catch((error) => {
            console.error("Failed to add item to cart.", error);
            this.$store.commit("SET_ERROR", error);
          });
      } else {
        window.alert("Please login to add a product to your cart.");
      }
    },
  },
  created() {
    this.isLoading = true;
    ProductService.getAllProducts()
      .then((response) => {
        this.products = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error("Failed to fetch products", error);
      });
  },
};
</script>

<style scoped>
#title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#page-title {
  font-size: 2rem;
  flex-grow: 2;
}
#search-bar {
  font-size: 20px;
}
#second-container{
  margin-top: 150px;
}
.product-list {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 100px;
}
.product-list[list-view="true"] {
  display: none;
}
.product-card {
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
  width: 20rem;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px 1px #888888;
}
.product-name {
  font-size: 1.5rem;
}
#product-price {
  font-size: 1.5rem;
}
#cart-div {
  text-align: right;
  margin-right: 5px;
}
.cart-icon {
  font-size: 2.25rem;
}
.clickable:hover {
  cursor: pointer;
}
.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}
#spinner {
  color: green;
}
#tbl-container[list-view="true"] {
  display: none;
}
#tbl-container {
  width: 50rem;
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
  width: 10%;
}
.tbl > tr > th {
  text-align: left;
  font-size: 1.25em;
}
</style>
