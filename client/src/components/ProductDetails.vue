<template>
  <div class="container">
    <div id="name-button-container">
      <h1 id="product-name">{{ product.name }}</h1>
      <button @click="addToCart()">
        <font-awesome-icon icon="fa-cart-plus" id="cart-icon" />
        Add to Cart
      </button>
    </div>
    <h2>Details</h2>
    <div id="sku-price">
      <div id="sku">{{ product.productSku }}</div>
      <div id="price">
        {{
          Intl.NumberFormat(`en-US`, {
            currency: `USD`,
            style: "currency",
          }).format(product.price)
        }}
      </div>
    </div>
    <img src="https://placehold.co/400x400" />
    <div>{{ product.description }}</div>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";

export default {
  data() {
    return {
      product: {},
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },
  methods: {
    addToCart() {
        const item = {
            productId: this.product.productId,
            quantity: 1
        };
      if(this.isLoggedIn) {
        CartService.addItemToCart(item).then((response) => {
          if (response.status === 201) {
            window.alert(
              "Item added to cart!"
            );
          }
        });
      } else {
        window.alert("Please login to add a product to your cart");
      }
    },
  },
  created() {
    const id = this.$route.params.id;

    ProductService.getProductDetails(id)
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.error("Failed to fetch product details", error);
      });
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  
}
#name-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -30px;
}
#product-name {
  margin-left: 130px;
  flex-grow: 2;
}
button {
  margin-right: 20px;
  height: 2.25rem;
  border-radius: 8px;
}
#cart-icon {
  font-size: 1.15em;
}
h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}
#sku-price {
  display: flex;
  justify-content: center;
  align-items: center;
}
#sku {
  margin-right: 80px;
}
</style>
