/* eslint-disable no-undef */
describe('taskIsDoneTrue', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolists-task--task-is-done-true-story&viewMode=story',                        
            { waitUntil: "networkidle2" });

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('taskIsDoneFalse', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolists-task--task-is-done-false-story&viewMode=story',                        
            { waitUntil: "networkidle2" });

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});