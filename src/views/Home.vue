<template>
  <div class="home">
    <div class="w-1/2 pt-20 mx-auto space-y-4 text-left">
      <p class="text-lg font-semibold">Hi, hello! Welcome!</p>
      <p>This project is still very much under development.</p>
      <p>
        Get in touch to request demo credentials if you would like to
        <router-link :to="{ name: 'Login' }" class="font-semibold">log in</router-link>, create projects, add/edit
        features, and play around with what I've got so far.
      </p>
      <p>
        You can also take a look at
        <router-link to="/users/eras/" class="font-semibold">my example project</router-link>
        which is public.
      </p>
      <p>
        I appreciate feedback, you can reach me at
        <a class="font-extrabold" href="mailto:hello@ericasmith.dev"> hello@ericasmith.dev</a>.
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>
