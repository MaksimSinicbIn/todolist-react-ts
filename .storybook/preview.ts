import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"

const preview: Preview = {
    parameters: {
        docs: {
            theme: themes.light
        },
        backgrounds: {
            values: [
                { name: 'Dark', value: '#333' },
                { name: 'Light', value: '#FFFFF' },
                { name: 'Gray', value: '#414040' },
            ],
            default: 'Light',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    }
};

export default preview;
