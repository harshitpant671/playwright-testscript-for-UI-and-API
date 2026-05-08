import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";


// dotenv.config({ path: path.resolve(__dirname, "../.env") });


export default defineConfig({
  testDir: "./tests",

    timeout: 60 * 1000,

    expect: { timeout: 20 * 1000 },

    outputDir: "./test-results",

    fullyParallel: false,

    workers: 1,

    retries: 0,

    reportSlowTests: null,

    reporter: [
        ["list"],

        [
            "html",
            {
                outputFolder: "./playwright-report",
            },
        ],
    ],

    use: {
        // baseURL: `${process.env.APP_URL}/`.replace(/\/+$/, "/"),
        screenshot: { mode: "only-on-failure", fullPage: true },
        video: "retain-on-failure",
        trace: "retain-on-failure",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
