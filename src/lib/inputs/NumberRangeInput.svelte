<script lang="ts">
    let {
        label,
        value = $bindable(),
        min = 0,
        max = 100,
        step = 1,
        unit = ''
    }: {
        label: string
        value: number
        min?: number
        max?: number
        step?: number
        unit?: string
    } = $props()
</script>

<label class="input-group">
	<span class="label-text">{label}</span>
	<div class="control-row">
		<div class="number-wrap">
			<input type=number bind:value {min} {max} {step}>
			<span class="unit">{unit}</span>
		</div>
		<input type=range bind:value {min} {max} {step}>
	</div>
</label>

<style>
	.input-group {
		display: block;
		margin-bottom: 0.6rem;
	}

	.label-text {
		display: block;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #6c7086;
		margin-bottom: 0.25rem;
	}

	.control-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: #1e1e2e;
		border: 1px solid #45475a;
		border-radius: 6px;
		padding: 0.35rem 0.6rem;
		transition: border-color 0.15s;
		max-width: 22rem;
	}

	.control-row:focus-within {
		border-color: #1e66f5;
	}

	.number-wrap {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		flex-shrink: 0;
	}

	.number-wrap :global(input[type="number"]) {
		border: none;
		background: transparent;
		padding: 0;
		width: 7rem;
	}

	.number-wrap :global(input[type="number"]:focus) {
		outline: none;
		border: none;
	}

	.unit {
		color: #6c7086;
		font-size: 0.8rem;
		width: 1.2rem;
		text-align: center;
		flex-shrink: 0;
	}

	.control-row :global(input[type="range"]) {
		flex: 1;
		min-width: 0;
	}
</style>
