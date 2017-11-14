<template>
  <div>
    <h2>You are a Provider!</h2>
    <p>Only users who have a
    <code>role</code> of <code>provider</code>
    in their <code>id_token</code>
    can see this area.</p>
  </div>
</template>

<script>
  export default {
    props: ['auth']
  }
</script>
