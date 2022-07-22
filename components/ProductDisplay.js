app.component("product-display", {
    props: {
      premium: {
        type: Boolean,
        required: true,
      },
    },
    template:
      /*html*/
      `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :src="image" />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
          <h3>Price: Php{{ price }}</h3>
          <p v-if="onSale">{{ saleMessage }}</p>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
  
          <p>shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
          ></div>
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
          <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          @click="removeFromCart">
          Remove Item
        </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
    data() {
      return {
        price: 105,
        brand: "Nun Bell",
        product: "Dog Leash",
        selectedVariant: 0,
        details: ["Nylon", "Small and Medium-Sized Dogs", "Size: 125 L"],
        variants: [
          {
            id: 2234,
            color: "orange",
            image: "./assets/images/dog-leash-orange.jpeg",
            quantity: 50,
          },
          {
            id: 2235,
            color: "yellow",
            image: "./assets/images/dog-leash-yellow.jpeg",
            quantity: 0,
          },
        ],
        onSale: true,
        reviews: [],
      };
    },
    methods: {
      addToCart() {
        this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
      },
      removeFromCart() {
          this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
      updateVariant(index) {
        this.selectedVariant = index;
      },
      addReview(review) {
          this.reviews.push(review)
      }
    },
    computed: {
      title() {
        return this.brand + " " + this.product;
      },
      image() {
        return this.variants[this.selectedVariant].image;
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity;
      },
      saleMessage() {
        if (this.onSale) {
          return this.brand + " " + this.product + " is on sale.";
        }
        return "";
      },
      shipping() {
        if (this.premium) {
          return "Free";
        }
        return 40;
      },
    },
  });
  