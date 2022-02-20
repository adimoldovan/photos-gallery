<script>
	import { Icon } from 'svelte-awesome';
	import { longArrowUp, longArrowDown } from 'svelte-awesome/icons';

	export let title;
	export let photoIds;
	export let sort = {
		by: '',
		direction: '',
	};

	import { photos } from '../../public/portfolio.json';

	const sizes = ['url_k', 'url_h', 'url_l', 'url_c', 'url_z'];

	const sortOptions = [
		{
			text: 'date taken',
			data: 'datetaken',
		},
		{
			text: 'upload date',
			data: 'dateupload',
		},
	];

	function getPhotoSource(photoId, sizeLabel, fixSize = true) {
		const photo = photos.filter(photo => photo.id === photoId)[0];

		if (!fixSize && !photo[sizeLabel]) {
			for (const size of sizes) {
				const photo = photos.filter(photo => photo.id === photoId)[0];
				if (photo[size]) {
					return photo[size];
				}
			}
		}

		return photo[sizeLabel];
	}

	function getNextPhotoId(photoId) {
		const currentIdx = photoIds.indexOf(photoId);

		if (currentIdx === photoIds.length - 1) {
			return photoIds[0];
		}
		return photoIds[currentIdx + 1];
	}

	function getPreviousPhotoId(photoId) {
		const currentIdx = photoIds.indexOf(photoId);

		if (currentIdx === 0) {
			return photoIds[photoIds.length - 1];
		}
		return photoIds[currentIdx - 1];
	}

	document.addEventListener('keydown', function (event) {
		if (!location.hash.startsWith('#lightbox')) {
			return;
		}

		const keyMap = [
			{
				key: 'ArrowRight',
				selector: 'next',
			},
			{
				key: 'ArrowLeft',
				selector: 'prev',
			},
			{
				key: 'Escape',
				selector: 'close',
			},
		];

		for (const keyEntry of keyMap) {
			if (event.key === keyEntry.key) {
				const targetElement = document.querySelector(`${location.hash} > a.${keyEntry.selector}`);
				targetElement.click();
			}
		}
	});

	function sortPhotos(by, direction) {
		const filteredPhotos = photos.filter(photo => photoIds.includes(photo.id));

		let sortedPhotos = filteredPhotos.sort((a, b) => (a[by] > b[by] ? 1 : b[by] > a[by] ? -1 : 0));

		if (direction === 'desc') {
			sortedPhotos = sortedPhotos.reverse();
		}

		photoIds = sortedPhotos.map(p => p.id);

		sort.by = by;
		sort.direction = direction;
	}

	function updateSort(by) {
		if (sort.by !== by) {
			sortPhotos(by, 'desc');
		} else {
			if (sort.direction === 'desc') {
				sortPhotos(by, 'asc');
			} else {
				sortPhotos(by, 'desc');
			}
		}
	}

	updateSort('dateupload');
</script>

<style>
	.gallery-image:hover {
		transform: scale(1.1);
		transition: transform 3s ease;
	}

	.lightbox {
		display: none;
		position: fixed;
		z-index: 9999;
		width: 100%;
		height: 100%;
		left: 0;
		color: var(--font-color);
		transition: opacity 0.5s ease-in-out;
		background-color: var(--bg-color);
		text-align: center;
	}

	.lightbox:target {
		display: block;
		top: 0;
	}

	.lightbox img {
		position: fixed;
		padding: 0;
		max-height: 90%;
		max-width: 90%;
		top: 50%;
		left: 50%;
		margin: 0 -50% 0 0;
		transform: translate(-50%, -50%);
	}

	a.slideshow-nav {
		color: var(--font-color);
		z-index: 999999;
		text-decoration: none;
		position: fixed;
		font-size: 36px;
		border-radius: 12px;
		padding: 5px 10px 5px 10px;
		background-color: var(--bg-color);
		opacity: 70%;
	}

	a.slideshow-nav:hover {
		opacity: 100%;
	}

	a.close {
		font-size: 24px;
		top: 1%;
		right: 1%;
		padding: 4px 12px 4px 12px;
	}

	a.prev,
	a.next {
		top: 50%;
		transform: translate(0%, -50%);
	}

	a.prev {
		left: 5.2%;
	}

	a.next {
		right: 5.2%;
	}

	#sort-buttons {
		text-align: right;
	}

	.sort-btn {
		color: var(--font-color);
		padding: 4px 10px 14px 10px;
		border: 0;
		margin-bottom: 10px;
		background-color: transparent;
		text-transform: uppercase;
	}

	:global(.active) {
		font-weight: bold;
		font-size: 1rem;
	}
</style>

<h1 class="page-title">
	{title}
</h1>
<div class="page-subtitle">{photoIds.length} photos</div>

<div id="sort-buttons">
	{#each sortOptions as option}
		<button
			id={option.data}
			class="sort-btn"
			class:active={sort.by === option.data}
			on:click={() => updateSort(option.data)}>{option.text}</button
		>
	{/each}
	{#if sort.direction === 'desc'}
		<Icon style="vertical-align: middle;" data={longArrowDown} />
	{:else if sort.direction === 'asc'}
		<Icon style="vertical-align: middle;" data={longArrowUp} />
	{/if}
</div>
<div id="gallery" class="gallery">
	{#each photoIds as photoId}
		<a class="gallery-item" href="#lightbox-{photoId}">
			<img class="gallery-image" src={getPhotoSource(photoId, 'url_z')} alt="" loading="lazy" />
		</a>
		<div class="lightbox" id="lightbox-{photoId}">
			<img src={getPhotoSource(photoId, 'url_k', false)} alt="" />
			<a class="slideshow-nav next" href="#lightbox-{getNextPhotoId(photoId)}">&#8594;</a>
			<a class="slideshow-nav close" href={'#'}>X</a>
			<a class="slideshow-nav prev" href="#lightbox-{getPreviousPhotoId(photoId)}">&#8592;</a>
		</div>
	{/each}
</div>
