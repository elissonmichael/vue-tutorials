const app = new Vue({
    el: "#app",
    data: {
      editFriend: null,
      friends: [],
    },
    methods: {
      deleteFriend(id, i) {
        fetch("http://localhost:3000/v1/characters/" + id, {
          method: "DELETE"
        })
        .then(() => {
          this.friends.splice(i, 1);
        })
      },
      updateFriend(friend) {
        fetch("http://localhost:3000/v1/characters/" + friend.id, {
          body: JSON.stringify(friend),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.editFriend = null;
        })
      }
    },
    mounted() {
      fetch("http://localhost:3000/v1/characters")
        .then(response => response.json())
        .then((data) => {
          this.friends = data;
        })
    },
    template: `
    <ul class="list-group">
      <div>
      <li class="list-group-item" v-for="friend, i in friends">
      <div v-if="editFriend === friend.id">
      <input v-on:keyup.13="updateFriend(friend)" v-model="friend.name" />
      <button class="btn btn-primary" v-on:click="updateFriend(friend)">save</button>
      </div>
      <div v-else>
      <button class="btn btn-warning" v-on:click="editFriend = friend.id">edit</button>
      <button v-on:click="deleteFriend(friend.id, i)">x</button>
      {{friend.name}}
      </div>
      </li>
      </div>
    </ul>
    `,
});
