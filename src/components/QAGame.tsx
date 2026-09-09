'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBug, FaTrophy, FaRedo, FaLightbulb } from 'react-icons/fa';
import { MdBugReport } from 'react-icons/md';

/* ── Types ─────────────────────────────────────────────────────────────── */
interface Line { code: string; buggy: boolean; hint?: string }
interface Scenario { id: number; title: string; lang: string; emoji: string; lines: Line[] }

/* ── 12 Scenarios across all platforms ─────────────────────────────────── */
const SCENARIOS: Scenario[] = [

  /* ── SELENIUM / WEB ──────────────────────────────────────────────────── */
  {
    id: 0, title: 'Login UI Test', lang: 'Java · Selenium', emoji: '🌐',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'public void testLogin() {', buggy: false },
      { code: '  driver.get("http://app.example.com/login");', buggy: true, hint: '🔐 HTTP should be HTTPS — insecure URL in a test' },
      { code: '  driver.findElement(By.id("email")).sendKeys("user@test.com");', buggy: false },
      { code: '  driver.findElement(By.id("pass")).sendKeys("secret123");', buggy: false },
      { code: '  driver.findElement(By.id("btn-login")).click();', buggy: false },
      { code: '  Thread.sleep(5000); // wait for dashboard', buggy: true, hint: '⏱️ Hard-coded Thread.sleep is flaky — use WebDriverWait instead' },
      { code: '  Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));', buggy: false },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 1, title: 'E-Commerce Checkout', lang: 'Java · Selenium', emoji: '🛒',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'public void testCheckout() {', buggy: false },
      { code: '  homePage.searchProduct("laptop");', buggy: false },
      { code: '  productPage.addToCart();', buggy: false },
      { code: '  cartPage.proceedToCheckout();', buggy: false },
      { code: '  checkoutPage.enterCard("4111111111111111", "12/20", "123");', buggy: true, hint: '💳 Expiry date 12/20 is in the past — test will fail on real validation' },
      { code: '  checkoutPage.placeOrder();', buggy: false },
      { code: '  Assert.assertEquals(driver.getTitle(), "Order Confirmation");', buggy: false },
      { code: '  driver.quit();', buggy: true, hint: '🧹 driver.quit() inside test method — should be in @AfterMethod to run even on failure' },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 2, title: 'Search Page Test', lang: 'Java · Selenium', emoji: '🔍',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'public void testSearchResults() {', buggy: false },
      { code: '  driver.get(BASE_URL);', buggy: false },
      { code: '  WebElement search = driver.findElement(By.name("q"));', buggy: false },
      { code: '  search.sendKeys("milk");', buggy: false },
      { code: '  search.submit();', buggy: false },
      { code: '  List<WebElement> results = driver.findElements(By.className("product-card"));', buggy: false },
      { code: '  Assert.assertEquals(results.size(), 10);', buggy: true, hint: '📊 Asserting exact count 10 is brittle — use Assert.assertTrue(results.size() > 0)' },
      { code: '  Assert.assertTrue(results.get(0).getText().contains("Milk"));', buggy: false },
      { code: '  driver.findElement(By.id("filter-btn")).click();', buggy: false },
      { code: '  Thread.sleep(3000);', buggy: true, hint: '⏱️ Thread.sleep again — use explicit wait for filter results to load' },
      { code: '}', buggy: false },
    ],
  },

  /* ── REST API ─────────────────────────────────────────────────────────── */
  {
    id: 3, title: 'Create User API', lang: 'Java · Rest Assured', emoji: '🔌',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'public void testCreateUser() {', buggy: false },
      { code: '  String body = "{ name: \'John\', role: \'admin\' }";', buggy: true, hint: '📋 Invalid JSON — keys must be wrapped in double quotes' },
      { code: '  Response res = given()', buggy: false },
      { code: '    .contentType("application/json")', buggy: false },
      { code: '    .body(body)', buggy: false },
      { code: '    .when().post("/api/users");', buggy: false },
      { code: '  Assert.assertEquals(res.statusCode(), 200);', buggy: true, hint: '📊 POST creating a resource should return 201 Created, not 200 OK' },
      { code: '  Assert.assertNotNull(res.jsonPath().get("id"));', buggy: false },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 4, title: 'Auth Token Test', lang: 'Java · Rest Assured', emoji: '🔑',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'public void testAuthToken() {', buggy: false },
      { code: '  String token = "hardcoded_token_abc123";', buggy: true, hint: '🔐 Hardcoded token — should be generated dynamically via login API call' },
      { code: '  Response res = given()', buggy: false },
      { code: '    .header("Authorization", "Token " + token)', buggy: true, hint: '🔑 Wrong scheme — Bearer tokens use "Bearer", not "Token"' },
      { code: '    .when().get("/api/profile");', buggy: false },
      { code: '  res.then().statusCode(200);', buggy: false },
      { code: '  String email = res.jsonPath().getString("email");', buggy: false },
      { code: '  Assert.assertNotNull(email);', buggy: false },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 5, title: 'Delete Resource API', lang: 'Java · Rest Assured', emoji: '🗑️',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'public void testDeleteUser() {', buggy: false },
      { code: '  int userId = 0;', buggy: true, hint: '🆔 ID 0 is typically invalid — use a valid seeded test user ID' },
      { code: '  Response res = given()', buggy: false },
      { code: '    .pathParam("id", userId)', buggy: false },
      { code: '    .when().delete("/api/users/{id}");', buggy: false },
      { code: '  Assert.assertEquals(res.statusCode(), 200);', buggy: true, hint: '📊 Successful DELETE should return 204 No Content, not 200 OK' },
      { code: '  Assert.assertNull(res.body());', buggy: false },
      { code: '}', buggy: false },
    ],
  },

  /* ── iOS / XCUITest ──────────────────────────────────────────────────── */
  {
    id: 6, title: 'iOS Checkout Test', lang: 'Swift · XCUITest', emoji: '🍎',
    lines: [
      { code: 'func testCheckout() throws {', buggy: false },
      { code: '  let app = XCUIApplication()', buggy: false },
      { code: '  app.launch()', buggy: false },
      { code: '  app.buttons["Add to Cart"].tap()', buggy: false },
      { code: '  XCTAssert(app.staticTexts["Cart (1)"].exists)', buggy: true, hint: '⏳ No wait — use XCTNSPredicateExpectation for async UI updates' },
      { code: '  app.buttons["Checkout"].tap()', buggy: false },
      { code: '  let total = app.staticTexts["total"].label as! String', buggy: true, hint: '⚠️ Force cast crashes if nil — use XCTUnwrap or safe cast' },
      { code: '  XCTAssertEqual(total, "$29.99")', buggy: false },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 7, title: 'iOS Login Flow', lang: 'Swift · XCUITest', emoji: '📱',
    lines: [
      { code: 'func testLoginFlow() {', buggy: false },
      { code: '  app.launch()', buggy: false },
      { code: '  app.textFields["Email"].tap()', buggy: false },
      { code: '  app.textFields["Email"].typeText("user")', buggy: true, hint: '📧 Incomplete email — missing @domain.com, login will fail' },
      { code: '  app.secureTextFields["Password"].tap()', buggy: false },
      { code: '  app.secureTextFields["Password"].typeText("pass123")', buggy: false },
      { code: '  app.buttons["Sign In"].tap()', buggy: false },
      { code: '  XCTAssertTrue(app.navigationBars["Home"].exists)', buggy: false },
      { code: '  app.terminate()', buggy: false },
      { code: '  XCTAssertFalse(app.state == .runningForeground)', buggy: true, hint: '🔴 After terminate(), checking .runningForeground is unreliable — state check not needed' },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 8, title: 'iOS Accessibility Test', lang: 'Swift · XCUITest', emoji: '♿',
    lines: [
      { code: 'func testAccessibility() {', buggy: false },
      { code: '  app.launch()', buggy: false },
      { code: '  let btn = app.buttons.firstMatch', buggy: true, hint: '🎯 firstMatch is too generic — target a specific button by accessibility identifier' },
      { code: '  XCTAssertTrue(btn.isAccessibilityElement)', buggy: false },
      { code: '  XCTAssertNotNil(btn.label)', buggy: false },
      { code: '  XCTAssert(btn.label.count > 0)', buggy: false },
      { code: '  let img = app.images["hero_banner"]', buggy: false },
      { code: '  XCTAssertEqual(img.label, "")', buggy: true, hint: '♿ Decorative images should have empty label, but content images need descriptive labels — verify intent' },
      { code: '}', buggy: false },
    ],
  },

  /* ── ANDROID / Espresso ──────────────────────────────────────────────── */
  {
    id: 9, title: 'Android Search Test', lang: 'Kotlin · Espresso', emoji: '🤖',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'fun testSearch() {', buggy: false },
      { code: '  onView(withId(R.id.search_bar)).perform(click())', buggy: false },
      { code: '  onView(withId(R.id.search_bar)).perform(typeText("milk"))', buggy: false },
      { code: '  Thread.sleep(2000) // wait for results', buggy: true, hint: '⏱️ Thread.sleep in Espresso is unreliable — use IdlingResource' },
      { code: '  onView(withText("Whole Milk")).perform(click())', buggy: false },
      { code: '  onView(withId(R.id.title))', buggy: false },
      { code: '    .check(matches(withText("milk")))', buggy: true, hint: '🔤 Product title is "Whole Milk" — asserting "milk" will fail' },
      { code: '}', buggy: false },
    ],
  },
  {
    id: 10, title: 'Android RecyclerView', lang: 'Kotlin · Espresso', emoji: '📋',
    lines: [
      { code: '@Test', buggy: false },
      { code: 'fun testProductList() {', buggy: false },
      { code: '  onView(withId(R.id.recycler_products))', buggy: false },
      { code: '    .check(matches(isDisplayed()))', buggy: false },
      { code: '  onView(withId(R.id.recycler_products))', buggy: false },
      { code: '    .perform(RecyclerViewActions.scrollToPosition(100))', buggy: true, hint: '📋 Scrolling to hardcoded position 100 may crash if list has fewer items' },
      { code: '  onView(withText("Add to Cart"))', buggy: false },
      { code: '    .perform(click())', buggy: false },
      { code: '  onView(withId(R.id.cart_badge))', buggy: false },
      { code: '    .check(matches(withText("0")))', buggy: true, hint: '🛒 After adding item, badge should show "1" not "0"' },
      { code: '}', buggy: false },
    ],
  },

  /* ── AI / LLM Testing ────────────────────────────────────────────────── */
  {
    id: 11, title: 'AI Response Validation', lang: 'Python · pytest', emoji: '🤖',
    lines: [
      { code: 'def test_ai_chat_response():', buggy: false },
      { code: '  client = OpenAI(api_key="sk-abc123xyz")', buggy: true, hint: '🔐 API key hardcoded in test — use environment variable os.getenv("OPENAI_KEY")' },
      { code: '  response = client.chat.completions.create(', buggy: false },
      { code: '    model="gpt-3",', buggy: true, hint: '🤖 "gpt-3" is not a valid model ID — use "gpt-3.5-turbo" or "gpt-4"' },
      { code: '    messages=[{"role": "user", "content": "What is 2+2?"}]', buggy: false },
      { code: '  )', buggy: false },
      { code: '  answer = response.choices[0].message.content', buggy: false },
      { code: '  assert answer == "4"', buggy: true, hint: '🎯 LLM output is non-deterministic — assert "4" in answer instead of exact equality' },
      { code: '  assert response.usage.total_tokens > 0', buggy: false },
      { code: '}', buggy: false },
    ],
  },
];

