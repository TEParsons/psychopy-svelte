<script>
    import Dialog from '$lib/utils/dialog/Dialog.svelte';
    import { ParamsNotebook } from "$lib/utils/paramCtrls";
    import { current, actions } from '../../builder/globals.svelte.js';

    let {
        component,
        shown=$bindable()
    } = $props()

    let notebook;

    function discardChanges(evt) {
        // discard changes to params
        notebook.discardChanges(evt)
    }

    function applyChanges(evt) {
        // update history
        actions.update()
        // apply changes to params
        notebook.applyChanges(evt)
        // if component is newly created, add it to the current Routine
        if (!current.routine.components.includes(component) && component.tag !== "RoutineSettingsComponent") {
            current.routine.addComponent(component)
        }
    }

</script>

<Dialog 
    id="{component.name}-parameters"
    title="Editing: {component.name}"
    bind:shown={shown} 
    buttons={{
        OK: applyChanges, 
        APPLY: applyChanges,
        CANCEL: discardChanges, 
        HELP: component.helpLink,
    }}
>
    <ParamsNotebook bind:this={notebook} element={component}></ParamsNotebook>
</Dialog>