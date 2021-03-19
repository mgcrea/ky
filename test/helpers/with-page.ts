// eslint-disable-next-line ava/use-test
import type {ExecutionContext, UntitledMacro} from 'ava';
import {chromium, Page} from 'playwright-chromium';

type Run = (t: ExecutionContext, page: Page) => Promise<void>;

export const withPage: UntitledMacro<any[]> = async (t: ExecutionContext, run: Run): Promise<void> => {
	const browser = await chromium.launch();
	const page = await browser.newPage();
	try {
		await run(t, page);
	} finally {
		await browser.close();
	}
};
