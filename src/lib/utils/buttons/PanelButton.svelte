<script>
    import { theme } from "$lib/globals.svelte.js";
    import Tooltip from "$lib/utils/tooltip/Tooltip.svelte";

    let {
        /** @prop @type {string} Label for this button */
        label,
        /** @prop @type {string|undefined} Hover text for this button, if any */
        tooltip=undefined,
        /** @interface */
        children
    } = $props()

    /** @state @type {boolean} Whether this panel is open */
    let open = $state(false)
</script>

<button
    class=panel-button
    class:active={open}
    onclick={() => open = !open}
>
    {#if tooltip}
    <Tooltip>
        {tooltip}
    </Tooltip>
    {/if}
    {label}
    {#if open}
    <img 
        class="panel-indicator open"
        src="/icons/{theme}/sym-arrow-down.svg"
        alt="^"
    />
    {:else}
    <img 
        class="panel-indicator closed"
        src="/icons/{theme}/sym-arrow-right.svg"
        alt="v"
    />
    {/if}
</button>
{#if open}
<div 
    class="toggled-panel"
>
    {@render children()}
</div>
{/if}

<style>
    button {
        position: relative;
        width: 100%;
        background: linear-gradient(transparent 0%, transparent 75%, rgba(0, 0, 0, 0.025) 100%);
        margin: .5rem 0;
        margin-bottom: .5rem;
        outline: none;
        border: none;
        padding: .5rem;
        border-bottom: 1px solid var(--overlay);
        transition: border-color .2s, background .2s;
    }
    button:hover {
        border-color: var(--blue);
        background: linear-gradient(transparent 0%, transparent 75%, rgba(0, 0, 0, 0.05) 100%);
    }
    .panel-indicator {
        position: absolute;
        left: 1rem;
        bottom: 1rem;
    }
    .panel-indicator.open {
        height: .5rem;
    }
    .panel-indicator.closed {
        width: .5rem;
    }
</style>