<script lang="ts">

</script>

<template>
    <div id="modal">
        <div id="popup">
            <div id="header">
                <slot name="header"></slot>
            </div>
            <div id="body">
                <slot name="body"></slot>
            </div>
            <div id="footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<style>
    #modal {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.288);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #popup {
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        width: var(--width, 50%);
        height: var(--height, 80%);
        border: 1px inset rgb(255, 187, 0);
        box-shadow: 2px 2px 5px black;
    }
    #footer {
        width: 100%;
        height: var(--footer-height, 15%);
    }
    #header {
        width: 100%;
        height: var(--header-height, 10%)
    }
    #body {
        width: 100%;
        height: var(--body-height, 74%)
    }
</style>