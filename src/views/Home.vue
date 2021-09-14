<template>
  <div class="home">
    <div class="form-box">
      <form action="" @submit.prevent="addItem">
        <input
          type="text"
          v-model="item.title"
          placeholder="Description...."
          required
        />
        <div class="expenseType">
          <select
            name="expenseType"
            id="expenseType"
            v-model="item.selected"
            required
          >
            <option value="" disabled>Select a type</option>
            <option>Credit</option>
            <option>Debit</option>
          </select>
        </div>
        <input
          type="number"
          v-model="item.amount"
          placeholder="Amount ...."
          required
        />
        <input type="date" v-model="item.date" required />
        <input type="submit" value="Add" />
      </form>
    </div>
    <div class="items">
      <div v-if="!items.length">
        <p>No expenses added yet</p>
      </div>
      <div v-else>
        <table>
          <tr class="item-header">
            <td>Name</td>
            <td>Amount</td>
            <td>Type</td>
            <td>Date</td>
            <td>Action</td>
          </tr>
          <tr class="item" v-for="item in items" :key="item.id">
            <td class="title">
              {{ item.title }}
            </td>
            <td class="amount">
              ₦ {{ item.amount }}
            </td>
            <td class="type">
              {{ item.selected }}
            </td>
            <td class="date">
              {{ item.date }}
            </td>
            <td class="btns">
              <router-link :to="{ name: 'Edit', params: { id: item.id } }">
                <i class="fa fa-edit" id="edit"></i>
              </router-link>
              <i
                class="fa fa-trash"
                id="delete"
                @click="deleteExpense(item.id)"
              ></i>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useLoadExpenses, deleteExpense, createExpense } from "@/firebase";


export default {
  name: "Home",
  components: {},
  setup() {
    const item = reactive({
      title: "",
      amount: "",
      selected: "",
      date: null,
    });

    const items = useLoadExpenses();

    const sortedDates = items.value.sort((a, b) => b.date - a.date);

    const addItem = async () => {
      await createExpense({ ...item });
      (item.title = ""),
        (item.amount = 0),
        (item.selected = ""),
        (item.date = null),
        items.value.unshift(item);

      console.warn(item);
    };

    return { item, items, sortedDates, addItem, deleteExpense };
  },
};
</script>

<style scoped>
.form-box {
  margin-top: 50px;
}
form {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: auto;
}
form input {
  color: #888;
  border: none;
  outline: none;
  font-size: 18px;
}
form input::placeholder {
  color: #aaa;
}
form input:not([type="submit"]) {
  display: block;
  background: #fff;
  border: none;
  outline: none;
  padding: 5px 15px;
}
form input[type="submit"] {
  display: block;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 500;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  background-color: green;
  cursor: pointer;
}
form input:first-of-type {
  border-radius: 8px 0px 0px 8px;
}
form input:last-of-type {
  border-radius: 0px 8px 8px 0px;
}
select {
  color: #888;
  border: none;
  outline: none;
  height: 42px;
}
table {
  margin: auto;
}
td {
  width: 160px;
  height: 40px;
}
.items p {
  margin-top: 100px;
}
.item-header {
  position: relative;
  display: flex;
  padding: 15px 15px 15px 0px;
  background-color: #fff;
  border-radius: 8px 8px 0 0;
  max-width: 600px;
  margin: 30px auto 30px;
  font-weight: 600;
}
.item-header td {
  margin-top: auto;
  margin-bottom: auto;
}
.item {
  position: relative;
  display: flex;
  padding: 15px 15px 15px 0px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 600px;
  margin-bottom: 7px;
}

.item .title, .item .amount, .item .type, .item .date{
  margin-top: auto;
  margin-bottom: auto;
} 
.btns {
  display: flex;
  flex-wrap: wrap;
  margin-right: -40px;
  margin-left: 30px;
}
.btns i {
  margin-left: 10px;
  font-size: 20px;
}

#edit,
#edit a {
  color: green;
  text-decoration: none;
}
#delete {
  color: red;
}
#edit,
#edit a:hover,
#delete:hover {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  form {
    display: grid;
  }
  form input {
    border-radius: 8px;
    margin-top: 10px;
  }
  form input:first-of-type {
    border-radius: 8px;
  }
  form input:last-of-type {
    border-radius: 8px;
  }
  select {
    width: 300px;
    max-width: 500px;
    border-radius: 8px;
    margin-top: 10px;
  }
  .items {
    width: 80%;
    overflow-x: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 100px;
  }
}
</style>
