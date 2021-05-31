export default {
  props: ['pages'],
  template: `
        <div class="d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" :class="{disabled: !pages.has_pre}"><a class="page-link" href="#" @click="$emit('getProduct', pages.current_page -1)">Previous</a></li>

              <li class="page-item" v-for="page in pages.total_pages" :key="page+'1'" :class="{active: pages.current_page === page}">
                <a class="page-link" href="#" @click="$emit('getProduct', page)">{{page}}</a>
              </li>

              <li class="page-item" :class="{disabled: !pages.has_next}"><a class="page-link" href="#" @click="$emit('getProduct', pages.current_page +1)">Next</a></li>
            </ul>
          </nav>
        </div>
      `
}