const port = 3000;

describe(`Welcome Page`, () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${port}`);
  });

  it(`"'View' Welcome Page`, async () => {
    const body = await page.evaluate(() => document.body.textContent);
    const resp = { title: "Welcome to credit card validator" };
    expect(body).toContain(JSON.stringify(resp));
  });
});
