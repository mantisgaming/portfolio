<script lang="ts">
	import ShowcaseEmbed from '$lib/components/ShowcaseEmbed.svelte';
	import PersonalCard from '$lib/components/personalCard.svelte';
	import TagList from '$lib/components/tagList.svelte';
</script>

<svelte:head>
	<title>Max Allen | About</title>
</svelte:head>

<section>
	<PersonalCard />
</section>

<section>
	<h2>Skills</h2>
	<TagList
		tags={[
			{
				color: '#0063bf',
				label: 'iOS'
			},
			{
				color: '#0063bf',
				label: 'Android'
			},
			{
				color: '#0063bf',
				label: 'Web'
			},
			{
				color: '#0063bf',
				label: 'PC'
			},
			{
				color: '#0063bf',
				label: 'Mac'
			},
			{
				color: '#bf2d00',
				label: 'Unity (C#)'
			},
			{
				color: '#bf2d00',
				label: 'Godot (GDScript)'
			},
			{
				color: '#bf2d00',
				label: 'Unreal (C++/Blueprints)'
			},
			{
				color: '#bf2d00',
				label: 'Svelte (Typescript)'
			},
			{
				color: '#bf2d00',
				label: 'Cloudflare (Pages/Workers)'
			},
			{
				color: '#bf2d00',
				label: 'NodeJS'
			},
			{
				color: '#bf2d00',
				label: 'SFML (2D Graphics)'
			},
			{
				color: '#bf2d00',
				label: 'WebGL/OpenGL (3D Graphics)'
			},
			{
				color: '#bf2d00',
				label: 'C++'
			},
			{
				color: '#bf2d00',
				label: 'SCSS'
			},
			{
				color: '#a32ec7',
				label: 'Network Multiplayer'
			},
			{
				color: '#a32ec7',
				label: 'Websockets'
			},
			{
				color: '#a32ec7',
				label: 'Latency Compensation'
			},
			{
				color: '#a32ec7',
				label: 'Procedural Generation'
			},
			{
				color: '#a32ec7',
				label: 'Monetization (ads)'
			},
			{
				color: '#a32ec7',
				label: 'Custom Game Engine'
			},
			{
				color: '#a32ec7',
				label: 'Data Driven Design'
			}
		]}
	/>
</section>

<section>
	<h2>Early History</h2>
	<p>
		In 2009, when I was 8 years old, my parents bought me a Cubloc Programmable Logic Controller
		(PLC) kit. The kit was a simple home security system with a speaker, a keypad, a simple display,
		and some magnetic reed switches. The goal was to create a system that would alarm if a door was
		opened and a code was not entered within a set time period. While I did not complete this
		project, it introduced me to my first programming language, BASIC, and I enjoyed creating simple
		music with the speaker.
	</p>
	<p>
		Around 2010, Minecraft modding had inspired me to try programming in Java. I created a simple
		racing game using Java Swing. It had a rectangular track and a rectangular car that could be
		controlled by the user's keyboard. It was nothing special, but it was my first game.
	</p>
	<p>
		In 2014 (at 13 years old) I discovered Unity. It was overwhelming, but I was figuring it out. I
		went to an ID Tech summer camp to learn more about Unity. I ended up creating a simple "find the
		items" game where you had to walk around a terrain to find items that had been placed in the
		world. The following years I continued to go to ID Tech camps to learn about game development.
		One year (around 2017) I did a camp about writing a game engine and wrote a C++ OpenGL renderer.
	</p>
	<p>
		From there I did game jams, took game development and related courses in high school, and
		completed my Bachelor of Science with a double major in "Computer Science" and "Interactive
		Media and Game Development".
	</p>
</section>

<ShowcaseEmbed src="/projects/computer-graphics-animation/graphics-2/index.html" />
<ShowcaseEmbed src="/projects/computer-graphics-animation/graphics-3/index.html" height={762} />
<ShowcaseEmbed src="/projects/computer-graphics-animation/animation/final-project.html" />
