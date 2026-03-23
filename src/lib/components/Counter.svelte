<script lang="ts">
  let count = $state(0)
  const increment = () => {
    count += 1
  }
</script>

<button class="counter-btn" onclick={increment}>
  count is {count}
</button>

<style>
    .counter-btn {
        background: #1e66f5;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 0.6rem 1.5rem;
        font-size: 1rem;
        transition: background 0.15s;
    }

    .counter-btn:hover {
        background: #1753c7;
    }
</style>
