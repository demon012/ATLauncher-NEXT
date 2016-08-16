import {expect} from 'chai';
import {Application} from 'spectron';
import electronPath from 'electron-prebuilt';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
    this.timeout(5000);

    before(async() => {
        this.app = new Application({
            path: electronPath,
            cwd: './app',
            args: ['.']
        });

        return this.app.start();
    });

    after(() => {
        if (this.app && this.app.isRunning()) {
            return this.app.stop();
        }
    });

    it('should open window', async() => {
        const {client, browserWindow} = this.app;

        await client.waitUntilWindowLoaded();
        await delay(500);

        const output = await browserWindow.getTitle();
        const expectedOutput = 'ATLauncher NEXT';

        expect(output).to.equal(expectedOutput);
    });

    it('should display HELLO, WORLD!', async() => {
        const {client} = this.app;

        const output = await client.getText('.home-page');
        const expectedOutput = 'HELLO, WORLD!';

        expect(output).to.equal(expectedOutput);
    });
});