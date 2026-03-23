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

<p>
	<label>
		{label}
		<input type=number bind:value {min} {max} {step}>{#if unit} {unit}{/if}
		<input type=range bind:value {min} {max} {step}>
	</label>
</p>
