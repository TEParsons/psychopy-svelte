<script>
    import { writable } from 'svelte/store';

    import { Routine, LoopInitiator, LoopTerminator, sortParams, unsortParams } from '$lib/experiment';
    import { updateHistory } from '../../history.js';
    import Menu from '$lib/utils/menu/Menu.svelte';
    import MenuItem from '$lib/utils/menu/Item.svelte';
    import Dialog from '$lib/utils/dialog/Dialog.svelte';

    import { experiment } from '../../globals.js';
    import { inserting } from '../globals.js';
    import { ParamsNotebook } from '$lib/utils/paramCtrls/index.js';
    import { Button } from '$lib/utils/buttons';
    
    let dialog;
    let notebook;
    let menu;
    
    let element = writable(new Routine());

    function insertRoutine(evt) {
        // update history
        updateHistory()
        // apply temporary params to Routine settings
        notebook.applyChanges()
        // add to experiment
        $element.exp = $experiment
        $experiment.routines.set($element.name, $element)
        // prepare to insert the new Routine into the Flow
        inserting.set($element)
    }

    function discardChanges(evt) {
        // reset temp params from component to discard any live changes
        notebook.discardChanges()
    }

</script>

<div
    class=container
>
    <!-- button to open add Routine menu -->
    <Button 
        label="Add Routine"
        icon="/icons/light/btn-routine.svg"
        tooltip="Add a Routine to the experiment flow"
        onclick={() => {
            // open the "add routine" menu
            menu.setOpen(true)
        }}
        horizontal
    ></Button>
    
    <!-- menu for adding a Routine -->
    <Menu 
        bind:this={menu}
    >
        <MenuItem 
            label="New Routine..."
            action={() => {
                // create blank Routine
                element.set(new Routine())
                // show dialog
                dialog.showModal()
            }}
        />
        {#each [...$experiment.routines] as [name, routine]}
        <MenuItem 
            label={name}
            action={() => {
                // set this Routine as the one to insert
                inserting.set(routine)
            }}
        />
        {/each}
    </Menu>
</div>

<!-- dialog for creating a new Routine -->
<Dialog 
    id=new-routine 
    title="New Routine" 
    bind:handle={dialog} 
    buttons={{
        OK: insertRoutine, 
        CANCEL: discardChanges, 
    }}
>
    <ParamsNotebook element={$element.settings} bind:this={notebook} />
</Dialog>

<style>
    .container {
        position: relative;
    }
</style>