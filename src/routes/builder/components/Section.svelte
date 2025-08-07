<script>
    import PanelButton from '$lib/utils/buttons/PanelButton.svelte';

    let {
        /** @prop @type {String} Label for this section */
        label,
        /** @interface */
        children=undefined
    } = $props()

</script>

<PanelButton
    label={label}
>
    <div class=component-section-buttons>
        {@render children?.()}
    </div>
</PanelButton>

<style>
    .component-section-buttons {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        gap: .5rem;
    }
</style>