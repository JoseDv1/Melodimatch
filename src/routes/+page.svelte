<script>
	import { onMount } from 'svelte';
	import { auth } from '../supabase/auth.js';

	onMount(async () => {
		const { data, error } = await auth.getSession();
		const { session } = data;

		if (!session) {
			window.location.href = '/access';
		}

		if (session) {
			window.location.href = '/feed';
		}
	});
</script>

<div class="home">
	<h1>Melodymatch</h1>
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.home h1 {
		font-size: 3.5rem;
	}
</style>
