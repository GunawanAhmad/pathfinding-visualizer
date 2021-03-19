<template>
  <footer class="container">
    <div class="personal-web sign"></div>
    <div class="twitter sign">
      <a href="https://twitter.com/Gunawan10x">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
    <div class="github sign">
      <a href="https://github.com/GunawanAhmad/pathfinding-visualizer-dev">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <div class="website sign">
      <a href="https://gunawanahmad.github.io/">
        <i class="fas fa-globe"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  font-size: 2rem;
  opacity: 0.6;

  .twitter a:hover:before {
    opacity: 1;
    transition: opacity 250ms ease;
  }
  .github a:hover:before {
    opacity: 1;
    transition: opacity 250ms ease;
  }

  .website a:hover:before {
    opacity: 1;
    transition: opacity 250ms ease;
  }

  .twitter a::before {
    opacity: 0;
    content: "Twitter";
    position: absolute;
    font-size: 0.8rem;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #313131;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 5px;
  }

  .github a::before {
    opacity: 0;
    content: "Github";
    position: absolute;
    font-size: 0.8rem;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #313131;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 5px;
  }

  .website a::before {
    opacity: 0;
    content: "Personal Web";
    text-align: center;
    position: absolute;
    font-size: 0.8rem;
    top: -50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #313131;
    color: white;
    padding: 0.2rem 1rem;
    border-radius: 5px;
  }

  .sign {
    margin-right: 2rem;

    a {
      color: #313131;
      position: relative;
    }
  }
}
</style>
