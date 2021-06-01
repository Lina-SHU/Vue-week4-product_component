export default {
  props: { // 將 data 用物件形式先定義好各資料的 初始值 及 型別
    product: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      delModal: '',
      apiUrl: 'https://vue3-course-api.hexschool.io/',
      path: 'linachen'
    }
  },
  methods: {
    openModal() {
      this.delModal.show();
    },
    hideModal() {
      this.delModal.hide();
    },
    deleteProduct(id) {
      axios.delete(`${this.apiUrl}api/${this.path}/admin/product/${id}`)
        .then(res => {
          if (res.data.success) {
            this.$emit('getProduct');
            this.$emit('alertFeedback');
            this.hideModal();
          } else {
            alert('刪除商品錯誤');
          }
        })
    }
  },
  template: `
        <div class="modal fade" id="deleteModal" ref="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">刪除商品</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              是否刪除 {{product.title}}? (刪除後無法恢復)
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" class="btn btn-danger" @click="deleteProduct(product.id)">刪除</button>
            </div>
          </div>
        </div>
      </div>
      `,
  mounted() {
    this.delModal = new bootstrap.Modal(this.$refs.deleteModal);
    // get token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
  },
}