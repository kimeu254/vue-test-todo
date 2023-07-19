<script>
export default {
    name:'card-component',
    props: {
        cardClass: String
    }
}
</script>

<template>
    <div class="card" :class="cardClass">
        <div class="card-container">
            <slot name="body"></slot>
        </div>
    </div>
</template>