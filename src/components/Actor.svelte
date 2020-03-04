<script>
  export let title = 0;
  export let capacity = 0;
  export let requestHistory = [];
  export let shipHistory = [];

  $: averageRequest = (requestHistory.reduce((a,b) => a + b, 0) / requestHistory.length) || 0;
  $: roundedAverageRequest = Math.round((averageRequest + Number.EPSILON) * 100) / 100;

  $: averageShipped = (shipHistory.reduce((a,b) => a + b, 0) / shipHistory.length) || 0;
  $: roundedAverageShipped = Math.round((averageShipped + Number.EPSILON) * 100) / 100;
</script>


<table>
  <thead>
  <tr>
    <th colspan="2">{title}</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td colspan="2" class="requested">{capacity}</td>
  </tr>
  <tr>
    <td class="average">{roundedAverageRequest}</td>
    <td class="status">{roundedAverageShipped}</td>
  </tr>
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    background: #fff;
  }

  th, td {
    border: 1px solid #c7c7c7;
    text-align: center;
    padding: 5px 2px;
  }

  th {
    padding: 0;
    background: #ebebeb;
    font-weight: lighter;
    font-size: small;
    color: #c7c7c7;
  }

  td.average, td.status {
    width: 50px;
    font-size: smaller;
  }
</style>
