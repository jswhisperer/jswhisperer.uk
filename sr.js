const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for visible browser
  const page = await browser.newPage();

  // Set viewport to 1920x1080
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate to the desired page
  await page.goto("https://jswhisperer.uk"); // Replace with your desired URL

  // Take a screenshot
  const screenshotPath = "example.png";
  await page.screenshot({ path: screenshotPath });

  // Open the screenshot in a new tab
  //   const newPage = await browser.newPage();
  //   await newPage.goto(`file://${screenshotPath}`);

  await browser.close();
})();
