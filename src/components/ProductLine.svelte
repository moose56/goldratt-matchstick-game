<script>
  import Node from "./Node.svelte"
  import Actor from "./Actor.svelte"

  export let actors = [];
  export let supply = 0;
</script>

<div class="product-line">
  <div class="line"></div>
  <div class="items">
    <ol>
      <li>
        <Node value="Start"/>
      </li>
      {#each actors as a, i}
        <li>
          <Actor
              title="Station {i+1}"
              capacity="{a.capacity}"
              requestHistory="{a.requestHistory}"
              shipHistory="{a.shipHistory}"
          />
        </li>
      {/each}
      <li>
        <Node value="{supply}"/>
      </li>
    </ol>
  </div>
</div>


<style>
  .product-line {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .line {
    background: #c7c7c7;
    height: 10px;
    grid-column: 1;
    grid-row: 1 / 2;
    align-self: center;
  }

  .items {
    grid-column: 1;
    grid-row: 1 / 2;
    z-index: 10;
    align-self: center;
  }

  ol {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
