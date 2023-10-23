import { browser } from 'k6/experimental/browser';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'constant-vus',
              vus: 2,
              duration: "30s",
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"]
  }
}

export default async function () {

  const page = browser.newPage();

  try {
    await page.goto('https://liamseprod.wpenginepowered.com/wp-login.php');
    sleep(5);


    page.locator('input[name="log"]').type('k6-user');
    page.locator('input[name="pwd"]').type('Az(y89f$FJqY$^RK9Vsba5iX');
    page.screenshot({ path: 'screenshots/wp-admin.png' });

    sleep(5);


    const submitButton = page.locator('//*[@id="wp-submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    sleep(5);


    page.screenshot({ path: 'screenshots/logged-in-wp-admin.png' });
    sleep(5);


  } finally {
    page.close();

  }
  sleep(1);
}