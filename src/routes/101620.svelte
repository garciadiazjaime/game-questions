<script>
  let step = 0
  let answer = ''
  const config = {
    answer1: 'stone',
    answer2: 'target',
    answer3: ''
  }

  function goToStep1() {
    step = 1
  }

  function goToStep2() {
    answer = ''
    step = 2
  }

  function goToStep3() {
    answer = ''
    step = 3
  }
</script>
<style>
  div {
    color: white;
    font-size: 48px;
  }

  a {
    text-decoration: none;
  }

  .content {
    text-align: center;
    margin: 42px auto;
  }

  .lights-off {
    color: #f8b6c1;
  }

  .reverse-text {
    unicode-bidi: bidi-override;
    direction: rtl;
  }

  .prize {
    color: white;
  }

  input {
    font-size: 42px;
    width: 100%;
    box-sizing: border-box;
    color: #FFB6C1;
  }

  img {
    width: 100%;
    height: auto;
  }
</style>

{#if step === 0 }
  <div class="content">
    Un día como hoy, <br />
    una personita llegó, <br />
    su rostro una sonrisa colgó, <br />
    y el espacio de amor llenó.

    <br /><br /><br />
    <a href="/101620" on:click={goToStep1} class="lights-off">Comenzar</a>
  </div>
{/if}

{#if step === 1}
  <div class="content">
    Al primer reto has llegado, <br />
    lógralo y una recompensa pasará a tu legado.

    <p class="lights-off reverse-text">
      En él las millas pasaron y en ella las cosas guardamos.
    </p>

    <input type="text" bind:value={answer}>
  </div>

  {#if answer === config.answer1}
    <div class="content prize">
      Bien Hecho :D <br />
      Audiobook <br />

      <img src="https://m.media-amazon.com/images/I/51U4p-ir2BL.jpg" alt="">

      <br />
      <a href="/101620" on:click={goToStep2}>Continuar</a>
      
    </div>
  {/if}
{/if}


{#if step === 2}
  <div class="content">
    Al segundo reto has llegado, <br />
    lógralo y una recompensa pasará a tu legado.

    <p class="lights-off">
      Saludaba Aldo a Carlos <br />
      Risas salían y <br />
      Entraban cuando a Dora recordaban. <br /><br />

      Carlos contó cuando en Oaxaca con <br />
      Walter se encontró.
    </p>

    <input type="text" bind:value={answer}>
  </div>

  {#if answer === config.answer2}
    <div class="content prize">
      Bien Hecho :D <br />
      Gift Card <br />

      <img src="https://cdn.viicloud.com.au/Static/CI/ColesGroup/images/product/TA233.png" alt="">

      <br />
      <a href="/101620" on:click={goToStep3}>Continuar</a>
      
    </div>
  {/if}
{/if}

{#if step === 3}
  <div class="content">
    Al último reto has llegado, <br />
    lógralo y una recompensa pasará a tu legado.

    <p class="lights-off">
      Verde soy aunque sabor no doy.
    </p>

  </div>

  {#if answer === config.answer2}
    <div class="content prize">
      Bien Hecho :D <br />
      Gift Card <br />

      <img src="https://cdn.viicloud.com.au/Static/CI/ColesGroup/images/product/TA233.png" alt="">

      <br />
      <a href="/101620" on:click={goToStep3}>Continuar</a>
      
    </div>
  {/if}
{/if}
