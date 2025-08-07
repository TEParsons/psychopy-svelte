<script>
    import { slide } from 'svelte/transition';
    import Tooltip from '../tooltip/Tooltip.svelte';

    let {
        /** @prop @type {string} Text label for this button, if any */
        label="",
        /** @prop @type {string} Icon for this button, if any */
        icon=undefined,
        /** @prop @type {function} Function to call when this button is clicked */
        onclick=(evt) => {},
        /** @prop @type {boolean} Disable this button */
        disabled=false
    } = $props()

    let showTooltip = $state(false)
</script>       

<button
    disabled={disabled} 
    onclick={onclick}
    onmouseenter={() => {showTooltip = true}}
    onmouseleave={() => {showTooltip = false}}
    onfocusin={() => {showTooltip = true}}
    onfocusout={() => {showTooltip = false}}
>
    <img src={icon} alt={label} />
    <Tooltip
        bind:shown={showTooltip}
        position="bottom"
    >
        {label}
    </Tooltip>
</button>


<style>
    button {
        position: relative;
        background-color: transparent;
        padding: 0.25rem;
        margin: 0;
        grid-row-start: buttons;
        outline: none;
        border: 1px solid transparent;
        border-radius: .5rem;
        transition: border-color .2s, box-shadow .2s;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: .2rem;
        z-index: 1;
    }
    button:disabled {
        opacity: .5;
    }
    button:enabled:hover,
    button:enabled:focus {
        border-color: var(--overlay);
        box-shadow: 
            inset 1px 1px 10px rgba(0, 0, 0, 0.05)
        ;
    }
    button:enabled:focus {
        border-color: var(--blue);
    }

    button img {
        height: 2.25rem;
    }

</style>
