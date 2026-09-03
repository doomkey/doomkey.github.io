<script>
	import Contact from '$lib/components/fragments/home/Contact.svelte';
	import Hero from '$lib/components/fragments/home/Hero.svelte';
	import Projects from '$lib/components/fragments/home/Projects.svelte';
</script>

<main>
    <!-- <div class="marquee-wrap">
      <div class="marquee-track">
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
        <span>SCAAAAALE</span>
      </div>
    </div> -->
	<Hero />
	<Projects />
	<Contact />
</main>


<style>
    .marquee-wrap {
      overflow: hidden;
      transform: rotate(-45deg); /* your angle */
      transform-origin: center;
      width: 150%; /* oversize so rotation doesn't clip edges */
    }

    .marquee-track {
      display: flex;
      white-space: nowrap;
      width: max-content;
      animation: scroll-left 8s linear infinite;
    }

    .marquee-track span {
      font-size: 6rem;
      font-weight: 900;
      padding-right: 2rem;
    }

    @keyframes scroll-left {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); } /* -50% if content is duplicated once */
    }
</style>
