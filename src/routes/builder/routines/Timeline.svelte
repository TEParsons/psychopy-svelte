<script>
    export let ticks;
</script>

<div class=comp-name></div>
<div class=comp-overshoot-timeline></div>
<div class=comp-timeline style="grid-template-columns: repeat({ticks ? ticks.labels.length : 0}, 1fr) {ticks.remainder}fr;">
    {#each ticks.labels as tick}
    <div class=comp-timeline-tick id=timeline-label-{tick.label}>
        <label for=timeline-labels>{tick.label}s</label>
    </div>
    {/each}
    <div class=comp-timeline-tick id=timeline-label-remainder></div>
</div>
<div class=comp-overshoot-timeline></div>

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
    .comp-timeline-tick label {
        padding-right: .5rem;
    }
    .comp-timeline-tick:last-child {
        border-right: 0;
    }

    .comp-overshoot-timeline {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .comp-timeline {
        align-content: end;
    }
    .comp-timeline-tick {
        overflow-x: hidden;
    }
</style>