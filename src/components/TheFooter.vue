<template>
  <footer>
    <div class="container">
      <h2>
        made by
        <a href="https://github.com/thatverygeorge" target="_blank" rel="noopener noreferrer">
          @thatverygeorge
        </a>
      </h2>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--green);
}

.container {
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

footer h2 {
  text-align: end;
  font-size: 2rem;
  color: var(--white);
}

footer a {
  color: currentColor;
}
</style>
