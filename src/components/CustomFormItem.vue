<template>
    <a-col
            :style="{height: height}"
            class="wrapper"
            :span="span"
            :offset="offset"
    >
        <a-form-item
                class="form-item"
                :label="label"
                :label-width="computedLabelWidth"
                :required="required"
        >
            <template v-if="Object.keys(children).length === 0">
                <validation-provider
                        v-slot="{ errors }"
                        :name="label"
                        :rules="rule"
                >
                    <a-input
                            v-if="type === 'input'"
                            :value="value"
                            :placeholder="placeholder"
                            @input="handleValueChange"
                            @change="handleValueChange"
                    />
                    <a-select
                            v-if="type === 'select'"
                            :value="value"
                            @input="handleValueChange"
                            @change="handleValueChange"
                    >
                        <options
                                v-for="(item, index) in option"
                                :key="index"
                                :value="item"
                        />
                    </a-select>
                </validation-provider>
            </template>
            <template v-else>
                <custom-form-item
                        v-for="(item, index) of children"
                        :key="index"
                        v-bind="item"
                        @update:value="val => item.value=val"
                />
            </template>
        </a-form-item>
    </a-col>
</template>

<script>
    import { ValidationProvider, extend } from 'vee-validate';
    import * as rules from 'vee-validate/dist/rules';
    import { messages } from 'vee-validate/dist/locale/zh_CN.json';

    Object.keys(rules).forEach(rule => {
        extend(rule, {
            ...rules[rule], // copies rule configuration
            message: messages[rule]
        });
    });
    export default {
        name: "CustomFormItem",
        props: {
            value: [String, Number],
            placeholder: [String, Number],
            height: {
                type: String,
                default: '60px'
            },
            span: {
                type: Number,
                default: 20
            },
            labelWidth: {
                type: String,
                default: '120px'
            },
            offset: {
                type: Number,
                default: 2
            },
            label: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'input'
            },
            option: {
                type: Array,
                default: () => []
            },
            children: {
                type: Object,
                default: () => ({})
            },
            required: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            computedLabelWidth () {
                if (this.label === '') {
                    return '0px'
                } else {
                    return this.labelWidth
                }
            }
        },
        methods: {
            handleValueChange (val) {
                this.$emit("update:value", val)
            }
        }
    }
</script>
