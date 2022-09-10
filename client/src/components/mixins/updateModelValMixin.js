export const updateModelValMixin = {
    props: ['modelValue'],
    methods: {
        updateModelValue(val) {
            this.$emit('update:modelValue', val);
        }
    }
}