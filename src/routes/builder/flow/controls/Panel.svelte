<script>
    import AddRoutineButton from './AddRoutine.svelte';
    import AddLoopButton from './AddLoop.svelte';
</script>

<div class=flow-buttons>
    <AddRoutineButton></AddRoutineButton>
    <AddLoopButton></AddLoopButton>
</div>

<style>
    .flow-buttons {
        padding: 1rem;
        display: grid;
        grid-auto-flow: row;
        grid-gap: .5rem;
        align-items: start;
        align-content: start;
    }
    
</style>