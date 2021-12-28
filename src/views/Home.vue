<template>
  <div class="home">
    <div class="w-1/2 pt-20 mx-auto space-y-4 text-left">
      <p class="text-lg font-semibold">Hi, hello! Welcome!</p>
      <p>This project is still very much under development.</p>
      <p>
        If I've sent you credentials, you can
        <router-link :to="{ name: 'Login' }" class="font-semibold">log in</router-link>, create projects, and play
        around. Be advised there will very likely be breaking changes on a regular basis until an official launch.
      </p>
      <p>
        You can also take a look at
        <router-link to="/users/eras/" class="font-semibold">my example projects</router-link>
        which are public.
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
