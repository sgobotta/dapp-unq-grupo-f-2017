<template>
  <div class="panel panel-default profile-area">
  <div class="panel-heading"><h3>Customer Profile</h3></div>
  <div class="panel-body">
    <div>
      <label><i class="glyphicon glyphicon-user"></i> CUIT number</label>
      <h3 class="cuit">{{ customer.cuit }}</h3>
    </div>
    <div>
      <label><i class="glyphicon glyphicon-envelope"></i> Email</label>
      <h3 class="email">{{ customer.email }}</h3>
    </div>
    <pre class="full-profile">{{ profile }}</pre>
  </div>
</div>
</template>

<script>
export default {
  props: ['auth'],
  data () {
    if (this.auth.userProfile) {
      this.$nextTick(() => {
        this.profile = this.auth.userProfile
      })
    } else {
      this.auth.getProfile((err, profile) => {
        if (err) return console.log(err)
        this.profile = profile
      })
    }
    return {
      profile: {}
    }
  }
}
</script>

<style>
  .profile-area img {
    max-width: 150px;
    margin-bottom: 20px;
  }
  .panel-body h3 {
    margin-top: 0;
  }
</style>
