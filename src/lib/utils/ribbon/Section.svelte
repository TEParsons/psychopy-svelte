<script>
    let {
        /** @prop @type {string} Label for this section */
        label="",
        /** @prop @type {string|undefined} Icon for this section, if any */
        icon=undefined,
        /** @interface */
        children
    } = $props()
    
</script>

<div
    class=ribbon-section
>
    {@render children()}
    <div
        class=ribbon-section-label
    >
        {#if icon}
            <img alt={label} src={icon} />
        {:else}
            <div></div>
        {/if}
        {label}
    </div>
</div>

<style>
    .ribbon-section {
        display: grid;
        position: relative;
        grid-auto-flow: column;
        grid-template-rows: [top] 1fr [divide] 1rem [bottom];
        justify-items: center;
        justify-content: center;
        align-items: center;
        gap: .5rem 0;
        padding: 0 1rem;
    }
    .ribbon-section>:global(*):not(.ribbon-section-label) {
        grid-row-start: top;
    }
    .ribbon-section-label {
        display: grid;
        grid-template-columns: [icon] 1rem [label] min-content;
        gap: .5rem;
        align-items: center;
        position: absolute;
        bottom: 0;
    }
    .ribbon-section:not(:first-child) {
        border-left: 1px solid var(--overlay)
    }
</style>