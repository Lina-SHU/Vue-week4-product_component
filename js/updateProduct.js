export default {
  props: { // 將 data 用物件形式先定義好各資料的 初始值 及 型別
    product: {
      type: Object,
      default() {
        return {
          size: [],
          imagesUrl: []
        }
      }
    },
    newTitle: {
      type: Boolean,
      default: true,
    },
    currentPage:{
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      modal: '',
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      path: 'linachen'
    }
  },
  methods: {
    updateProduct(id) {
      if (!this.product.title || !this.product.unit || !this.product.category || !this.product['origin_price'] || !this.product.price || this.product.size.length === 0) {
        alert('必填欄位皆須填寫!');
        return;
      }
      if (this.newTitle) {
        axios.post(`${this.apiUrl}api/${this.path}/admin/product`, { data: this.product })
          .then(res => {
            console.log(res);
            if (res.data.success) {
              this.$emit('getProduct');
              this.$emit('feedback');
              this.hideModal();
            } else {
              alert('新增商品錯誤');
            }
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        axios.put(`${this.apiUrl}api/${this.path}/admin/product/${id}`, { data: this.product })
          .then(res => {
            console.log(res);
            if (res.data.success) {
              this.$emit('getProduct', this.currentPage);
              this.$emit('feedback');
              this.hideModal();
            } else {
              alert('編輯商品錯誤');
            }
          })
      }
    },
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    uploadImage() {
      const fileInput = document.querySelector('#productImage');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);
      axios.post(`${this.apiUrl}api/${this.path}/admin/upload`, formData)
        .then(res => {
          if (res.data.success) {
            this.product.imageUrl = res.data.imageUrl;
            fileInput.value = "";
          } else {
            alert('圖片上傳失敗');
          }
        })
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.productModal);
    // get token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
  },
  template: `
        <div class="modal fade" id="modal" tabindex="-1" data-bs-backdrop="static" ref="productModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title" id="exampleModalLabel" v-if="newTitle">新增商品</h5>
              <h5 class="modal-title" id="exampleModalLabel" v-else>編輯商品</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="productName" class="form-label">商品名稱<span class="text-danger">(必填)</span></label>
                  <input type="text" class="form-control" id="productName" placeholder="動物園造型衣服" v-model="product.title">
                </div>

                <div class="row">
                  <div class="col">
                    <label for="productUnit" class="form-label">商品單位<span class="text-danger">(必填)</span></label>
                    <input type="text" class="form-control" id="productUnit" placeholder="個" v-model="product.unit">
                  </div>
                  <div class="col">
                    <label for="productCategory" class="form-label">商品種類<span class="text-danger">(必填)</span></label>
                    <input type="text" class="form-control" id="productCategory" placeholder="衣服" v-model="product.category">
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col">
                    <label for="productOriginPrice" class="form-label">商品原價<span class="text-danger">(必填)</span></label>
                    <input type="number" class="form-control" id="productOriginPrice" v-model.number="product['origin_price']">
                  </div>
                  <div class="col">
                    <label for="productPrice" class="form-label">商品售價<span class="text-danger">(必填)</span></label>
                    <input type="number" class="form-control" id="productPrice" v-model.number="product.price">
                  </div>
                </div>
                <div class="mb-3 mt-2">
                  <h6>商品尺寸<span class="text-danger">(必填)</span></h6>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="sizeS" value="S" v-model="product.size" :disabled="product.size.indexOf('F') !== -1">
                    <label class="form-check-label" for="sizeS">S</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="sizeM" value="M" v-model="product.size" :disabled="product.size.indexOf('F') !== -1">
                    <label class="form-check-label" for="sizeM">M</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="sizeL" value="L" v-model="product.size" :disabled="product.size.indexOf('F') !== -1">
                    <label class="form-check-label" for="sizeL">L</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="sizeF" value="F" v-model="product.size"  :disabled="product.size.indexOf('F') === -1 && product.size.length !== 0">
                    <label class="form-check-label" for="sizeF">F</label>
                  </div>
                </div>
                <div class="mb-3 mt-2">
                  <label for="productContent" class="form-label">商品內容</label>
                  <input type="text" class="form-control" id="productContent" placeholder="商品內容" v-model="product.content">
                </div>
                <div class="mb-3">
                  <label for="productDesc" class="form-label">商品描述</label>
                  <textarea class="form-control" id="productDesc" row="3" placeholder="Sit down please 名設計師設計" v-model="product.description"></textarea>
                </div>
                <div class="mb-3 mt-2">
                  <label for="productImage" class="form-label">商品主要圖片</label>
                  <div class="input-group">
                    <input type="file" class="form-control" id="productImage" placeholder="請選擇圖片" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                    <button class="btn btn-primary" type="button" @click="uploadImage">上傳檔案</button>
                  </div>
                  <img :src="product.imageUrl" alt="img" v-if="product.imageUrl" class='img-fluid mt-2'>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="product['is_enabled']" id="enabled" v-model="product['is_enabled']" :true-value='1' :false-value='0'>
                  <label class="form-check-label" for="enabled">
                    是否啟用
                  </label>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateProduct(product.id)">編輯</button>
            </div>
          </div>
        </div>
      </div>
      `
}