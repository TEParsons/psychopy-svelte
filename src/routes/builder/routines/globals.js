import { writable } from 'svelte/store';


export var dragging = writable(null)
export var currentPage = writable(undefined)
export var hoveredComponent = writable(null)
