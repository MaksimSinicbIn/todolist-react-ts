import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"

const preview: Preview = {
    parameters: {
        docs: {
            theme: themes.dark
        },
        backgrounds: {
            values: [
                { name: 'Dark', value: '#333' },
                { name: 'Light', value: '#F7F9F2' },
                { name: 'Maroon', value: '#400' },
            ],
            default: 'Dark',
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
