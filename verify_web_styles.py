from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Home Page
    print("Navigating to Home...")
    page.goto("http://localhost:5174/")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="/home/jules/verification/home.png")
    print("Screenshot saved to /home/jules/verification/home.png")

    # Login Page
    print("Navigating to Login...")
    page.goto("http://localhost:5174/login")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="/home/jules/verification/login.png")
    print("Screenshot saved to /home/jules/verification/login.png")

    # Register Page
    print("Navigating to Register...")
    page.goto("http://localhost:5174/register")
    page.wait_for_load_state("networkidle")
    page.screenshot(path="/home/jules/verification/register.png")
    print("Screenshot saved to /home/jules/verification/register.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
