<script>
    import { theme } from "$lib/globals.svelte.js";
    import { dragging, hoveredComponent } from './globals.js';
    import { current, actions } from "../globals.svelte.js";
    import EntryPoint from './EntryPoint.svelte';
    import Dialog from "../../dialogs/component/Dialog.svelte";
    import Menu from '$lib/utils/menu/Menu.svelte';
    import MenuItem from '$lib/utils/menu/Item.svelte';
    import { getContext } from "svelte";

    let {
        component,
        ticks
    } = $props()

    let routine = component.routine;

    let showContextMenu = $state(false);
    let contextMenuPos = $state({
        x: undefined,
        y: undefined
    });

    function oncontextmenu(evt) {
        evt.preventDefault();
        // show menu
        showContextMenu = true;
        // set its position to the mouse pos
        contextMenuPos.x = evt.pageX;
        contextMenuPos.y = evt.pageY;
    }

    let showDialog = $state(false);

    function removeComponent() {
        // update history
        actions.update();
        // remove from Routine
        routine.removeComponent(component);
    }
</script>

<!-- entry point for this component -->
<EntryPoint routine={routine} index={component.index}></EntryPoint>

<!-- icon & name -->
<label 
    class=comp-name 
    for={component.params['name'].val} 
    style="opacity: {component.disabled ? 0.3 : 1}"
    draggable="true" 
    ondragstart={() => dragging.set(component.index)} 
    ondragend={() => dragging.set(null)} 
    onclick={() => {showDialog = true}}
    onmouseenter={() => hoveredComponent.set(component.name)}
    onmouseleave={() => hoveredComponent.set(null)}
    role="none"
    oncontextmenu={oncontextmenu}
>    
    {component.name}
    <img 
        src="/icons/{theme}/components/{component.tag}.svg" 
        alt="" 
    />
</label>

<!-- bars representing this on the timeline -->

<div class=comp-overshoot-timeline>
{#if component.visualStart === null}
    <div 
        class=comp-overshoot-bar
        style="background:linear-gradient(-90deg, var(--{component.visualColor}), var(--base));"
    ></div>
{/if}
</div>

<div 
    class=comp-timeline 
    id={component.params['name'].val} 
    style="grid-template-columns: repeat({ticks.labels.length}, 1fr) {ticks.remainder}fr;" 
    draggable={true} 
    onclick={() => {showDialog = true}}
    oncontextmenu={oncontextmenu}
    onmouseenter={() => hoveredComponent.set(component.name)}
    onmouseleave={() => hoveredComponent.set(null)}
    ondragstart={() => dragging.set(component.index)} 
    ondragend={() => dragging.set(null)} 
    role="none"
>
    <div 
        class=comp-timeline-bar 
        style="
        left:{component.visualStart === null ? 0 : component.visualStart * 100 / routine.visualStop}%; 
        right:{component.visualStop === null ? 0 : (routine.visualStop - component.visualStop) * 100 / routine.visualStop}%;
        background-color:var(--{component.visualColor});
        "
    ></div>
    {#each ticks.labels as tick}
    <div class=comp-timeline-tick style="flex-basis: {tick.proportion}"></div>
    {/each}
    <div class=comp-timeline-tick id=timeline-label-remainder></div>
</div>

<div class=comp-overshoot-timeline>
{#if component.visualStop === null}
    <div 
        class=comp-overshoot-bar
        style="background:linear-gradient(90deg, var(--{component.visualColor}), var(--base));"
    ></div>
    {/if}
</div>

<!-- menu to open when right clicked on -->
<Menu 
    bind:shown={showContextMenu} 
    bind:position={contextMenuPos}
>
    <MenuItem 
        icon="/icons/{theme}/btn-delete.svg"
        label="Delete Component"
        onclick={removeComponent}
    />
</Menu>

<!-- dialog to open when clicked on -->
<Dialog 
    component={component} 
    bind:shown={showDialog}
></Dialog>

<style>
    .comp-timeline {
        display: grid;
        position: relative;
        width: 100%;
        grid-column-start: timeline;
    }
    .comp-overshoot-timeline {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .comp-timeline-bar {
        position: absolute;
        top: 25%;
        bottom: 25%;
    }

    .comp-overshoot-bar {
        position: absolute;
        left: 0; right: 0;
        top: 25%;
        bottom: 25%;
    }
    .comp-timeline {
        display: grid;
        position: relative;
        width: 100%;
        grid-column-start: timeline;
    }
    .comp-timeline-tick {
        color: var(--outline);
        border-left: 1px solid var(--overlay);
        width: 100%;
        text-align: right;
    }.comp-timeline-tick:last-child {
        border-right: 1px solid var(--overlay);
    }
    .comp-timeline-tick:last-child {
        border-right: 0;
    }

    .comp-overshoot-timeline {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .comp-name {
        display: grid;
        grid-template-columns: [name] min-content [icon] 3rem;
        grid-gap: 1rem;
        
        align-items: center;
        justify-items: center;
        grid-column-start: name;
        font-size: 1.2rem;
        padding: .5rem;
        justify-self: right;
    }
</style>