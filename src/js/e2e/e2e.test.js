import puppeteer from "puppeteer";
import { fork } from "child_process";
// const { fork } = require("child_process");
// jest.setTimeout(60000);

describe("test popover", () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = "http://localhost:8082";

  beforeAll(async () => {
    // server = fork("src/js/e2e/e2e.server.js");
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch(
      {
        headless: false, // show gui
        slowMo: 1000,
        args: ["--no-sandbox"],
        // devtools: true, // show devTools
      },
      1000
    );
    page = await browser.newPage();
  }, 35000);

  afterAll(async () => {
    await browser.close();
    server.kill();
    server = null;
    page = null;
    browser = null;
  });

  test("click on button", async () => {
    await page.goto(baseUrl);
    const btn = await page.$("#btn-2");
    await btn.click();
    await page.waitForSelector(".popover");
  }, 35000);

  test("two click on button", async () => {
    await page.goto(baseUrl);
    const btn = await page.$("#btn-1");
    await btn.click();
    await btn.click();
    await page.waitForSelector(".popover.hidden");
  }, 35000);
});
