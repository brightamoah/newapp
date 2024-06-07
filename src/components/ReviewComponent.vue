 <template >
    <div class="review-container">
         <el-carousel :interval="4000" type="card" height="350px">
    <el-carousel-item v-for="review in 6" :key="review">
      <h3 text="2xl" justify="center">{{ review }}</h3>
    </el-carousel-item>
  </el-carousel>
    </div>
</template>
<script>
import { useReviewStore } from '@/stores/ReviewsStore';
import { ref } from 'firebase/storage';


const  reviewStore = useReviewStore()

const reviews = ref([])


// Flatten the nested review structure
reviews.value = Object.values(reviewStore.value.reviews).flat();
// console.table(reviews.value)

</script>
<style >
.review-container{
  height: 25rem;
  margin-top: 2rem;
}
    .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style> 