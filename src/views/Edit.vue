<template>
  <div class="hero">
    <h3>Edit Expense</h3>

    <div class="card card-body mt-4">
      <form @submit.prevent="update">
        <div class="form-group">
          <label for="">Title</label>
          <input
            type="text"
            v-model="form.title"
            class="form-control"
            required
          />
        </div>

        <div class="form-group mt-3">
          <label for="expenseType">Type</label>

          <select
            name="expenseType"
            id="expenseType"
            v-model="form.selected"
            required
          >
            <option value="" disabled>Select a type</option>
            <option>Credit</option>
            <option>Debit</option>
          </select>
        </div>
        <div class="form-group mt-3">
          <label for="">Amount</label>
          <input
            type="number"
            v-model="form.amount"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mt-3">
          <label for="">Date</label>
          <input
            type="date"
            v-model="form.date"
            class="form-control"
            required
          />
        </div>

        <button type="submit" class="btn btn-success mt-3">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getExpense, updateExpense } from "@/firebase";
import { reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const itemId = computed(() => route.params.id);
    const form = reactive({
      title: " ",
      amount: 0,
      selected: " ",
      date: null,
    });

    onMounted(async () => {
      console.log(itemId.value);
      const item = await getExpense(itemId.value);

      (form.title = item.title),
        (form.amount = item.amount),
        (form.date = item.date),
        (form.selected = item.selected);
    });

    const update = async () => {
      await updateExpense(itemId.value, { ...form });
      router.push("/");
      (form.title = ""),
        (form.amount = 0),
        (form.selected = ""),
        (form.date = null);
    };

    return { form, update };
  },
};
</script>

<style scoped>

h3{
  margin-top: 50px;
}
.card {
  width: 600px;
  margin: auto;
}
form {
  display: grid;
}
.form-group {
  display: flex;
}
.form-group label{
  
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
}
select {
  height: 35px;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
@media screen and (max-width: 450px) {
  .card {
  width: 330px;
  margin: auto;
}
}
</style>