<script>
    import { experiment } from '../globals';
    import { updateHistory } from '../history.js';
    import { ParamsNotebook } from "$lib/utils/paramCtrls";
    import { Button } from '$lib/utils/buttons';

    export let component;

    let notebook;
    
    function discardChanges(evt) {
        // reset temp params from component to discard any live changes
        notebook.discardChanges(evt)
    }

    function applyChanges(evt) {
        // update history
        updateHistory();
        // apply temporary params to component
        notebook.applyChanges(evt)
        // refresh
        experiment.set($experiment)
    }
</script>

<div class=standalone-routine-canvas>
    <ParamsNotebook 
        bind:this={notebook}
        element={component}
    ></ParamsNotebook>
    <Button
        label=Apply
        horizontal
        onclick={applyChanges} 
    ></Button>
</div>