/* ── Fun QA Facts ───────────────────────────────────────────────────────── */
const FACTS = [
  { emoji: '🐛', text: 'The first real computer bug was an actual moth found inside a Harvard Mark II relay in 1947 by Grace Hopper\'s team.' },
  { emoji: '💸', text: 'NASA\'s Mariner 1 was destroyed in 1962 due to a missing hyphen in source code — costing $18.5 million.' },
  { emoji: '⚡', text: 'Fixing a bug in production costs up to 100× more than catching it during the design phase.' },
  { emoji: '🔥', text: 'Knight Capital Group lost $440 million in just 45 minutes in 2012 due to a bad software deployment.' },
  { emoji: '🌍', text: 'Mars Climate Orbiter was lost in 1999 because one team used imperial units while another used metric.' },
  { emoji: '🤖', text: 'On average, developers spend ~50% of their time debugging — more time than writing new features.' },
  { emoji: '🏆', text: 'Google has paid over $12 million through its Vulnerability Reward Program since 2010.' },
  { emoji: '📱', text: 'Enterprise apps ship with 15–50 bugs per 1,000 lines of code. A solid test suite reduces this by up to 80%.' },
  { emoji: '🚀', text: 'Therac-25, a radiation machine in the 1980s, delivered lethal overdoses due to a race condition bug — one of history\'s deadliest software failures.' },
  { emoji: '🎯', text: 'Studies show a well-maintained test suite catches up to 85% of regressions before reaching production.' },
  { emoji: '💡', text: 'Facebook\'s "move fast and break things" era ended after a bug showed all users a death notice. QA matters.' },
  { emoji: '🔐', text: 'The Heartbleed bug (2014) exposed private keys of ~17% of the internet\'s secure servers — a 2-year-old OpenSSL flaw.' },
];

/* ── Helpers ────────────────────────────────────────────────────────────── */
function randFrom<T>(arr: T[], exclude?: number): T {
  if (arr.length === 1) return arr[0];
  let i = Math.floor(Math.random() * arr.length);
  if (exclude !== undefined) while (i === exclude) i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

function colorLine(code: string): React.ReactNode {
  const KW = ['public', 'void', 'class', 'fun', 'val', 'var', 'let', 'func', 'throws', 'new', 'return', 'def', 'import', 'assert', 'True', 'False', 'None'];
  const tokens = code.split(/(\s+|[(){};.,@"'[\]])/);
  return tokens.map((tok, i) => {
    if (tok.startsWith('@')) return <span key={i} className="text-yellow-300">{tok}</span>;
    if (KW.includes(tok)) return <span key={i} className="text-neon-purple">{tok}</span>;
    if (/^".*"$/.test(tok) || /^'.*'$/.test(tok)) return <span key={i} className="text-neon-green">{tok}</span>;
    if (/^\/\/|^#/.test(tok.trim())) return <span key={i} className="text-slate-500 italic">{tok}</span>;
    if (/^\d+(\.\d+)?$/.test(tok)) return <span key={i} className="text-yellow-400">{tok}</span>;
    return <span key={i} className="text-slate-200">{tok}</span>;
  });
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function QAGame() {
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<number | null>(null);
  const [fact, setFact] = useState(FACTS[0]);
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState<number | null>(null);

  // Randomise only on the client after hydration to avoid SSR mismatch
  useEffect(() => {
    setScenario(randFrom(SCENARIOS));
    setFact(randFrom(FACTS));
  }, []);

  const totalBugs = scenario.lines.filter((l) => l.buggy).length;

  function handleClick(i: number) {
    if (completed || found.has(i)) return;
    if (scenario.lines[i].buggy) {
      const next = new Set(found).add(i);
      setFound(next);
      setShowHint(i);
      setTimeout(() => setShowHint(null), 2800);
      if (next.size === totalBugs) {
        setFact(randFrom(FACTS));
        setTimeout(() => setCompleted(true), 600);
      }
    } else {
      setWrong(i);
      setTimeout(() => setWrong(null), 500);
    }
  }

  function reset() {
    setScenario(randFrom(SCENARIOS, scenario.id));
    setFound(new Set());
    setWrong(null);
    setCompleted(false);
    setShowHint(null);
  }

  return (
    <div className="mt-16">
      {/* Section label */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-neon-pink/30" />
        <div className="flex items-center gap-2 text-xs font-mono text-neon-pink/70 uppercase tracking-widest">
          <MdBugReport size={14} />
          QA Challenge — Bug Hunt
          <MdBugReport size={14} />
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-neon-pink/30" />
      </div>

      <div className="glass rounded-2xl border border-white/8 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-3 border-b border-white/6 bg-white/2 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-lg">{scenario.emoji}</span>
            <div>
              <p className="text-sm font-bold text-white font-orbitron">{scenario.title}</p>
              <p className="text-xs text-slate-500 font-mono">{scenario.lang}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {Array.from({ length: totalBugs }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: found.size > i ? [1, 1.4, 1] : 1 }}
                transition={{ duration: 0.3 }}
                className={`w-3 h-3 rounded-full border ${
                  found.size > i ? 'bg-neon-green border-neon-green' : 'bg-transparent border-slate-600'
                }`}
              />
            ))}
            <span className="text-xs font-mono text-slate-500">{found.size}/{totalBugs} bugs</span>
            <button
              onClick={reset}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-colors"
              title="New challenge"
            >
              <FaRedo size={11} />
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-5 py-2.5 bg-neon-pink/5 border-b border-neon-pink/10 flex items-center gap-2">
          <FaBug size={11} className="text-neon-pink/70 flex-shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="text-neon-pink/80 font-semibold">Tap the buggy lines</span> to find all{' '}
            <span className="text-white font-bold">{totalBugs} bugs</span> hidden in this {scenario.lang} test.
          </p>
        </div>

        {/* Code panel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-mono text-sm"
              >
                {scenario.lines.map((line, i) => {
                  const isFound = found.has(i);
                  const isWrong = wrong === i;
                  const isHinted = showHint === i;

                  return (
                    <div key={i}>
                      <motion.div
                        onClick={() => handleClick(i)}
                        animate={isWrong ? { x: [-4, 4, -4, 4, 0] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-0 relative group transition-colors duration-150
                          ${isFound ? 'bg-neon-green/10 cursor-default' : isWrong ? 'bg-red-500/15 cursor-not-allowed' : 'hover:bg-white/4 cursor-pointer'}`}
                      >
                        <span className="select-none text-right pr-2 pl-2 sm:pr-4 sm:pl-4 py-0.5 text-slate-700 text-xs w-7 sm:w-10 flex-shrink-0 border-r border-white/4 leading-6">
                          {i + 1}
                        </span>
                        <span className="pl-2 sm:pl-4 pr-2 sm:pr-6 py-0.5 leading-6 flex-1 min-w-0 overflow-x-auto text-[11px] sm:text-sm">
                          {colorLine(line.code)}
                        </span>
                        {isFound && (
                          <span className="flex items-center gap-1 pr-4 py-0.5 text-xs font-semibold text-neon-green flex-shrink-0 leading-6">
                            <FaBug size={10} /> BUG
                          </span>
                        )}
                        {!isFound && !line.buggy && (
                          <span className="absolute right-3 top-0.5 text-xs text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity leading-6 pointer-events-none select-none">
                            clean ✓
                          </span>
                        )}
                      </motion.div>

                      <AnimatePresence>
                        {isHinted && line.hint && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-start gap-2 px-14 py-2 bg-neon-green/8 border-l-2 border-neon-green/50">
                              <FaLightbulb size={11} className="text-neon-green flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-neon-green/90 leading-relaxed">{line.hint}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <div className="h-3" />
              </motion.div>
            ) : (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="p-8 flex flex-col items-center text-center gap-5"
              >
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-3, 3, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(250,204,21,0.12)', boxShadow: '0 0 40px rgba(250,204,21,0.2)' }}
                >
                  <FaTrophy size={36} className="text-yellow-400" />
                </motion.div>

                <div>
                  <p className="text-xs font-mono text-neon-green/70 uppercase tracking-widest mb-1">All bugs found!</p>
                  <h3 className="text-xl font-black text-white font-orbitron">You&apos;re a QA Pro 🎯</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Found all <span className="text-neon-green font-bold">{totalBugs} bugs</span> in{' '}
                    <span className="font-semibold text-slate-300">{scenario.title}</span>
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-md rounded-xl px-5 py-4 text-left border"
                  style={{ background: 'rgba(0,229,255,0.05)', borderColor: 'rgba(0,229,255,0.15)' }}
                >
                  <p className="text-xs font-semibold text-neon-cyan/70 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <FaLightbulb size={10} /> Did you know?
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <span className="text-base mr-1">{fact.emoji}</span>
                    {fact.text}
                  </p>
                </motion.div>

                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl border border-neon-pink/30 text-neon-pink bg-neon-pink/8 hover:bg-neon-pink/15 transition-colors"
                >
                  <FaRedo size={12} />
                  Next Challenge
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!completed && (
          <div
            className="px-5 py-2 border-t border-white/5 flex items-center justify-between"
            style={{ background: 'rgba(244,114,182,0.04)' }}
          >
            <span className="text-xs font-mono text-slate-600">// spot the anti-patterns and bad practices</span>
            <span className="text-xs font-mono text-neon-pink/50">{totalBugs - found.size} remaining</span>
          </div>
        )}
      </div>
    </div>
  );
}
